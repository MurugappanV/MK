/**
 * First Navigator , swicthes between login and home 
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { LoadingContainer, LoginContainer } from '../containers'
import { AuthNavigator } from './AuthNavigator'

type Props = {};
export class AppNavigator extends PureComponent<Props> {
    render() {
        return <SwitchNavigator />;
    }
}

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: LoadingContainer,
        App: LoadingContainer,
        Auth: AuthNavigator,
    },
    {
        initialRouteName: 'Auth',
    }
);