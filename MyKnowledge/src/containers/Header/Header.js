/**
 * Common Header component
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View, Image } from 'react-native'
import {Colors, ScalePerctFullWidth, Images, ScaleSampDesgHeight} from '../../asset'
import { LargeText, ImageBtn } from '../../components';

type Props = {
    title: string,
    style?: number | Object | Array<number>,
    onSearchSelected: Function,
    onFilterSelected: Function
}

export class Header extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <View style={StyleSheet.flatten([styles.container, this.props.style])}>
            <ImageBtn style={styles.menuImage} imgStyle={styles.menuImage} source={Images.menuImg} onPress={this.props.navigation.toggleDrawer}/>
            {/* <Image style={styles.menuImage} source={Images.logoImg}/> */}
            <LargeText textProps={{numberOfLines: 1, ellipsizeMode: 'tail'}} style={styles.title} text={this.props.title}/>
            {this.props.onSearchSelected && <ImageBtn style={styles.menuImage} imgStyle={styles.menuImage} source={Images.searchImg} onPress={this.props.onSearchSelected}/>}
            {this.props.onFilterSelected && <ImageBtn style={styles.filter} imgStyle={styles.filterImage} source={Images.filterImg} onPress={this.props.onFilterSelected}/>}
        </View>
    } 
}

Header.defaultProps = {
    style: undefined,
    title: 'HP MyKnowledge',
    onSearchSelected: undefined,
    onFilterSelected: undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bgPrimaryDark,
        width: ScalePerctFullWidth(100),
        height: ScaleSampDesgHeight(60),
        padding: 20
    },
    menuImage: {
        width: 20,
        height: 20
    },
    filterImage: {
        width: 17,
        height: 17
    },
    filter: {
        marginLeft: 20
    },
    title: {
        color: Colors.bodyPrimaryLight,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    }
})