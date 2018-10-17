/**
 * Login screen - username, password
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, View, Alert } from 'react-native'
import { Colors, Metrics, Images, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, ImageWthTitle, InputWthLogo, Button, StatusBarComp, AlertComp } from '../../components'
import { LoginApi, setCookie } from '../../service'
import { setAuthValue, setUserName } from '../../storage'
import { Actions } from '../../redux'

type Props = {
    style?: number | Object | Array<number>,
    navigation: any,
    screenProps: any,
    setUserName: Function
}

type State = {
    userName: string,
    password: string,
    userNameInRef: any,
    passwordInRef: any,
}

class LoginScreen extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props: Props) {
        super(props)
        this.state = {userName: "", password: "", userNameInRef: null, passwordInRef: null}
    }

    onUserNameChange = (name: string) => {
        this.setState({userName: name})
    }

    onPasswordChange = (password: string) => {
        this.setState({password: password})
    }

    onLoginSuccess = (data: Object) => {
        const {name, token} = data
        setCookie(token)
        setAuthValue(token)
        setUserName(name)
        this.props.setUserName(name)
        this.props.screenProps.rootNavigation.navigate("Home")
    }

    onLoginFailure = (error) => {
        AlertComp('Login error', 'Invalid username or password')
    }

    onLogin = () => {
        LoginApi(this.state.userName, this.state.password, this.onLoginSuccess, this.onLoginFailure)
    }

    onFrgtPassWrd = () => {
        this.props.navigation.navigate("ForgotPassword")
    }

    passwordInputRef = (ref: any) => {
        this.setState({passwordInRef: ref})
    }

    userNameInRef = (ref: any) => {
        this.setState({userNameInRef: ref})
    }

    renderUserName = (userName: string) => {
        return <InputWthLogo 
            style={styles.inputContainer}
            source={Images.userImg} 
            text={userName}
            onChangeText={this.onUserNameChange}
            placeHolder={"Username"}
            textContentType={"username"}
            onSubmit={() => {this.state.passwordInRef.focus()}}
            onRef={this.userNameInRef}
        />
    }

    renderPassword = (password: string) => {
        return <InputWthLogo 
            style={styles.inputContainer}
            source={Images.lockImg} 
            text={password}
            onChangeText={this.onPasswordChange}
            placeHolder={"Password"}
            textContentType={"password"}
            returnKey={"done"}
            onSubmit={this.onLogin}
            onRef={this.passwordInputRef}
        />
    }

    renderLoginBtn = () => {
        return <Button
            title={"LOG IN"}
            buttonTheme={"Dark"}
            onPress={this.onLogin}
            style={[styles.button, styles.buttonRight]}
        />
    }

    renderForgotBtn = () => {
        return <Button
            title={"FORGOT PASSWORD?"}
            buttonTheme={"Light"}
            onPress={this.onFrgtPassWrd}
            style={[styles.button, styles.buttonLeft ]}
        />
    }

    renderButtons = () => {
        return <View style={styles.buttonContainer}>
            {this.renderLoginBtn()}
            {this.renderForgotBtn()}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <View style={StyleSheet.flatten([styles.innerContainer, this.props.style])}>
                <StatusBarComp/>
                <ImageWthTitle style={styles.logoContainer} title={"HP LFP Myknowledge"} source={Images.logoImg}/>
                {this.renderUserName(this.state.userName)}
                <Line style={styles.line}/>
                {this.renderPassword(this.state.password)}
                {this.renderButtons()}
            </View>
            <Footer/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bgPrimaryLight,
        paddingLeft: ScalePerctFullWidth(10),
        paddingRight: ScalePerctFullWidth(10),
        flex: 1
    },
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100)
    },
    logoContainer: {
        marginTop: 60
    },
    inputContainer: {
        width: ScalePerctFullWidth(80),
        marginTop: 10,
        marginBottom: 10
    },
    line: {
        alignSelf: 'flex-end',
        width: ScalePerctFullWidth(64)
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20
    },
    button: {
        flex : 1,
        borderBottomLeftRadius: Metrics.SMALL_RADIUS,
        borderTopRightRadius: Metrics.SMALL_RADIUS
    },
    buttonLeft: {
        marginLeft: 8
    },
    buttonRight: {
        marginRight: 8
    },
})