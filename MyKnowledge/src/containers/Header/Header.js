/**
 * Common Header component
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View, Image } from 'react-native'
import {Colors, ScalePerctFullWidth, Images, ScaleSampDesgHeight} from '../../asset'
import { LargeText } from '../../components';

type Props = {
    title: string,
    style?: number | Object | Array<number>,
    isSearch: boolean,
    isFilter: boolean
}

export class Header extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <View style={StyleSheet.flatten([styles.container, this.props.style])}>
            <Image style={styles.menuImage} source={Images.logoImg}/>
            <LargeText style={styles.title} text={this.props.title}/>
            {this.props.isSearch && <Image style={styles.menuImage} source={Images.logoImg}/>}
            {this.props.isFilter && <Image style={styles.menuImage} source={Images.logoImg}/>}
        </View>
    } 
}

Header.defaultProps = {
    style: undefined,
    title: 'HP MyKnowledge',
    isSearch: false,
    isFilter: false
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
        height: 30,
        resizeMode: 'contain'
    },
    title: {
        color: Colors.bodyPrimaryLight,
        flex: 1,
    }
})