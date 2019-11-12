import * as React from 'react';
import InputGroup from 'reactstrap/lib/InputGroup';
import Input from 'reactstrap/lib/Input';
import {SimpleTooltipEx} from '../../../../../web/js/ui/tooltip/SimpleTooltipEx';
import {GlobalHotKeys, KeyMap} from "react-hotkeys";

export class DocRepoTextFilter extends React.PureComponent<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
        };

    }

    public render() {

        const keyMap: KeyMap = {
            FIND: {
                name: 'find',
                group: 'main',
                description: "Find documents by text",
                action: 'keyup',
                sequence: 'shift+f',
                sequences: ['shift+f'] // this is kind of ugly vs F but not too bad.
            },
        };

        const Focus = (props: any) => {

            console.log("FIXME: here1");

            const doFocus = React.useCallback(() => {
                console.log("FIXME here2 with timeout");

                // FIXME: - I don't like that I have to use the ID to do this
                // FIXME: - I don't like setTimeout but I'll deal with if it I have to
                // FIXME: - there's a lot of overhead when  using this.  I can make it
                //          simpler since I usually just need ONE key binding.
                // FIXME: - the input keeps being reset each time...

                setTimeout(() => document.getElementById('filter_title')!.focus(), 1);

            }, []);

            const handlers = {
                FIND: doFocus
            };

            return (
                <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
                    {props.children}
                </GlobalHotKeys>
            );

        };

        return (
            <Focus>
                <SimpleTooltipEx text={`Filter the document list by the title of the document.`}>

                    <InputGroup size="md">

                        <Input id="filter_title"
                               type="text"
                               placeholder="Filter by title"
                               onChange={(value) => this.props.onFilterByTitle(value.target.value)}/>

                    </InputGroup>

                </SimpleTooltipEx>
            </Focus>
        );

    }

}

export interface IProps {
    readonly onFilterByTitle: (text: string) => void;
}

interface IState {

}

