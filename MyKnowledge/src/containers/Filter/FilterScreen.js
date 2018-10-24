/**
 * Filter screen 
 * Author : Murugappan V
 * Date   : 11 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Colors, Images, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, Button, StatusBarComp, MediumText, SmallText, SelectMultiple, RadioGroup, Modal } from '../../components'
import { Header } from '../Header';
// import { FilterPopUp } from './FilterPopUp';
import { Actions } from '../../redux'

type Props = {
    style?: number | Object | Array<number>,
    navigation: any,
    filters: any,
    accessories: any,
    platforms: any,
    platformId: number
}

type State = {
    modalVisible: Boolean,
    selectedFilter: String,
    selectedPlatform: number,
    selectedSeries: Array<String>,
    selectedAccessories: Array<number>
}

const Platform = "Platform"
const Series = "Series"
const Accessories = "Accessories"

class FilterScreen extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props: Props) {
        super(props)
        const {platformId, series, accessories} = props.filters
        console.log('platform', platformId + " " + series + " " + accessories)
        let platformName = null
        this.platformList = props.platforms.map(platform => {
            if(platform.platform_id == platformId) {
                platformName = platform.platform_name
                this.seriesList = platform.platform_models
            }
            return {
                label: platform.platform_name,
                value: platform.platform_id
            }
        })
        let selectedAccessorieNames = []
        this.accessoriesList = props.accessories.map(accessory => {
            if(accessories.includes(accessory.id)) {
                selectedAccessorieNames.push(accessory.name)
            }
            return {
                label: accessory.name,
                value: accessory.id
            }
        })
        console.log('platform list ', platformName)
        this.state = {modalVisible: false, selectedFilter: null, selectedPlatformName: platformName, selectedPlatform: platformId, selectedSeries: series, selectedAccessories: accessories, selectedAccessorieNames: selectedAccessorieNames}
    }

    onApply = () => {
        const {selectedPlatform, selectedPlatformName, selectedSeries, selectedAccessories} = this.state
        this.props.setFilters(selectedPlatform, selectedPlatformName, selectedSeries, selectedAccessories)
        this.props.navigation.goBack()
    }

    onCancel = () => {
        this.props.navigation.goBack()
    }

    onClear = () => {
        const name = this.props.platforms.find(platform => platform.platform_id == this.props.platformId).platform_name
        this.setState({selectedPlatformName: name,selectedPlatform: this.props.platformId, selectedSeries: [], selectedAccessories: [], selectedAccessorieNames: []})
    }

    onFilterSelect = (label: String) => {
        this.setState({modalVisible: true, selectedFilter: label})
    }

    onFilterClose = () => {
        this.setState({modalVisible: false, selectedFilter: null})
    }

    onPlatformChange = (value: number, label: String) => {
        console.log("selected platform ", value)
        this.seriesList = this.props.platforms.find(platform => platform.platform_id == value).platform_models
        this.setState({selectedPlatformName: label, selectedPlatform: value, selectedSeries: []})
    }

    onSeriesChange = (selectedValues: Array) => {
        this.setState({selectedSeries: selectedValues.map(item => item.label)})
    }

    onAccessoriesChange = (selectedValues: Array) => {
        this.setState({selectedAccessories: selectedValues.map(item => item.value)})
        this.setState({selectedAccessorieNames: selectedValues.map(item => item.label)})
    }

    renderFilter = (label: string) => {
        let filterValues = ''
        if(label == Platform) {
            filterValues = this.state.selectedPlatformName
        } else if(label == Series) {
            filterValues = this.state.selectedSeries.join(',')
        } else {
            filterValues = this.state.selectedAccessorieNames.join(',')
        }
        return <TouchableOpacity style={styles.filter} onPress={() => this.onFilterSelect(label)}>
            <MediumText style={styles.label} text={label}/>
            <SmallText textProps={{ellipsizeMode: 'tail', numberOfLines: 1}} style={styles.filterValues} text={filterValues}/>
            <Image tintColor={Colors.bodySecondaryLight} style={styles.arrowImage} source={Images.arrowImg}/>
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
        if(this.state.selectedFilter == Platform) {
            return <RadioGroup 
                data={this.platformList} 
                size={20} 
                color={Colors.bodyPrimaryVarient} 
                onPress={this.onPlatformChange}
                value={this.state.selectedPlatform} 
            />
        } else if(this.state.selectedFilter == Series) {
            console.log("series ", this.seriesList + " " + this.state.selectedSeries)
            return <SelectMultiple
                items={this.seriesList}
                selectedItems={this.state.selectedSeries}
                onSelectionsChange={this.onSeriesChange} 
            />
        } else {
            console.log("accc ", this.accessoriesList + " " + this.state.selectedAccessories)
            const accessory = this.accessoriesList.filter(element => this.state.selectedAccessories.includes(element.value))
            return <SelectMultiple
                items={this.accessoriesList}
                selectedItems={accessory}
                onSelectionsChange={this.onAccessoriesChange} 
            />
        }
    }

    renderFilterPopUp = (modalVisible: Boolean) => {
        return <Modal 
            visible={modalVisible}
            onDone={this.onFilterClose}
            onClose={this.onFilterClose}
            btnText={'Apply'}
            renderItem={this.renderFilterItems}
            extraData={{
                selectedPlatform: this.state.selectedPlatform,
                selectedSeries: this.state.selectedSeries,
                selectedAccessories: this.state.selectedAccessories,
            }}
        />
    }

    render() {
        const {modalVisible} = this.state
        return <View style={styles.container}>
            <StatusBarComp/>
            {this.renderFilterPopUp(modalVisible)}
            <Header 
                title={`${this.props.filters.platformName} - ${this.props.screenProps.title}`} 
                navigation={this.props.screenProps.rootNavigation}
            />
            <View style={StyleSheet.flatten([styles.innerContainer, this.props.style])}>
                {this.renderFilter(Platform)}
                <Line style={styles.line}/>
                {this.renderFilter(Series)}
                <Line style={styles.line}/>
                {this.renderFilter(Accessories)}
                {this.renderButtons()}
            </View>
            <Footer/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        platforms: state.settings.platforms,
        accessories: state.settings.accessories,
        platformId: state.defaultSettings.platformId,
        filters: state.filters
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen)

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
    },
    arrowImage: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        marginLeft: 10
    }
})