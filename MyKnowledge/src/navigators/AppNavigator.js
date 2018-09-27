import React, { PureComponent } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {LoginContainer, HomeContainer, LoadingContainer} from '../containers'


export class AppNavigator extends PureComponent {
    render() {
        return <SwitchNavigator />;
    }
}

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: LoadingContainer,
        App: HomeContainer,
        Auth: LoginContainer,
    },
    {
        initialRouteName: 'Auth',
    }
);