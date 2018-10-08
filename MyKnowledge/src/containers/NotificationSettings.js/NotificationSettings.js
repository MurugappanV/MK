/**
 * Notification settings
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, SectionList, View } from 'react-native'
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, Button, StatusBarComp, ToggleBtn, MediumText } from '../../components'
import { Header } from '../Header';

const notificationData = [
    {
      title: null, 
      data: [
        {value: 1, title: 'Set Default Platform'}, 
        {value: 1, title: 'Notifications'},
        {value: 1, title: 'Change Password'},
        {value: 1, title: 'Log out'}
      ]
    },
    {
      title: 'Document Types', 
      data: [
        {value: 1, title: 'All'}, 
        {value: 1, title: 'Newsletters'},
        {value: 1, title: 'Service Documents'},
        {value: 1, title: 'Videos'},
        {value: 1, title: 'Trainings'},
        {value: 1, title: 'Communications'}
      ]
    },
    {
      title: 'Contact Us', 
      data: [
        {value: 1, title: 'Feedback'}, 
        {value: 1, title: 'Help'}
      ]
    }
  ]

type Props = {
    style?: number | Object | Array<number>
}

export class NotificationSettings extends PureComponent<Props> {
    constructor(props) {
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
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header/>
            
            <SectionList
                style={StyleSheet.flatten([styles.container, this.props.style])}
                renderItem={({item, index, section}) => this.renderItem(item,index)}
                renderSectionHeader={({section: {title}}) => (this.renderHeader(title))}
                renderSectionFooter={this.renderFooter}
                sections={notificationData}
                keyExtractor={(item, index) => item.title}
                ListFooterComponent={this.renderButtons}
            />
            <Footer/>
        </View>
    }
}

NotificationSettings.defaultProps = {
    style: undefined
}

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