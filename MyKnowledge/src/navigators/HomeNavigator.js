/**
 * Home Navigator , swicthes between home pages 
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {  LoginContainer, ForgotPassContainer, DefaultSettingsContainer } from '../containers'
import { HomeDrawer } from './HomeDrawer';
import { ScalePerctFullWidth } from '../asset';
import { ChangePassword } from '../containers/ChangePassword';

type Props = {};
export class HomeNavigator extends PureComponent<Props> {
    render() {
        return <Home/>;
    }
}

const Home = createDrawerNavigator({
    DefaultSettings: {
      screen: DefaultSettingsContainer,
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    All: {
      screen: LoginContainer,
    }
  }, {
    contentComponent: HomeDrawer,
    drawerWidth: ScalePerctFullWidth(85)
  }
);