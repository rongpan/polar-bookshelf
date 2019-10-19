import {RendererAnalytics} from '../../../../web/js/ga/RendererAnalytics';
import {remote} from 'electron';
import {Logger} from 'polar-shared/src/logger/Logger';
import {Dialogs} from "../../../../web/js/ui/dialogs/Dialogs";
import {NULL_FUNCTION} from "polar-shared/src/util/Functions";
import {DOILookup} from "../../../../../polar-app-public/polar-search-api-client/src/api/search/client/DOILookup";
import {Toaster} from "../../../../web/js/ui/toaster/Toaster";

const log = Logger.create();

export class AddContentActions {

    public static cmdImportFromDisk() {

        RendererAnalytics.event({category: 'add-content', action: 'import-from-disk'});

        this.getController().cmdImport()
            .catch((err: Error) => log.error("Could not import from disk: ", err));

    }

    public static cmdCaptureWebPage() {

        RendererAnalytics.event({category: 'add-content', action: 'capture-web-page'});

        this.getController().cmdCaptureWebPageWithBrowser()
            .catch((err: Error) => log.error("Could not capture page: ", err));

    }

    private static getController(): IMainAppController {
        return remote.getGlobal('mainAppController');
    }

    public static cmdAddViaDOI() {


        const onDone = (doi: string) => {

            const handler = async () => {
                const results = await DOILookup.lookup(doi);

                if (results.entries.length === 1) {

                    console.log("FIXME: ", results);
                } else {
                    Toaster.warning("No documents found for DOI: "  + doi, "No documents found.");
                }

            };

            handler().catch(err => log.error(err));

        };

        const onCancel = NULL_FUNCTION;

        // 10.1038/nature12373
        Dialogs.prompt({title: "Enter a document DOI: ", onDone, onCancel})

    }

}

interface IMainAppController {

    cmdImport(): Promise<void>;

    cmdCaptureWebPageWithBrowser(): Promise<void>;
}
