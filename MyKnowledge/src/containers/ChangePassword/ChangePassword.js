/**
 * Login screen - username, password
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View } from 'react-native'
import { Colors, Metrics, Images, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, InputWthLogo, Button, MediumText, SmallText, LargeText, ExtraLargeText, StatusBarComp, ToggleBtn } from '../../components'
import { Header } from '../Header';

type Props = {
    style?: number | Object | Array<number>
}

export class ChangePassword extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {password: "", confirmPassword: "", confirmPasswordInRef: null, passwordInRef: null}
    }

    onConfirmPasswordChange = (password) => {
        this.setState({confirmPassword: password})
    }

    onPasswordChange = (password) => {
        this.setState({password: password})
    }

    passwordInputRef = (ref) => {
        this.setState({passwordInRef: ref})
    }

    confirmPasswordInRef = (ref) => {
        this.setState({confirmPasswordInRef: ref})
    }

    onChange = () => {
        this.props.navigation.goBack()
    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    renderPassword = (password) => {
        return <InputWthLogo 
            style={styles.inputContainer}
            source={Images.logoImg} 
            text={password}
            onChangeText={this.onPasswordChange}
            placeHolder={"Password"}
            textContentType={"password"}
            onSubmit={() => {this.state.confirmPasswordInRef.focus()}}
        />
    }

    renderConfirmPassword = (password) => {
        return <InputWthLogo 
            style={styles.inputContainer}
            source={Images.logoImg} 
            text={password}
            onChangeText={this.onConfirmPasswordChange}
            placeHolder={"Confirm password"}
            textContentType={"password"}
            onSubmit={this.onChange}
        />
    }

    renderChangeBtn = () => {
        return <Button
            title={"CHANGE"}
            buttonTheme={"Dark"}
            onPress={this.onChange}
            style={[styles.button, styles.buttonRight]}
        />
    }

    renderCancelBtn = () => {
        return <Button
            title={"CANCEL"}
            buttonTheme={"Light"}
            onPress={this.onCancel}
            style={[styles.button, styles.buttonLeft ]}
        />
    }

    renderButtons = () => {
        return <View style={styles.buttonContainer}>
            {this.renderChangeBtn()}
            {this.renderCancelBtn()}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header/>
            <ExtraLargeText style={styles.title} text={'Change Password'}/>
            <MediumText style={styles.description} text={'Enter your new password'}/>
            <View style={StyleSheet.flatten([styles.innerContainer, this.props.style])}>
                {this.renderPassword(this.state.password)}
                <Line style={styles.line}/>
                {this.renderConfirmPassword(this.state.confirmPassword)}
                {this.renderButtons()}
                {/* <ToggleBtn width={100} height={30} style={{height: 30}} onPress={() => {}}/> */}
            </View>
            
            <Footer/>
        </View>
    }
}

ChangePassword.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: ScalePerctFullWidth(10),
        paddingRight: ScalePerctFullWidth(10),
        flex: 1
    },
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    inputContainer: {
        width: ScalePerctFullWidth(80),
        marginTop: 5,
        marginBottom: 5
    },
    line: {
        width: ScalePerctFullWidth(80),
        borderBottomWidth: 0.5
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
    title: {
        fontWeight: 'bold',
        paddingTop: 30
    },
    description: {
        paddingTop: 20,
        paddingBottom: 20
    }
})