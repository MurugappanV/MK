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
import RNFetchBlob from 'rn-fetch-blob'
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth, Images} from '../../asset'
import { Modal, ProgressLoadignComp, LoadingIndicatorComp, Footer, StatusBarComp, ExtraLargeText, MediumText, Line, ScrollPicker } from '../../components'
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
    modalVisible: boolean,
    downloading: boolean, 
    value: number, 
    title: string
}

class DocumentDisplay extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props) {
        super(props)
        const documentId = props.navigation.getParam("documentId", null);
        // const documentId = 20
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
        this.state = {modalVisible: false, downloading: false, value: 0, title: ''}
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

    onDownload = (title, file_format, download_link) => {
        const android = RNFetchBlob.android
        let dirs = RNFetchBlob.fs.dirs
        console.log('dirs ', dirs.DocumentDir)
        this.setState({downloading: true, value: 0, title: title})
        RNFetchBlob.config({
            path : dirs.DocumentDir + '/' + title
        })
        .fetch('GET', download_link)
        .progress((received, total) => {
            this.setState({value: received / total})
            console.log('progress', received / total)
        })
        .then((res) => {
            console.log('res ', res)
            console.log('path ', res.path())
            android.actionViewIntent(res.path(), file_format)
            this.setState({downloading: false, value: 0, title: ''})
        }).catch(error => {
            console.log('fetch error ', error)
            this.setState({downloading: false, value: 0, title: ''})
        })
        
    }

    // addAndroidDownloads : {
    //     useDownloadManager : true,
    //     title : title,
    //     description : 'HP document',
    //     mime : file_format,
    //     mediaScannable : true,
    //     notification : true,
    //     },

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
        const {document_name, download_link, document_type, summary, uploaded, size, accessories, language, modified, file_format} = document
        const title = `${document_name}${!!file_format && file_format.indexOf('/') != -1 ? `.${file_format.substring(file_format.indexOf('/')+1)}` : ``}`
        return <View style={styles.contentContainer}>
            <ExtraLargeText style={styles.title} text={"File Details"}/>
            <MediumText style={styles.subTitle} text={"Title"}/>
            <MediumText style={styles.subTitle} text={title}/>
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
            {uploaded && <TouchableOpacity onPress={() => this.onDownload(title, file_format, download_link)}>
                <Image tintColor={Colors.bodyPrimaryVarient} style={styles.downloadImage} source={Images.downloadImg}/>
                <MediumText text={'Download'}/>
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

    renderProgress = (value: number, description: string) => {
        return <View style={styles.progressView}>
            <ProgressLoadignComp 
                title ={"Downloading file"}
                description={description}
                value={value}
                style={styles.progress}
            />
        </View>
    }
    // style?: number | Object | Array<number>,
    // titleStyle?: number | Object | Array<number>,
    // descriptionStyle?: number | Object | Array<number>,

    render() {
        const {modalVisible, downloading, value, title} = this.state
        return <View style={styles.container}>
            <StatusBarComp/>
            {this.renderPlatforms(modalVisible)}
            <Header 
                title={`${this.props.filters.platformName} - ${this.props.screenProps.title}`} 
                navigation={this.props.screenProps.rootNavigation}
            />
            {this.renderView()}
            <Footer/>
            {downloading && this.renderProgress(value, title)}
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
    },
    progressView: {
        position: 'absolute', 
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    progress: {
    }

})