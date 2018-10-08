/**
 * Home Navigator , swicthes between home pages 
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {  LoginContainer, 
	ChangePasswordConatiner, 
	NotifySettingsContainer, 
	DefaultSettingsContainer } from '../containers'
import { HomeDrawer } from './HomeDrawer';
import { ScalePerctFullWidth } from '../asset';

type Props = {};
export class HomeNavigator extends PureComponent<Props> {
    render() {
        return <Home screenProps={{ rootNavigation: this.props.navigation }}/>;
    }
}

const Home = createDrawerNavigator({
    All: {
		screen: LoginContainer,
    },  
    DefaultSettings: {
		screen: DefaultSettingsContainer,
    },
    ChangePassword: {
		screen: ChangePasswordConatiner,
    },
    NotificationSettings: {
		screen: NotifySettingsContainer
    },
    
  }, {
    contentComponent: HomeDrawer,
    drawerWidth: ScalePerctFullWidth(85)
  }
);