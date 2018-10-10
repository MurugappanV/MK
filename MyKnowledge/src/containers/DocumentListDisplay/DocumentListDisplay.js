/**
 * Document List Display
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { Colors, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Line, Footer, StatusBarComp, MediumText, SmallText, SearchInput } from '../../components'
import { Header } from '../Header';

const documentData = [
        {value: 1, title: 'Set Default Platform'}, 
        {value: 1, title: 'Notifications'},
        {value: 1, title: 'Change Password'},
        {value: 1, title: 'Log out'},
        {value: 1, title: 'All'}, 
        {value: 1, title: 'Newsletters'},
        {value: 1, title: 'Service Documents'},
        {value: 1, title: 'Videos'},
        {value: 1, title: 'Trainings'},
        {value: 1, title: 'Communications'},
        {value: 1, title: 'Feedback'}, 
        {value: 1, title: 'Help'}
  ]

type Props = {
    style?: number | Object | Array<number>
}

export class DocumentListDisplay extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {searchSelected: false, seachKey: ""}
    }

    onItemSelect = () => {
        this.props.navigation.navigate("Details")
    }

    onSearchOpen = () => {
        this.setState({searchSelected: true})
    }

    onSearchClose = () => {
        this.setState({searchSelected: false})
    }

    onSeachKeyChange = (text) => {
        this.setState({seachKey: text})
    }

    renderItem = (item) => {
        return <TouchableOpacity onPress={this.onItemSelect} style={styles.documentContainer}>
            <View style={styles.itemRow1}>
                <MediumText style={styles.itemTitle} text={item.title}/>
                <MediumText style={styles.itemSecondarytext} text={'>'}/>
            </View>
            <View style={styles.itemRow2}>
                <SmallText style={styles.itemSecondarytext} text={'Modified: 09/04/2018'}/>
            </View>
        </TouchableOpacity>
    }

    renderSeperator = () => {
        return <Line style={styles.itemSeperator}/>
    }

    renderHeader = () => {
        return <View style={styles.listHeader}/>
    }

    // renderFooter = () => {
    //     return <Line style={styles.line}/>
    // }

    render() {
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header 
                navigation={this.props.screenProps.rootNavigation} 
                onSearchSelected={this.onSearchOpen}
                onFilterSelected={this.onSearchOpen}/>
            {this.state.searchSelected && 
                <SearchInput 
                    placeHolder={'Search'} 
                    returnKey={'search'} 
                    text={this.state.seachKey} 
                    onChangeText={this.onSeachKeyChange}
                    onClose={this.onSearchClose}
                />
            }
            <FlatList
                style={StyleSheet.flatten([styles.listcontainer, this.props.style])}
                renderItem={({item, index}) => this.renderItem(item,index)}
                ItemSeparatorComponent={this.renderSeperator}
                ListHeaderComponent={this.renderHeader}
                data={documentData}
                keyExtractor={(item, index) => item.title}
            />
            <Footer/>
        </View>
    }
}

DocumentListDisplay.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    listcontainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    listHeader: {
        marginTop: 30
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
    itemRow1: {
        flexDirection: 'row',
        marginBottom: 10
    },
    itemRow2: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20
    },
    itemTitle: {
        flex: 1,
        textAlign: 'left'
    },
    itemSecondarytext: {
        color: Colors.bodySecondaryLight
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
    documentContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 10
    }
})