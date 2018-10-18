/**
 * Notification settings
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, SectionList, View } from 'react-native'
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, Button, StatusBarComp, ToggleBtn, MediumText } from '../../components'
import { Header } from '../Header';
import { Actions } from '../../redux'

const notificationData = [
    {
      title: null, 
      data: [
        {title: 'Email Notification'}, 
        {title: 'Mobile Notification'},
      ]
    }
]

type Props = {
    style?: number | Object | Array<number>
}

class NotificationSettings extends PureComponent<Props> {
    static defaultProps = {
        style: undefined
    }

    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    onSave = () => {
        this.props.navigation.goBack()
    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    renderItem = (item,index) => {
        return <View>
            {index != 0 && <Line style={styles.itemSeperator}/>}
            <View style={styles.toggleContainer}>
                <MediumText text={item.title}/>
                <ToggleBtn width={80} height={30} style={{height: 30}} onPress={() => {}}/>
            </View>
        </View>
    }

    renderHeader = (title) => {
        return <View style={styles.headerContainer}>
            {!!title && <MediumText style={styles.header} text={title}/>}
            <Line style={styles.line}/>
        </View>
    }

    renderFooter = () => {
        return <Line style={styles.line}/>
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
        let count = 2
        const {platforms} = this.props
        const data = notificationData.concat(platforms.map(platform => {
            count++
            return {
                title: platform.platform_name,
                data: platform.platform_models.map(model => {
                    count++
                    return { title: model }
                })
            }
        }))
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header navigation={this.props.navigation}/>
            <SectionList
                style={StyleSheet.flatten([styles.container, this.props.style])}
                renderItem={({item, index, section}) => this.renderItem(item,index)}
                renderSectionHeader={({section: {title}}) => (this.renderHeader(title))}
                renderSectionFooter={this.renderFooter}
                sections={data}
                keyExtractor={(item, index) => item.title}
                ListFooterComponent={this.renderButtons}
                initialNumToRender={count}
            />
            <Footer/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        platforms: state.settings.platforms
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings)

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    line: {
        alignSelf: 'stretch',
        borderBottomWidth: 0.5
    },
    itemSeperator: {
        alignSelf: 'stretch',
        marginLeft: 20,
        borderBottomWidth: 0.5
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        margin: 20,
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
    headerContainer: {
        marginTop: 30
    },
    header: {
        color: Colors.bodySecondaryLight, 
        textAlign: 'left',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    }
})