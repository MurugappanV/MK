/**
 * Status bar
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */

import React from 'react'
import { StatusBar } from 'react-native'

type Props = {
    style?: number | Object | Array<number>
}

export function StatusBarComp(props: Props) {
    return <StatusBar hidden={true} />
}

StatusBarComp.defaultProps = {
    style: undefined
}