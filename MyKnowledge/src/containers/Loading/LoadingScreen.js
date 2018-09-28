/**
 * Full Screen loading with semitransparent background and Loading component
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import React from 'react';
import { StyleSheet, View } from 'react-native'
import {Colors, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import {LoadingComponent} from '../../components'

type Props = {
    title: string,
    style?: number | Object | Array<number>,
    textStyle?: number | Object | Array<number>,
    loadingContStyle?: number | Object | Array<number>,
}

export function LoadingScreen(props: Props) {
    return <View style={StyleSheet.flatten([styles.container, props.style])}>
        <LoadingComponent style={props.loadingContStyle} textStyle={props.textStyle} title={props.title}/>
    </View>
}

LoadingScreen.defaultProps = {
    style: undefined,
    loadingContStyle: undefined,
    textStyle: undefined,
    title: undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.bgSemiTransparent,
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100)
    },
})