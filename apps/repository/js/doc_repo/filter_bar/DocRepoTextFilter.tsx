import * as React from 'react';
import InputGroup from 'reactstrap/lib/InputGroup';
import Input from 'reactstrap/lib/Input';
import {SimpleTooltipEx} from '../../../../../web/js/ui/tooltip/SimpleTooltipEx';
import {HotKeys} from "react-hotkeys";

export class DocRepoTextFilter extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
        };

    }

    public render() {

        const Focus = (props: any) => {

            console.log("FIXME: here1");

            const doFocus = React.useCallback(() => {
                console.log("FIXME here2");
                document.getElementById('filter_title')!.focus();
            }, []);

            const handlers = {
                FIND: doFocus
            };

            return <HotKeys handlers={handlers}>
                {props.children}
            </HotKeys>

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

