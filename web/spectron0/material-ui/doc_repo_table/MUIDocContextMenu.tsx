import React from "react";
import Menu from "@material-ui/core/Menu";
import {
    DocContextMenuProps,
    MUIDocDropdownMenuItems
} from "./MUIDocDropdownMenuItems";
import isEqual from "react-fast-compare";

export type ContextMenuHandler = (event: React.MouseEvent<HTMLElement>) => void;

interface IProps extends DocContextMenuProps {
    readonly render: (contextMenuHandler: ContextMenuHandler) => void;
}

interface IState {
    readonly mouseX?: number;
    readonly mouseY?: number;
}

export class MUIDocContextMenu extends React.Component<IProps, IState> {

    constructor(props: Readonly<IProps>) {
        super(props);

        this.handleContextMenu = this.handleContextMenu.bind(this);

        this.state = {};
    }

    public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<{}>): boolean {
        return ! isEqual(this.props, nextProps) || ! isEqual(this.state, nextState))
    }

    private handleContextMenu(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    }

    public render() {

        const handleClose = () => {
            this.setState({
                mouseX: undefined,
                mouseY: undefined
            });
        };

        return (
            <>
                {this.state.mouseX !== undefined && this.state.mouseY !== undefined &&
                    <Menu
                        keepMounted
                        open={this.state.mouseX !== undefined}
                        onClose={() => handleClose()}
                        anchorReference="anchorPosition"
                        anchorPosition={{
                            top: this.state.mouseY,
                            left: this.state.mouseX
                        }}>

                        <MUIDocDropdownMenuItems {...this.props}/>

                    </Menu>}

                {this.props.render(this.handleContextMenu)}

            </>
        );

    }
}
