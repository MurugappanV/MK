/**
 * Auth Navigator , swicthes between login and forgot password 
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import {  LoginContainer, ForgotPassContainer } from '../containers'

type Props = {
    navigation: any
};
export class AuthNavigator extends PureComponent<Props> {
    render() {
        return <Auth screenProps={{ rootNavigation: this.props.navigation }}/>;
    }
}

const Auth = createStackNavigator(
    {
        Login: {screen:LoginContainer},
        ForgotPassword: {screen:ForgotPassContainer}
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
    }
);