import React from 'react';
import {Provider} from 'polar-shared/src/util/Providers';
import {createObservableStore, SetStore} from "../../react/store/ObservableStore";

interface IDockLayoutStore {

    /**
     * The sizes of the docks
     */
    readonly sizes: ReadonlyArray<number>;

}

interface IDockLayoutCallbacks {

    readonly setSizes: (sizes: ReadonlyArray<number>) => void;

}


const initialStore: IDockLayoutStore = {
    sizes: []
}

interface Mutation {
}

interface Mutator {
}

function mutatorFactory(storeProvider: Provider<IDockLayoutStore>,
                        setStore: SetStore<IDockLayoutStore>): Mutator {

    return {};

}

function callbacksFactory(storeProvider: Provider<IDockLayoutStore>,
                          setStore: (store: IDockLayoutStore) => void,
                          mutator: Mutator): IDockLayoutCallbacks {

    return React.useMemo((): IDockLayoutCallbacks => {

        function setSizes(sizes: ReadonlyArray<number>) {
            const store = storeProvider();
            setStore({...store, sizes});
        }

        return {
            setSizes
        };

    }, [storeProvider, setStore]);

}

export function createDockLayoutStore() {

    return createObservableStore<IDockLayoutStore, Mutator, IDockLayoutCallbacks>({
        initialValue: initialStore,
        mutatorFactory,
        callbacksFactory
    });
}

export const [DockLayoutStoreProvider, useDockLayoutStore, useDockLayoutCallbacks]
    = createDockLayoutStore();
