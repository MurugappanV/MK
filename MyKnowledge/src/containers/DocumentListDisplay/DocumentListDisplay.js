/**
 * Document List Display
 * Author : Murugappan V
 * Date   : 8 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { StyleSheet, FlatList, View, TouchableOpacity, Image } from 'react-native'
import { Colors, Images, Metrics, ScalePerctFullHeight, ScalePerctFullWidth} from '../../asset'
import { LoadingIndicatorComp, Line, Footer, StatusBarComp, MediumText, SmallText, SearchInput } from '../../components'
import { Header } from '../Header';
import { DocumentsApi } from '../../service';
import { Actions } from '../../redux'

const documentData = [
        {value: 1, title: 'Set Default Platform'}, 
        {value: 1, title: 'Notifications'},
        {value: 1, title: 'Change Password'},
        {value: 1, title: 'Log out'},
        {value: 1, title: 'All'}, 
        {value: 1, title: 'Newsletters'},
        {value: 1, title: 'Service Documents'},
        {value: 1, title: 'Videos'},
        {value: 1, title: 'Trainings'},
        {value: 1, title: 'Communications'},
        {value: 1, title: 'Feedback'}, 
        {value: 1, title: 'Help'}
]

type Props = {
    style?: number | Object | Array<number>,
    navigation: any,
    screenProps: any,
    setDocumentList: Function
}

type State = {
    searchSelected: Boolean,
    seachKey: String,
    pageNo: Number,
    loading: boolean
}

class DocumentListDisplay extends PureComponent<Props, State> {
    static defaultProps = {
        style: undefined
    }

    constructor(props: Props) {
        super(props)
        this.state = {searchSelected: false, seachKey: "", loading: false, filters: {}}
    }

    static getDerivedStateFromProps(props, state) {
        const {filters} = props
        if(filters != state.filters) {
            return {
                searchSelected: false,
                seachKey: "",
                filters: filters
            }
        }
        return null
    }

    componentDidMount() {
        if(this.props.documents.length == 0) {
            const {platformId, series, accessories} = this.state.filters
            this.fetchDocuments(1, platformId, series, accessories)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.filters != this.state.filters) {
            const {platformId, series, accessories} = this.state.filters
            this.fetchDocuments(1, platformId, series, accessories)
        }
    }

    fetchDocuments = (pageNo: number, platform: number, series: Array<String>, accessories: Array<number>) => {
        this.setState({loading: true})
        DocumentsApi(pageNo, platform, series, accessories, this.onDocumentFetched, this.onDocumentFetchFailure)
    }

    onLoadMore = () => {
        const {pageNo, totalPages} = this.props
        const {platformId, series, accessories} = this.state.filters
        if(!this.state.loading && pageNo < totalPages) {
            this.fetchDocuments(pageNo+1, platformId, series, accessories)
        }
    }

    onDocumentFetched = (response) => {
        this.setState({loading: false})
        const {metadata, user_documents} = response
        const {page, totalPages} = metadata
        this.props.setDocumentList(page, totalPages, user_documents)
    }

    onDocumentFetchFailure = (error) => {
        this.setState({loading: false})
        
    }

    onItemSelect = (id) => {
        console.log('documentId -- ', id)
        this.props.navigation.navigate("Details", {documentId: id})
    }

    onSearchOpen = () => {
        this.setState({searchSelected: true})
    }

    onSearchClose = () => {
        this.setState({searchSelected: false})
    }

    onSeachKeyChange = (text: String) => {
        this.setState({seachKey: text})
    }

    onFilterOpen = () => {
        this.props.navigation.navigate("Filter")
    }

    renderItem = (item) => {
        return <TouchableOpacity onPress={() => this.onItemSelect(item.id)} style={styles.documentContainer}>
            <View style={styles.itemRow1}>
                <MediumText style={styles.itemTitle} text={item.document_name}/>
                <Image tintColor={Colors.bodySecondaryLight} style={styles.arrowImage} source={Images.arrowImg}/>
            </View>
            <View style={styles.itemRow2}>
                <SmallText style={styles.itemSecondarytext} text={`Modified: ${item.modified}`}/>
            </View>
        </TouchableOpacity>
    }

    renderSeperator = () => {
        return <Line style={styles.itemSeperator}/>
    }

    renderHeader = () => {
        return <View style={styles.listHeader}/>
    }

    renderFooter = (loading) => {
        if(loading) {
            return <LoadingIndicatorComp style={styles.footer}/>
        }
        return null
    }

    render() {
        return <View style={styles.container}>
            <StatusBarComp/>
            <Header 
                navigation={this.props.screenProps.rootNavigation} 
                onSearchSelected={this.onSearchOpen}
                onFilterSelected={this.onFilterOpen}
            />
            {this.state.searchSelected && 
                <SearchInput 
                    placeHolder={'Search'} 
                    returnKey={'search'} 
                    text={this.state.seachKey} 
                    onChangeText={this.onSeachKeyChange}
                    onClose={this.onSearchClose}
                />
            }
            <FlatList
                style={StyleSheet.flatten([styles.listcontainer, this.props.style])}
                renderItem={({item, index}) => this.renderItem(item)}
                ItemSeparatorComponent={this.renderSeperator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={() => this.renderFooter(this.state.loading)}
                data={this.props.documents}
                keyExtractor={(item, index) => item.id + item.document_name}
                onEndReached={this.onLoadMore}
                onEndThreshold={0}
            />
            <Footer/>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters,
        pageNo: state.documentList.pageNo,
        totalPages: state.documentList.totalPages,
        documents: state.documentList.documents,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentListDisplay)

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(100),
        height: ScalePerctFullHeight(100),
        backgroundColor: Colors.bgPrimaryLight,
    },
    listcontainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    listHeader: {
        marginTop: 30
    },
    line: {
        alignSelf: 'stretch',
        borderBottomWidth: 0.5
    },
    itemSeperator: {
        alignSelf: 'stretch',
        marginLeft: 20,
        borderBottomWidth: 0.5
    },
    itemRow1: {
        flexDirection: 'row',
        marginBottom: 10
    },
    itemRow2: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20
    },
    itemTitle: {
        flex: 1,
        textAlign: 'left'
    },
    itemSecondarytext: {
        color: Colors.bodySecondaryLight
    },
    headerContainer: {
        marginTop: 30
    },
    header: {
        color: Colors.bodySecondaryLight, 
        textAlign: 'left',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 20
    },
    documentContainer: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 10
    },
    arrowImage: {
        width: 15,
        height: 15
    },
    footer: {
        alignSelf: 'stretch',
        height: ScalePerctFullHeight(15),

    }
})