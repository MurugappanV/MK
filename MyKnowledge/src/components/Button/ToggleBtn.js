/**
 * Toggle button
 * Author : Murugappan V
 * Date   : 5 oct 2018
 * @flow
 */

import React, {PureComponent} from 'react'
import { StyleSheet, View, Animated, Easing, TouchableOpacity } from 'react-native'
import { MediumText } from '../Texts';
import { Colors } from '../../asset';

type Props = {
    onPress: Function,
    style?: number | Object | Array<number>,
    width: number,
    height: number
}

export class ToggleBtn extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {on: true}
        this.animValue = new Animated.Value(1)
    }

    onPress = () => {
        this.setState({on: !this.state.on})
        this.toggle(!this.state.on)
        this.props.onPress()
    }

    toggle = (on) => {
        const val = on ? 1 : 0
        Animated.timing(
            this.animValue,
            {
                toValue: val,
                duration: 300,
                easing: Easing.linear
            }
        ).start()
    }


    render() {
        const {width, height, style} = this.props
        const toggleItemWidth = width / 2;
        const x = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
        })
        return <TouchableOpacity onPress={this.onPress} style={StyleSheet.flatten([{width: width}, style, {overflow: 'hidden'}])}>
            <Animated.View style={[styles.container, {transform: [{translateX: x}]}]}>
                <View style={[styles.innerContainer, {textAlign: 'center', height: height, width: toggleItemWidth, backgroundColor: Colors.bgPrimaryDark}]}>
                    <MediumText text={"ON"}/>
                </View>
                <View style={[styles.innerContainer, {textAlign: 'center', height: height, width: toggleItemWidth, backgroundColor: Colors.bgPrimaryLight}]}>
                    <MediumText text={""}/>
                </View>
                <View style={[styles.innerContainer, {textAlign: 'center', height: height, width: toggleItemWidth, backgroundColor: Colors.bgSecondaryLight}]}>
                    <MediumText text={"OFF"}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
    }
}

ToggleBtn.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    }
})