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
            <ImageBtn style={styles.menuImage} imgStyle={styles.menuImage} source={Images.logoImg} onPress={this.props.navigation.toggleDrawer}/>
            {/* <Image style={styles.menuImage} source={Images.logoImg}/> */}
            <LargeText style={styles.title} text={this.props.title}/>
            {this.props.onSearchSelected && <ImageBtn style={styles.menuImage} imgStyle={styles.menuImage} source={Images.logoImg} onPress={this.props.onSearchSelected}/>}
            {this.props.onFilterSelected && <ImageBtn style={styles.filterImage} imgStyle={styles.menuImage} source={Images.logoImg} onPress={this.props.onFilterSelected}/>}
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
        width: 30,
        height: 30
    },
    filterImage: {
        width: 30,
        height: 30,
        marginLeft: 20
    },
    title: {
        color: Colors.bodyPrimaryLight,
        flex: 1,
    }
})