/**
 * Document Details Display
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth, Images} from '../../asset'
import { Modal, LoadingIndicatorComp, Footer, StatusBarComp, ExtraLargeText, MediumText, Line, ScrollPicker } from '../../components'
import { Header } from '../Header';
import { DocumentApi } from '../../service';
import { Actions } from '../../redux'
import { PlatformDisplay } from './PlatformDisplay';


type Props = {
    style?: number | Object | Array<number>,
    filters: any,
    screenProps: any
}

type State = {
    modalVisible: Boolean
}

class DocumentDisplay extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props) {
        super(props)
        const documentId = props.navigation.getParam("documentId", null);
        // const documentId = 30
        console.log('documentId out -- ', documentId)
        console.log('documentId out2 -- ', props.navigation)
        if(documentId == null) {
            props.navigation.goBack()
        } else {
            if(props.document == null || props.document.id != documentId) {
                props.clearDocumentData()
                this.fetchDocument(documentId)
            }
        }
        this.state = {modalVisible: false}
    }

    fetchDocument = (id) => {
        DocumentApi(id, this.onDocumentFetched, this.onDocumentFetchFailure)
    }

    onDocumentFetched = (response) => {
        this.props.setDocumentData(response)
    }

    onDocumentFetchFailure = (error) => {

    }

    onPlatformOpen = () => {
        this.setState({modalVisible: true})
    }

    onPlatformClose = () => {
        this.setState({modalVisible: false})
    }

    renderPlatformItems = () => {
        return this.props.document && <PlatformDisplay platform_info={this.props.document.platform_info}/>
    }

    renderPlatforms = (modalVisible: Boolean) => {
        return <Modal 
            style={{height: 350}}
            visible={modalVisible}
            onDone={this.onPlatformClose}
            onClose={this.onPlatformClose}
            btnText={'OK'}
            renderItem={this.renderPlatformItems}
        />
    }

    renderSubContent = (key, value) => {
        return <View>
            <Line style={styles.seperator}/>
            <View style={styles.subcontentView}>
                <MediumText style={styles.subTitle} text={key}/>
                {value != "--" && <MediumText style={styles.subTitle} text={value}/>}
            </View>
        </View>
    }

    renderContent = (document) => {
        const {document_name, document_type, summary, uploaded, size, accessories, language, modified, file_format} = document
        return <View style={styles.contentContainer}>
            <ExtraLargeText style={styles.title} text={"File Details"}/>
            <MediumText style={styles.subTitle} text={"Title"}/>
            <MediumText style={styles.subTitle} text={`${document_name}${!!file_format && file_format.indexOf('/') != -1 ? `.${file_format.substring(file_format.indexOf('/')+1)}` : ``}`}/>
            <Line style={styles.seperator}/>
            <TouchableOpacity onPress={this.onPlatformOpen}>
                <MediumText style={styles.subtileTitle} text={"Platform Det"}/>
            </TouchableOpacity>
            {this.renderSubContent("Type", document_type)}
            {this.renderSubContent("Accessories", accessories)}
            {this.renderSubContent("Language", language)}
            {this.renderSubContent("Modified", modified)}
            {this.renderSubContent("Size", size == "--" ? size : `${size} MB`)}
            {this.renderSubContent("Summary", summary)}
            <Line style={styles.seperatorBlue}/>
            {uploaded && <TouchableOpacity onPress={this.onPlatformOpen}>
                <Image tintColor={Colors.bodyPrimaryVarient} style={styles.downloadImage} source={Images.downloadImg}/>
                <MediumText style={styles.downloadText} text={'Download'}/>
            </TouchableOpacity>}
        </View>
    }

    renderView = () => {
        const { document } = this.props
        console.log('document - ', document)
        if(document != null) {
            console.log('document - in ')
            return this.renderContent(document)
        } else {
            return <LoadingIndicatorComp style={{flex: 1}}/>
        }
    }

    render() {
        const {modalVisible} = this.state
        return <View style={styles.container}>
            <StatusBarComp/>
            {this.renderPlatforms(modalVisible)}
            <Header 
                title={`${this.props.filters.platformName} - ${this.props.screenProps.title}`} 
                navigation={this.props.screenProps.rootNavigation}
            />
            {this.renderView()}
            <Footer/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters,
        document: state.document,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDisplay)


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
    seperatorBlue: {
        borderBottomWidth: 0.5,
        marginTop: 30,
        marginBottom: 20,
        borderBottomColor: Colors.bodyPrimaryVarient
    },
    subtileTitle: {
        textAlign: 'left',
        color: Colors.bodySecondaryLight
    },
    subcontentView: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    downloadImage: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    downloadText: {
        color: Colors.bodyPrimaryVarient
    }
})