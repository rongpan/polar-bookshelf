import React from "react";

export interface RefTrackerProps {
    readonly children: JSX.Element;
}

export type RefHandler = (ref: HTMLElement) => void;
export type RefListenerCallback = (newRef: HTMLElement | null) => void;
export type RefListenerComponent = (props: RefTrackerProps) => JSX.Element | null;

export type RefListenerTuple = [RefListenerCallback, RefListenerComponent];

/**
 * Function that keeps a handle to the ref, and only renders the RefTracker
 * once its defined so that that the child component renders after the first is
 * defined.
 */
export function useRefTracker(handler: RefHandler): RefListenerTuple {

    const [ref, setRef] = React.useState<HTMLElement | null>(null);

    const listener = (newRef: HTMLElement | null) => {

        if (newRef && newRef !== ref) {
            handler(newRef);
            setRef(newRef);
        }

    }

    const RefTracker = (props: RefTrackerProps) => {

        if (ref) {
            return props.children;
        }

        return null;

    };

    return [listener, RefTracker];

}
