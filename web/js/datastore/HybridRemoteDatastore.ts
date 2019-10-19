import {Datastore, DatastoreID, ErrorListener, InitResult, source} from './Datastore';
import {BinaryFileData} from './Datastore';
import {WriteFileOpts} from './Datastore';
import {isBinaryFileData} from './Datastore';
import {DocMetaRef} from './DocMetaRef';
import {DiskDatastore} from './DiskDatastore';
import {RemoteDatastore} from './RemoteDatastore';
import {Backend} from 'polar-shared/src/datastore/Backend';
import {DocFileMeta} from './DocFileMeta';
import {Blobs} from 'polar-shared/src/util/Blobs';
import {FileRef} from "polar-shared/src/datastore/FileRef";

/**
 * A datastore which extends RemoteDatastore but adds support for local disk
 * operations for reads which are MUCH MUCH faster since we're not going through
 * IPC.  IPC is insanely slow.
 */
export class HybridRemoteDatastore extends RemoteDatastore {

    public readonly id: DatastoreID;

    private readonly diskDatastore: DiskDatastore;

    constructor(delegate: Datastore) {
        super(delegate);
        this.id = 'hybrid-remote:' + delegate.id;
        this.diskDatastore = new DiskDatastore();
    }

    public async init(errorListener?: ErrorListener): Promise<InitResult> {
        await super.init();
        await this.diskDatastore.init(errorListener);
        return {};
    }

    public writeFile(backend: Backend, ref: FileRef, data: BinaryFileData, opts?: WriteFileOpts): Promise<DocFileMeta> {

        if ( !isBinaryFileData(data)) {
            throw new Error("Data is not BinaryFileData");
        }

        const toDiskData = (): BinaryFileData => {

            if ((<any> data).blob) {
                // we can't have this as a blob in nodejs land and we have to convert it
                // to a stream
                const blob = (<source.BlobSource> data).blob;
                return {stream: Blobs.toStream(blob)};
            } else {
                return data;
            }

        };

        const diskData = toDiskData();

        return this.diskDatastore.writeFile(backend, ref, diskData, opts);

    }

    public async getDocMetaRefs(): Promise<DocMetaRef[]> {
        return await this.diskDatastore.getDocMetaRefs();
    }

    public async getDocMeta(fingerprint: string): Promise<string | null> {
        return await this.diskDatastore.getDocMeta(fingerprint);
    }

}

