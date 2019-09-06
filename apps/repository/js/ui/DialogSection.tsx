import * as React from 'react';

export class DialogSection extends React.Component<IProps, IState> {

    constructor(props: IProps, context: any) {
        super(props, context);

        this.state = {
        };

    }

    public render() {

        return (

            <div style={{
                display: 'flex',
                borderTop: '3px solid var(--primary)'
            }}
                 className="pt-2">

                <div style={{
                    verticalAlign: 'top'
                }}>

                    <button type="button"
                            className="btn btn-primary btn-circle btn-xl">

                        <i className={this.props.iconClass}/>

                    </button>

                </div>

                <div className="pl-2"
                     style={{
                         verticalAlign: 'top',
                         flexGrow: 1
                     }}>

                    {this.props.children}

                </div>

            </div>

        );

    }

}

export interface IProps {
    readonly iconClass: string;
}

interface IState {

}

