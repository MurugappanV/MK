/**
 * Platform Display
 * Author : Murugappan V
 * Date   : 23 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View } from 'react-native'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { MediumText, ScrollPicker } from '../../components'

type Props = {
    style?: number | Object | Array<number>,
    platform_info: Array<Object>
}

type State = {
    platform_info: Array<Object>,
    platform_models: Array<Object>
}

export class PlatformDisplay extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props) {
        super(props)
        const { platform_info } = props
        this.state = {platform_info: platform_info, platform_models: platform_info[0].platform_models}
    }

    render() {
        const { platform_info, platform_models } = this.state
        return <View style={styles.container}>
            <ScrollPicker
                dataSource={platform_info}
                selectedIndex={0}
                itemHeight={50}
                wrapperHeight={250}
                renderItem={(data, index, isSelected) => {
                    return <View>
                        <MediumText style={{color: isSelected ? Colors.bodyPrimaryDark : Colors.bodySecondaryLight}} text={data.platform_name}/>
                    </View>
                }}
                onValueChange={(data, selectedIndex) => {
                    this.setState({platform_models: platform_info[selectedIndex].platform_models})
                }}
            />
            <ScrollPicker
                dataSource={platform_models}
                selectedIndex={0}
                itemHeight={50}
                wrapperHeight={250}
                renderItem={(data, index, isSelected) => {
                    return <View>
                        <MediumText  style={{color: isSelected ? Colors.bodyPrimaryDark : Colors.bodySecondaryLight}} text={data}/>
                    </View>
                }}
                onValueChange={(data, selectedIndex) => {
                    
                }}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
})