/**
 * Different types of Text
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from 'react'
import { StyleSheet, Platform, Text } from 'react-native'
import {Colors, Metrics} from '../../asset'

type Props = {
    text: string,
    style?: number | Object | Array<number>,
}

export function LargeText(props: Props) {
    return <Text style={StyleSheet.flatten([styles.largeText, props.style])}>{props.text}</Text>
}

export function MediumText(props: Props) {
    return <Text style={StyleSheet.flatten([styles.mediumText, props.style])}>{props.text}</Text>
}

export function SmallText(props: Props) {
    return <Text style={StyleSheet.flatten([styles.smallText, props.style])}>{props.text}</Text>
}

LargeText.defaultProps = {
    style: undefined,
    text: ""
}

MediumText.defaultProps = {
    style: undefined,
    text: ""
}

SmallText.defaultProps = {
    style: undefined,
    text: ""
}

const styles = StyleSheet.create({
    largeText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.LARGE_TEXT_SIZE,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    },
    mediumText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.MEDIUM_TEXT_SIZE,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    },
    smallText: {
        textAlign: 'center',
        color: Colors.bodyPrimaryDark,
        fontSize: Metrics.SMALL_TEXT_SIZE,
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    }
})