/**
 * Login screen - username, password
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View } from 'react-native'
import { Colors, Metrics, Images, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, InputWthLogo, Button, MediumText, SmallText, LargeText, ExtraLargeText, StatusBarComp } from '../../components'

type Props = {
    style?: number | Object | Array<number>
}

export class ForgotPassword extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {email: ""}
    }

    onEmailChange = (email) => {
        this.setState({email: email})
    }

    onSendMail = () => {

    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    renderEmail = (email) => {
        return <InputWthLogo 
            style={styles.inputContainer}
            source={Images.emailImg} 
            text={email}
            onChangeText={this.onEmailChange}
            placeHolder={"Email account"}
            textContentType={"emailAddress"}
            onSubmit={() => {this.state.passwordInRef.focus()}}
        />
    }

    renderSendMailBtn = () => {
        return <Button
            title={"SEND EMAIL"}
            buttonTheme={"Dark"}
            onPress={this.onSendMail}
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
            {this.renderSendMailBtn()}
            {this.renderCancelBtn()}
        </View>
    }

    render() {
        return <View style={styles.container}>
            <StatusBarComp/>
            <ExtraLargeText style={styles.title} text={'Forgot Password?'}/>
            <MediumText style={styles.description} text={'A password reset link will be sent to the registered email for your account'}/>
            <View style={StyleSheet.flatten([styles.innerContainer, this.props.style])}>
                <Line style={styles.line}/>
                {this.renderEmail(this.state.email)}
                <Line style={styles.line}/>
                {this.renderButtons()}
            </View>
            <Footer/>
        </View>
    }
}

ForgotPassword.defaultProps = {
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
        paddingTop: 100
    },
    description: {
        paddingTop: 20,
        paddingBottom: 20
    }
})