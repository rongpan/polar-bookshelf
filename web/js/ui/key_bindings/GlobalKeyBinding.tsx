import * as React from 'react';
import {GlobalHotKeys, KeyMap} from "react-hotkeys";

export class GlobalKeyBinding extends React.PureComponent<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
        };

    }

    public render() {

        const action = this.props.action || 'keyup';
        const sequences = [this.props.sequence];
        const {name, group, description, sequence} = this.props;

        const keyMap: KeyMap = {
            BINDING: {
                name, group, description, action, sequence, sequences
            },
        };

        const Binding = (props: any) => {

            const doHandler = React.useCallback(() => {
                setTimeout(() => this.props.handler, 1);

            }, []);

            const handlers = {
                BINDING: doHandler
            };

            return (
                <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
                    {props.children}
                </GlobalHotKeys>
            );

        };

        return (
            <Binding>
                {this.props.children}
            </Binding>
        );

    }

}

export interface IProps {

    readonly name: string;
    readonly group: string;
    readonly description: string;
    readonly action?: 'keyup' | 'keydown' | 'keypress';
    readonly sequence: string;

    /**
     * Code to call when the key binding is triggered.
     */
    readonly handler: () => void;

}

interface IState {

}

export type GlobalKeyBindingStr = string;
