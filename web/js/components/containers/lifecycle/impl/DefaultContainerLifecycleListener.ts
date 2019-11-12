import {Container} from '../../Container';
import {AbstractContainerLifecycleListener} from './AbstractContainerLifecycleListener';
import doc = Mocha.reporters.doc;

/**
 * Listens to the lifecycle of .page
 */
export class DefaultContainerLifecycleListener extends AbstractContainerLifecycleListener {


    constructor(container: Container) {
        super(container);

        console.log("FIXME: container: ", container);
    }

    /**
     * Get the current state from an event.
     *
     * @param event
     */
    getStateFromEvent(event: any) {

        if (event.target) {

            // const pageLoaded = (element: HTMLElement | null | undefined): boolean => {
            //
            //     if (element === undefined || element === null) {
            //         return false;
            //     }
            //
            //     if (element.className === 'page') {
            //
            //         if (element.getAttribute('data-loaded') === 'true') {
            //             return true;
            //         }
            //
            //     }
            //
            //     return pageLoaded(element.parentElement);
            //
            // };

            const pageLoaded = (element: HTMLElement): boolean => {
                return document.querySelector(".page")!.getAttribute('data-loaded') === 'true';
            };

            if (event.target.className === "endOfContent") {
                return this._createContainerLifecycleEvent(true);
            }

            if (event.target.className === "loadingIcon") {
                return this._createContainerLifecycleEvent(false);
            }

            // console.log("FIXME: 666.4: " + event.target.className);
            // console.log("FIXME: 666.5: " , event.target);

            // FIXME: I can go to the root, try to find the .page, then see if it's loaded...

            // FIXME: the problem , I think, is that this is firing N times , once for every element once the page is
            // fully loaded...
            // if (pageLoaded(event.target)) {
            //     return this._createContainerLifecycleEvent(true);
            // }

        }

        return undefined;

    }

    /**
     * Get the current state.
     *
     */
    getState() {

        if(this.container.element.querySelector(".endOfContent") !== null) {
            return this._createContainerLifecycleEvent(true);
        }

        if(this.container.element.querySelector(".loadingIcon") !== null) {
            return this._createContainerLifecycleEvent(false);
        }

        return undefined;

    }


}
