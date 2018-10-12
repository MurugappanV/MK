/**
 * Filter screen 
 * Author : Murugappan V
 * Date   : 11 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, Modal, TouchableOpacity, View } from 'react-native'
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, Button, StatusBarComp, MediumText, SmallText, SelectMultiple } from '../../components'
import { Header } from '../Header';
import { FilterPopUp } from './FilterPopUp';

type Props = {
    style?: number | Object | Array<number>,
    navigation: any
}

export class FilterScreen extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {modalVisible: false}
    }

    onApply = () => {
        this.props.navigation.goBack()
    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    onClear = () => {
        this.props.navigation.goBack()
    }

    onFilterSelect = () => {
        this.setState({modalVisible: true})
    }

    onFilterClose = () => {
        console.log("close")
        this.setState({modalVisible: false})
    }

    renderFilter = (label) => {
        return <TouchableOpacity style={styles.filter} onPress={this.onFilterSelect}>
            <MediumText style={styles.label} text={label}/>
            <SmallText style={styles.filterValues} text={label}/>
            <MediumText style={styles.filterIcon} text={'>'}/>
        </TouchableOpacity>
    }

    renderApplyBtn = () => {
        return <Button
            title={"APPLY"}
            buttonTheme={"Dark"}
            onPress={this.onApply}
            style={[styles.applyButton]}
        />
    }

    renderCancelBtn = () => {
        return <Button
            title={"CANCEL"}
            buttonTheme={"Light"}
            onPress={this.onCancel}
            style={[styles.button, styles.buttonRight ]}
        />
    }

    renderClearBtn = () => {
        return <Button
            title={"CLEAR FILTER"}
            buttonTheme={"Varient"}
            onPress={this.onClear}
            style={[styles.button, styles.buttonLeft ]}
        />
    }

    renderButtons = () => {
        return <View style={styles.buttonContainer}>
            {this.renderApplyBtn()}
            <View style={styles.buttonInnerContainer}>
                {this.renderCancelBtn()}
                {this.renderClearBtn()}
            </View>
        </View>
    }

    renderFilterItems = () => {
        return <SelectMultiple
            items={["HP 100", "HP 200", "HP XL"]}
            selectedItems={["HP 200"]}
            onSelectionsChange={() => {}} 
        />
    }

    renderFilterPopUp = (modalVisible) => {
        return <FilterPopUp 
            visible={modalVisible}
            onApply={this.onFilterClose}
            renderItem={this.renderFilterItems}
        />
    }

    render() {
        const {modalVisible} = this.state
        return <View style={styles.container}>
            <StatusBarComp/>
            {this.renderFilterPopUp(modalVisible)}
            <Header navigation={this.props.navigation}/>
            <View style={StyleSheet.flatten([styles.innerContainer, this.props.style])}>
                {this.renderFilter("Platform")}
                <Line style={styles.line}/>
                {this.renderFilter("Series")}
                <Line style={styles.line}/>
                {this.renderFilter("Accessories")}
                {this.renderButtons()}
            </View>
            <Footer/>
        </View>
    }
}

FilterScreen.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    innerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        flex: 1
    },
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    line: {
        width: ScalePerctFullWidth(100) - 40,
        borderBottomWidth: 0.5
    },
    buttonInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'column',
        alignSelf: 'stretch'
    },
    applyButton: {
        borderBottomLeftRadius: Metrics.SMALL_RADIUS,
        borderTopRightRadius: Metrics.SMALL_RADIUS
    },
    button: {
        flex : 1,
        borderBottomLeftRadius: Metrics.SMALL_RADIUS,
        borderTopRightRadius: Metrics.SMALL_RADIUS
    },
    buttonLeft: {
        marginLeft: 5
    },
    buttonRight: {
        marginRight: 5
    },
    filter: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        alignSelf: 'stretch'
    },
    label: {
        textAlign: 'left',
        flex: 3
    },
    filterValues: {
        flex: 7,
        textAlign: 'right',
        color: Colors.bodySecondaryLight
    },
    filterIcon: {
        marginLeft: 10
    }
})