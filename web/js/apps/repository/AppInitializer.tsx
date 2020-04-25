import {AnalyticsInitializer} from "../../analytics/AnalyticsInitializer";
import {PinchToZoom} from "../../ui/Gestures";
import {ExternalNavigationBlock} from "../../electron/navigation/ExternalNavigationBlock";
import {UIModes} from "../../ui/uimodes/UIModes";
import {PlatformStyles} from "../../ui/PlatformStyles";
import {AppOrigin} from "../AppOrigin";
import {IEventDispatcher, SimpleReactor} from "../../reactor/SimpleReactor";
import {SyncBarProgress} from "../../ui/sync_bar/SyncBar";
import {AuthHandlers, AuthStatus} from "./auth_handler/AuthHandler";
import {MailingList} from "./auth_handler/MailingList";
import {UpdatesController} from "../../auto_updates/UpdatesController";
import {ToasterService} from "../../ui/toaster/ToasterService";
import {ProgressService} from "../../ui/progress_bar/ProgressService";
import {MachineDatastores} from "../../telemetry/MachineDatastores";
import {UniqueMachines} from "../../telemetry/UniqueMachines";
import {Logger} from "polar-shared/src/logger/Logger";
import {Version} from "polar-shared/src/util/Version";
import {PDFModernTextLayers} from "polar-pdf/src/pdf/PDFModernTextLayers";
import {Platforms} from "polar-shared/src/util/Platforms";
import {
    PersistenceLayerController,
    PersistenceLayerManager
} from "../../datastore/PersistenceLayerManager";
import * as ReactDOM from "react-dom";
import {LoadingSplash} from "../../ui/loading_splash/LoadingSplash";
import * as React from "react";
import {ListenablePersistenceLayerProvider} from "../../datastore/PersistenceLayer";
import {Tracer} from "polar-shared/src/util/Tracer";

const log = Logger.create();

interface IAppInitializerOpts {

    readonly persistenceLayerManager: PersistenceLayerManager;

    readonly withAuthenticatedUser: (app: App) => Promise<void>;

}

export interface App {

    readonly persistenceLayerManager: PersistenceLayerManager;
    readonly persistenceLayerProvider: ListenablePersistenceLayerProvider;
    readonly persistenceLayerController: PersistenceLayerController;
    readonly syncBarProgress: IEventDispatcher<SyncBarProgress>;

}

export class AppInitializer {

    public static async init(opts: IAppInitializerOpts): Promise<App> {

        console.time("AppInitializer.init");

        const {persistenceLayerManager} = opts;

        const syncBarProgress: IEventDispatcher<SyncBarProgress> = new SimpleReactor();

        log.info("Running with Polar version: " + Version.get());

        AnalyticsInitializer.doInit();

        renderLoadingSplash();

        PinchToZoom.disable();

        // enable the navigation block.  This enables it by default and then turns
        // it on again after login is completed.
        ExternalNavigationBlock.set(true);

        const persistenceLayerProvider = () => persistenceLayerManager.get();
        const persistenceLayerController = persistenceLayerManager;

        UIModes.register();
        PlatformStyles.assign();

        AppOrigin.configure();

        PDFModernTextLayers.configure();

        const authHandler = AuthHandlers.get();

        const platform = Platforms.get();

        log.notice("Running on platform: " + Platforms.toSymbol(platform));

        const app: App = {
            persistenceLayerManager, persistenceLayerProvider,
            persistenceLayerController, syncBarProgress,
        };

        // FIXME: this should be removed
        new ToasterService().start();

        new ProgressService().start();

        const onAuthStatus = async (authStatus: AuthStatus) => {

            if (authStatus !== 'needs-authentication') {

                // subscribe but do it in the background as this isn't a high priority UI task.
                MailingList.subscribeWhenNecessary()
                    .catch(err => log.error(err));

                new UpdatesController().start();

                // FIXME: this needs to be fixed too...
                // await Tracer.async('user-groups', PrefetchedUserGroupsBackgroundListener.start());

                MachineDatastores.triggerBackgroundUpdates(persistenceLayerManager);

                UniqueMachines.trigger();

                await Tracer.async('onNeedsAuthentication', opts.withAuthenticatedUser(app));

            }

        };

        const handleAuthStatus = async () => {
            const authStatus = await Tracer.async('authStatus', authHandler.status());
            await onAuthStatus(authStatus);
        };

        handleAuthStatus().catch(err => log.error(err));

        console.timeEnd("AppInitializer.init");

        return app;

    }

}

function getRootElement() {

    const rootElement = document.getElementById('root') as HTMLElement;

    if (! rootElement) {
        throw new Error("No root element to which to render");
    }

    return rootElement;

}

function renderLoadingSplash() {

    const rootElement = getRootElement();

    ReactDOM.render(<LoadingSplash/>, rootElement);

}
