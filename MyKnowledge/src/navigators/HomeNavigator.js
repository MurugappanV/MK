/**
 * Home Navigator , swicthes between home pages 
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createDrawerNavigator } from 'react-navigation';
import {  LoginContainer, ForgotPassContainer } from '../containers'

type Props = {};
export class HomeNavigator extends PureComponent<Props> {
    render() {
        return <Home/>;
    }
}

const Home = createDrawerNavigator({
    Settings: {
      screen: ForgotPassContainer,
    },
    All: {
      screen: ForgotPassContainer,
    },
  });