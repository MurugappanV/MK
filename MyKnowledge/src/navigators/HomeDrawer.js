/**
 * Drawer Navigator
 * Author : Murugappan V
 * Date   : 5 Oct 2018
 * @flow
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import { Colors, DrawerData, ScalePerctFullHeight, ScalePerctFullWidth} from '../asset'
import {StyleSheet, SectionList, Linking, View} from 'react-native';
import { MediumText, Line, LogoTextBtn } from '../components';
import { setAuthValue, setUserName } from '../storage'

type Props = {
  style?: number | Object | Array<number>,
  userName: string,
  navigation: any,
  screenProps: any,
  logout: Function
}

class HomeDrawer extends PureComponent<Props> {
    static defaultProps = {
        style: undefined
    }

    navigateToScreen = (route: string) => () => {
        switch(route) {
            case "LogOut": {
                setAuthValue(null)
                setUserName(null)
                this.props.logout()
                this.props.screenProps.rootNavigation.navigate("Auth")
                break;
            }
            case "Feedback": {
                Linking.openURL(`mailto:lfpmyknowledgeapp@hp.com?subject=Feedback by ${this.props.userName}`)
                break;
            }
            case "Help": {
                Linking.openURL(`mailto:lfpmyknowledgeapp@hp.com?subject=Support request by ${this.props.userName}`)
                break;
            }
            default: {
                const navigateAction = NavigationActions.navigate({
                    routeName: route
                });
                this.props.navigation.dispatch(navigateAction);
                this.props.navigation.toggleDrawer();
            }
        }
        
    }

    renderHeader = (title: string) => {
        return <View style={styles.headerContainer}>
            <MediumText style={styles.header} text={title}/>
            <Line style={styles.line}/>
        </View>
    }

    renderItem = (item: any,index: number) => {
        return <View key={index}>
            {index != 0 && <Line style={styles.itemLine}/>}
            <LogoTextBtn
              style={styles.item}
              imageStyle={styles.iconStyle}
              onPress={this.navigateToScreen(item.routeName)} 
              text={item.title} 
              source={item.img}/>
        </View>
    }

    render () {
        return (
            <SectionList
                style={StyleSheet.flatten([styles.container, this.props.style])}
                renderItem={({item, index, section}) => this.renderItem(item,index)}
                renderSectionHeader={({section: {title}}) => (this.renderHeader(title))}
                sections={DrawerData}
                keyExtractor={(item, index) => item.title}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(HomeDrawer);

const styles = StyleSheet.create({
    container: {
        width: ScalePerctFullWidth(85),
        height: ScalePerctFullHeight(100)
    },
    headerContainer: {
        paddingTop: 30,
        paddingBottom: 20
    },
    header: {
        fontWeight: 'bold', 
        color: Colors.bodyPrimaryVarient,
        
    },
    line: {
        alignSelf: 'center',
        width: ScalePerctFullWidth(75),
        borderBottomWidth: 2,
        marginTop: 3,
        borderBottomColor: Colors.bodyPrimaryVarient,
    },
    item: {
        paddingLeft: ScalePerctFullWidth(5),
        paddingRight: ScalePerctFullWidth(5),
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemImageStyle: {

    },
    itemTextStyle:{

    },
    itemLine: {
        width: ScalePerctFullWidth(47),
        marginLeft: ScalePerctFullWidth(27)
    },
    iconStyle: {
        width: 15,
        height: 15
    }
})

// <View style={styles.container}>
      //   <ScrollView>
      //     <View>
      //       <Text style={styles.sectionHeadingStyle}>
      //         Section 1
      //       </Text>
      //       <View style={styles.navSectionStyle}>
      //         <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
      //         Page1
      //         </Text>
      //       </View>
      //     </View>
      //     <View>
      //       <Text style={styles.sectionHeadingStyle}>
      //         Section 2
      //       </Text>
      //       <View style={styles.navSectionStyle}>
      //         <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
      //           Page2
      //         </Text>
      //         <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
      //           Page3
      //         </Text>
      //       </View>
      //     </View>
      //   </ScrollView>
      //   <View style={styles.footerContainer}>
      //     <Text>This is my fixed footer</Text>
      //   </View>
      // </View>