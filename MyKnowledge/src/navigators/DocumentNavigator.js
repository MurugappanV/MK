/**
 * Document Navigator , stacks between list and details
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import {  DocumentListContainer, DocumentDisplayContainer } from '../containers'

type Props = {};
export class DocumentNavigator extends PureComponent<Props> {
    render() {
        return <Stack screenProps={{ rootNavigation: this.props.navigation }}/>;
    }
}

const Stack = createStackNavigator(
    {
        List: {screen:DocumentListContainer},
        Details: {screen:DocumentDisplayContainer}
    },
    {
        navigationOptions: () => ({
            header: null,
        }),
    }
);