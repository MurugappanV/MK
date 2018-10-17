/**
 * Default Settings
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, ScrollView, View } from 'react-native'
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, Button, StatusBarComp, ExtraLargeText, SmallText, RadioGroup } from '../../components'
import { Header } from '../Header';
import { Actions } from '../../redux'

type Props = {
    style?: number | Object | Array<number>,
    navigation: any,
    platforms: Array<Object>
}

type State = {
    value: number
}

class DefaultSettings extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props: Props) {
        super(props)
        this.state = {value: props.platformId}
    }

    onSave = () => {
        this.props.setDefaultPlatform(this.state.value)
        this.props.navigation.goBack()
    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    onRadioButtonSelect = (value: number) => {
        this.setState({value: value})
    }

    renderSaveBtn = () => {
        return <Button
            title={"SAVE"}
            buttonTheme={"Dark"}
            onPress={this.onSave}
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
            {this.renderSaveBtn()}
            {this.renderCancelBtn()}
        </View>
    }

    render() {
        const {platforms, navigation, platformId, style} = this.props
        const platformList = platforms.map(platform => {
            return {
                label: platform.platform_name,
                value: platform.platform_id
            }
        })
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header navigation={navigation}/>
            <ScrollView style={StyleSheet.flatten([styles.innerContainer, style])}>
                <ExtraLargeText style={styles.title} text={'Set default platform'}/>
                <SmallText style={styles.description} text={'Select your default platform for the landing page'}/>
                <Line style={styles.line}/>
                <RadioGroup 
                    data={platformList} 
                    size={20} 
                    value={2}
                    color={Colors.bodyPrimaryVarient} 
                    onPress={this.onRadioButtonSelect}
                    value={this.state.value} 
                />
                <Line style={styles.line}/>
                {this.renderButtons()}
            </ScrollView>
            <Footer/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        platforms: state.settings.platforms,
        platformId: state.defaultSettings.platformId
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings)

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: Colors.bgPrimaryLight,
        flex: 1
    },
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100)
    },
    radiogroup: {
        alignSelf: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start'

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
        alignSelf: 'stretch',
        borderBottomWidth: 0.5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20,
        paddingLeft: ScalePerctFullWidth(10),
        paddingRight: ScalePerctFullWidth(10),
        marginBottom: 30
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
        paddingTop: 20
    },
    description: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
        paddingBottom: 10
    }
})



// const platformList = [
//     {
//         label: 'HP Latex',
//         value: 1
//     },
//     {
//         label: 'HP Scitex',
//         value: 2
//     },
//     {
//         label: 'HP HDR',
//         value: 3
//     },
//     {
//         label: 'HP PageWide XL',
//         value: 4
//     },
//     {
//         label: 'HP PageWide A4',
//         value: 5
//     },
//     {
//         label: 'HP Latex',
//         value: 6
//     },
//     {
//         label: 'HP Scitex',
//         value: 7
//     },
//     {
//         label: 'HP HDR',
//         value: 8
//     },
//     {
//         label: 'HP PageWide XL',
//         value: 9
//     },
//     {
//         label: 'HP PageWide A4',
//         value: 10
//     },
//     {
//         label: 'HP Latex',
//         value: 11
//     },
//     {
//         label: 'HP Scitex',
//         value: 12
//     },
//     {
//         label: 'HP HDR',
//         value: 13
//     },
//     {
//         label: 'HP PageWide XL',
//         value: 14
//     },
//     {
//         label: 'HP PageWide A4',
//         value: 15
//     },
// ]