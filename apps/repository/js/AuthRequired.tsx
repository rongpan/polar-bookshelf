import * as React from 'react';
import {AuthHandlers} from "../../../web/js/apps/repository/auth_handler/AuthHandler";
import {
    AuthStatusContext,
    AuthStatusProps
} from "../../../web/js/accounts/AccountSnapshotContext";

interface IProps {
    readonly children: React.ReactNode;
}

export function AuthRequired(props: IProps) {

    const Delegate = (authStatusProps: AuthStatusProps) => {

        if (authStatusProps.authStatus === 'needs-authentication') {
            const authHandler = AuthHandlers.get();
            authHandler.authenticate();
            return <div/>;
        }

        return props.children;

    };

    return (
        <AuthStatusContext.Consumer>
            {Delegate}
        </AuthStatusContext.Consumer>
    );

}

