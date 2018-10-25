/**
 * Loading component with large spinner and title
 * Author : Murugappan V
 * Date   : 25 Oct 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, ActivityIndicator, View, Platform, ProgressBarAndroid } from 'react-native'
import {Colors, Metrics, ScaleSampDesgHeight, ScaleSampDesgWidth} from '../../asset'
import {LargeText, MediumText, SmallText} from '../Texts'

type Props = {
    title: string,
    description: string,
    value: number,
    style?: number | Object | Array<number>,
    titleStyle?: number | Object | Array<number>,
    descriptionStyle?: number | Object | Array<number>,
}

const renderLoading = (value: number) => {
    if(Platform.OS === 'ios') {
        return null;
    } else {
        return <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            color={Colors.bodyPrimaryVarient}
            progress={value}
            style={styles.progress}
        />
    }
}

export function ProgressLoading(props: Props) {
    const {style, value, titleStyle, descriptionStyle} = props
    return <View style={StyleSheet.flatten([styles.container, style])}>
        <MediumText style={StyleSheet.flatten([styles.title, titleStyle])} text={props.title}/>
        <SmallText style={StyleSheet.flatten([styles.description, props.descriptionStyle])} text={props.description}/>
        {renderLoading(value)}
    </View>
}

ProgressLoading.defaultProps = {
    style: undefined,
    titleStyle: undefined,
    descriptionStyle: undefined,
    description: '',
    title: "Downloading"
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: Colors.bgPrimaryLight,
        borderRadius: Metrics.SMOOTH_CORNER,
        width: ScaleSampDesgWidth(310),
        elevation: 20,
        padding: 20,
    },
    title: {
        paddingBottom: 20,
        textAlign: 'left'
    },
    description: {
        paddingBottom: 20,
        textAlign: 'left'
    },
    progress: {
        marginBottom: 20
    },
})