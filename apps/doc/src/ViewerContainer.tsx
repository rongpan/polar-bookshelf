// import React from 'react';
//
// interface MutableIViewerContainerRef {
//
//     /**
//      * The current element or undefined if it's not defined yet.
//      */
//     current: HTMLElement | undefined;
//
// }
//
// interface IViewerContainerRef extends Readonly<MutableIViewerContainerRef> {
// }
//
// export const ViewerContainerRef: IViewerContainerRef = {
//     current: undefined
// };
//
// const ViewerContainerContext = React.createContext<IViewerContainerRef>(ViewerContainerRef);
//
// export function useViewerContainerContext(): MutableIViewerContainerRef {
//     return React.useContext(ViewerContainerContext);
// }
//
// /**
//  * Get the container ref or undefined if it's not defined yet.
//  */
// export function useViewerContainerRef(): HTMLElement | undefined {
//     return React.useContext(ViewerContainerContext).current;
// }
//
// // FIXME: this will cause it to be redefined...
// export const ViewerContainerProvider = React.memo(() => {
//
//     const [ref, setRef] = React.useState<HTMLElement | undefined>();
//
// });
