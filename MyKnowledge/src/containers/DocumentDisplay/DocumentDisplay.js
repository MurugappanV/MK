/**
 * Document Details Display
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import { StyleSheet, View } from 'react-native'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { Footer, StatusBarComp, ExtraLargeText, MediumText, Line  } from '../../components'
import { Header } from '../Header';


type Props = {
    style?: number | Object | Array<number>
}

export class DocumentDisplay extends PureComponent<Props> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent = () => {
        return <View style={styles.contentContainer}>
            <ExtraLargeText style={styles.title} text={"File Details"}/>
            <MediumText style={styles.subTitle} text={"Title"}/>
            <MediumText style={styles.subTitle} text={"xxxx xxxxxxx xxxxxxxxxxx xxxxxx xxxxxxx xxxx xx xxxxxx xxxxxx xxxxxxxxx.pdf"}/>
            <Line style={styles.seperator}/>
            <MediumText style={styles.subtileTitle} text={"Platform Det"}/>
        </View>
    }

    render() {
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header navigation={this.props.screenProps.rootNavigation}/>
            {this.renderContent()}
            <Footer/>
        </View>
    }
}

DocumentDisplay.defaultProps = {
    style: undefined
}

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    contentContainer: {
        flex: 1,
        alignContent: 'stretch',
        paddingLeft: ScalePerctFullWidth(20),
        paddingRight: ScalePerctFullWidth(20),
    },
    title: {
        marginTop: 20,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    subTitle: {
        textAlign: 'left'
    },
    seperator: {
        borderBottomWidth: 0.5,
        marginTop: 6,
        marginBottom: 6
    },
    subtileTitle: {
        textAlign: 'left',
        color: Colors.bodySecondaryLight
    }
})