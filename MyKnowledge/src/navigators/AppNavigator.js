/**
 * First Navigator , swicthes between login and home 
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { AuthLoadingContainer, LoginContainer } from '../containers'
import { AuthNavigator } from './AuthNavigator'
import HomeNavigator from './HomeNavigator';

type Props = {};
export class AppNavigator extends PureComponent<Props> {
    render() {
        return <SwitchNavigator />;
    }
}

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingContainer,
        Home: HomeNavigator,
        Auth: AuthNavigator,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);