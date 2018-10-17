/**
 * Home Navigator , swicthes between home pages 
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { createDrawerNavigator } from 'react-navigation';
import {  LoginContainer, 
	ChangePasswordConatiner, 
	NotifySettingsContainer, 
	DefaultSettingsContainer,
	DocumentListContainer } from '../containers'
import HomeDrawer from './HomeDrawer';
import { ScalePerctFullWidth } from '../asset';
import { DocumentNavigator } from './DocumentNavigator';
import { SettingsApi } from '../service'
import { Actions } from '../redux'

type Props = {
	navigation: any,
	setAccessories: any,
	setLanguages: any,
	setPlatforms: any
};

class HomeNavigator extends PureComponent<Props> {
	constructor(props) {
		super(props)
		SettingsApi(this.onSettingsFetched, this.onSettignFailure)
	}

	onSettingsFetched = (data) => {
		const {setAccessories, setLanguages, setPlatforms} = this.props
		setPlatforms(data.Platforms)
		setAccessories(data.Accessories)
		setLanguages(data.Languages)
	}

	onSettignFailure = () => {

	}

    render() {
        return <Home screenProps={{ rootNavigation: this.props.navigation }}/>;
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigator);

const Home = createDrawerNavigator({
   
    DefaultSettings: {
		screen: DefaultSettingsContainer,
    },
    ChangePassword: {
		screen: ChangePasswordConatiner,
    },
    NotificationSettings: {
      screen: NotifySettingsContainer
    },
    DocumentList: {
      screen: DocumentNavigator
    }
    
  }, {
	initialRouteName: "DocumentList",
    contentComponent: HomeDrawer,
    drawerWidth: ScalePerctFullWidth(85)
  }
);