import {NULL_FUNCTION} from "polar-shared/src/util/Functions";
import {SnapshotUnsubscriber} from "../firebase/SnapshotSubscribers";

export class BackgroundListeners {

    public static create<V>(listenable: BackgroundListenable<V>): BackgroundListener<V> {

        let started: boolean = false;

        let value: V | null;

        let snapshotUnsubscriber: () => void = NULL_FUNCTION;

        return {

            start: async () => {

                if (started) {
                    return;
                }

                // FIXME: this is the problem because get() is NOT aware of the
                // cache and forces the server each time... we have to rewrite
                // this to properly etch from cache first, then only 'get' from
                // the server otherwise...
                value = await listenable.get();

                snapshotUnsubscriber = await listenable.onSnapshot(currentValue => {
                    value = currentValue;
                });

                started = true;

            },

            get: () => {

                if (! started) {
                    throw new Error("Not started");
                }

                return value!;

            },

            stop: () => {

                if (! started) {
                    return;
                }

                snapshotUnsubscriber();
            }

        };

    }

}

export interface BackgroundListener<V> {

    start(): Promise<void>;

    get(): V;

    stop(): void;

}

export interface BackgroundListenable<V> {

    get(): Promise<V>;

    onSnapshot(handler: (value: V) => void): Promise<SnapshotUnsubscriber>;

}


