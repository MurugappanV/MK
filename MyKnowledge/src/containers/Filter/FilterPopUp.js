/**
 * Filter pop up 
 * Author : Murugappan V
 * Date   : 12 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, Modal, TouchableOpacity, View } from 'react-native'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth, ScaleSampDesgHeight} from '../../asset'
import { MediumText, SmallText } from '../../components'

type Props = {
    style?: number | Object | Array<number>,
    visible: Boolean,
    onApply: Function,
    renderItem: any
}

export class FilterPopUp extends PureComponent<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        const {visible, onApply, renderItem} = this.props
        return <Modal  animationType="slide" transparent={false} visible={visible} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.apply} onPress={onApply}>
                        <SmallText style={styles.applyText} text={'Apply'}/>
                    </TouchableOpacity>
                </View>
                {renderItem()}
            </View>
        </Modal>
    }
}

FilterPopUp.defaultProps = {
    style: undefined,
    visible: false
}

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    header: {
        flexDirection: 'column',
        backgroundColor: Colors.bgPrimaryDark,
        width: ScalePerctFullWidth(100),
        height: ScaleSampDesgHeight(60),
        padding: 20
    },
    apply: {
        alignSelf: 'flex-end'
    },
    applyText: {
        color: Colors.bodyPrimaryLight,
        fontWeight: 'bold'
    }
})