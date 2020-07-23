import * as React from "react";
import {
    useComponentDidMount,
    useComponentWillUnmount
} from "../../../../web/js/hooks/lifecycle";
import {Debouncers} from "polar-shared/src/util/Debouncers";
import {IDimensions} from "polar-shared/src/util/IDimensions";
import { useViewerContainerStore } from "../ViewerContainerStore";
import {NULL_FUNCTION} from "polar-shared/src/util/Functions";

/**
 * Unsubscribes to the action created by the subscriber.
 */
export type Unsubscriber = () => void;

/**
 * Subscribe to some type of activity/event listener.
 */
export type Subscriber = () => Unsubscriber

function useSubscriber(subscriber: Subscriber) {
    
    const unsubscriberRef = React.useRef<Unsubscriber | undefined>(undefined);

    useComponentDidMount(() => {
        unsubscriberRef.current = subscriber();
    })

    useComponentWillUnmount(() => {

        const unsubscriber = unsubscriberRef.current;

        if (unsubscriber) {
            unsubscriber();
        }

    })

}

type UpdateType = 'initial' | 'resize' | 'scroll' | 'mutation';
type AnnotationHandlerDelegate = (updateType: UpdateType) => void;

function useScrollSubscriber(delegate: AnnotationHandlerDelegate): Subscriber {

    const {viewerContainer} = useViewerContainerStore(['viewerContainer']);

    if (! viewerContainer) {
        return () => NULL_FUNCTION;
    }
    return () => {

        function handleScroll() {
            delegate('scroll');
        }

        viewerContainer.addEventListener('scroll', handleScroll);

        return () => {
            viewerContainer.removeEventListener('scroll', handleScroll);
        }

    }

}

function createResizeSubscriber(delegate: AnnotationHandlerDelegate): Subscriber {

    return () => {

        function handleResize() {
            delegate('resize');
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }

}



function createMutationObserverSubscriber(delegate: AnnotationHandlerDelegate): Subscriber {

    // FIXME: I think we can totally solve ALL of this by just pushing out
    // a single mutation observer for ONE page and listening to data-page-loaded
    // which is esentially the same... ... IT's like a hacky store but it should
    // work just fine.

    return () => {

        const viewerContainer = document.querySelector('#viewerContainer .pdfViewer')!;

        const observer = new MutationObserver((mutations) => {

            for (const mutation of mutations) {

                if (mutation.type === "attributes") {
                    delegate('mutation');
                }

                if (mutation.type === "childList") {
                    delegate('mutation');
                }

            }

        });

        // NOTE: I don't think 'attributes' is actually working here and that we
        // are in fact depending on scroll (for updates) and then childList (for
        // initial)
        observer.observe(viewerContainer, {
            // only monitor attributes.
            attributes: true,
            childList: true,
        });

        return () => {
            observer.disconnect();
        }

    }

}

function getContainer(page: number): HTMLElement | undefined {

    const pageElement = document.querySelector(`.page[data-page-number='${page}']`);

    if (! pageElement) {
        return undefined;
    }

    const textLayerElement = pageElement.querySelector(".textLayer");

    if (! textLayerElement) {
        // if there is no textLayer the page isn't rendered and we can't use it
        return undefined;
    }

    return textLayerElement as HTMLElement;

}

export function useAnnotationContainer(pageNum: number) {

    // FIXME: I think we have to have ONE of these at the high level to listen
    // ONCE to the state then update the context via a store so that the
    // components can be efficiently updated ...

    const containerRef = React.useRef<HTMLElement | undefined>(undefined);
    const [, setContainer] = React.useState<HTMLElement | undefined>(undefined);

    function doUpdateDelegate(updateType: UpdateType) {

        console.log("FIXME: updateType: ", updateType);

        const newContainer = getContainer(pageNum);
        const container = containerRef.current;

        if (container !== newContainer) {
            containerRef.current = newContainer;
            setContainer(newContainer);
        }

    }

    const doUpdate = React.useMemo(() => Debouncers.create1(doUpdateDelegate), []);

    useComponentDidMount(() => {
        // call the delegate directly to force a draw when the component mounts
        doUpdateDelegate('initial');
    });

    useSubscriber(useScrollSubscriber(doUpdate));
    useSubscriber(createResizeSubscriber(doUpdate));
    useSubscriber(createMutationObserverSubscriber(doUpdate));

    return containerRef.current;

}

export function getPageElement(page: number): HTMLElement {
    // FIXME: this is not portable to 2.0 with multiple PDFs loaded.
    return document.querySelectorAll(".page")[page - 1] as HTMLElement;
}

export function computePageDimensions(pageNum: number): IDimensions {
    // TODO this is a bit of a hack.
    const pageElement = getPageElement(pageNum);
    return {
        width: pageElement.clientWidth,
        height: pageElement.clientHeight
    }
}
