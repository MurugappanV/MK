/**
 * Auth loading container
 * Author : Murugappan V
 * Date   : 17 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, View } from 'react-native'
import {Colors, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import {LoadingComponent} from '../../components'
import { setCookie } from '../../service'
import { getAuthValue, getUserName } from '../../storage'
import { Actions } from '../../redux'

type Props = {
    navigation: any,
    setUserName: Function
}

class AuthLoading extends PureComponent<Props> {
    static defaultProps = {
    }

    constructor(props) {
        super(props)
        getAuthValue().then(authToken => {
            if(authToken != null) {
                setCookie(authToken)
                getUserName().then(name => {
                    props.setUserName(name)
                })
                this.props.navigation.navigate("Home")
            } else {
                this.props.navigation.navigate("Auth")
            }
        }).catch(error => {
            console.log(error)
            this.props.navigation.navigate("Auth")
        })
    }

    render() {
        return <View style={styles.container}>
            <LoadingComponent title={"Authenticating..."}/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bgSemiTransparent,
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100)
    },
})