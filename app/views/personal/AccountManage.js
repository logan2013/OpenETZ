import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'

import { pubS,DetailNavigatorStyle } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import { toHome } from '../../root'
import { connect } from 'react-redux'
const Wallet = require('ethereumjs-wallet')
class AccountCard extends Component {
  render(){
    const { accountName, accountPsd, accountTotal, accountUnit, accountBackUp} = this.props
    return(
      <TouchableOpacity style={styles.cardView} activeOpacity={.7} onPress={accountBackUp}>
        <View style={[styles.cardTopView,pubS.bottomStyle,pubS.rowCenterJus]}>
          <View style={[pubS.rowCenter]}>
            <Image source={require('../../images/xhdpi/Penguin.png')} style={{height: scaleSize(55),width: scaleSize(55)}}/>
            <View style={{marginLeft: scaleSize(30)}}>
              <Text style={pubS.font28_3}>{accountName}</Text>
              <Text style={pubS.font22_4}>{accountPsd}</Text>
            </View>
          </View>
          <Image source={require('../../images/xhdpi/btn_ico_payment_select_def.png')} style={{width:scaleSize(16),height: scaleSize(30)}}/>
        </View>
        <View style={[styles.cardBottomView,pubS.rowCenterJus]}>
          <View style={[styles.backupBtn,pubS.center]}>
            <Text style={pubS.font22_5}>backup</Text>
          </View>
          <View style={pubS.rowCenter}>
            <Text style={pubS.font34_1}>{accountTotal}</Text>
            <Text style={[pubS.font24_5,{marginLeft: 2,marginTop:2,}]}>{accountUnit}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

class AccountManage extends Component{
  constructor(props){
    super(props)
    this.state = {
      userName: '',
      addressText: '',
    } 
  }

  componentWillMount(){
    localStorage.load({
      key: 'account'
    }).then(ret => {
      // console.log('account====',ret)
    
      this.setState({
        userName: ret.userName,
        addressText: ret.keyStore.address
      })
    
    }).catch(err => {
      
    })
  }

  toDetail = () => {
    const { userName, addressText } = this.state
    this.props.navigator.push({
      screen: 'back_up_account',
      title: userName,
      navigatorStyle: DetailNavigatorStyle,
      passProps: {
        userName: userName,
        address: `0x${addressText}`
      },
      // navigatorButtons: {
      //   rightButtons: [
      //     {
      //       title: 'save',
      //       id: 'save_back_up_info'
      //     }
      //   ]
      // }
    })
  }
  createAccountBtn = () => {
    this.props.navigator.push({
      screen: 'create_account',
      title:'create',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  importAccountBtn = () => {
    this.props.navigator.push({
      screen: 'import_account',
      title:'import',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  render(){
    // const { localKeyStore, userName } = this.props.getLocalDataReducer
    const { userName,addressText } = this.state
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        <AccountCard
          accountName={userName}
          accountPsd={`0x${addressText}`}
          accountTotal={'1000'}
          accountUnit={'ether'}
          accountBackUp={this.toDetail}
        />

      <View style={[{width: '100%',bottom:0,position:'absolute'},pubS.rowCenter]}>
        <TouchableOpacity activeOpacity={.7} onPress={this.createAccountBtn} style={[styles.btnStyle,pubS.center,{backgroundColor:'#2B8AFF'}]}>
          <Text style={pubS.font30_3}>create</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={.7} onPress={this.importAccountBtn} style={[styles.btnStyle,pubS.center,{backgroundColor:'#2B58FF'}]}>
          <Text style={pubS.font30_3}>import</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle:{
    height: scaleSize(96),
    width: '50%',
  },
  backupBtn:{
    height: scaleSize(34),
    width:scaleSize(84),
    borderWidth:1,
    borderColor: '#FF6060',
    borderRadius: scaleSize(6),

  },
  cardBottomView: {
    height: scaleSize(114),
    width: scaleSize(620),
    alignSelf:'center',
  },
  cardTopView: {
    height: scaleSize(140),
    width: scaleSize(620),
    alignSelf:'center',

  },
  cardView: {
    width: scaleSize(702),
    height: scaleSize(255),
    backgroundColor: '#fff',
    borderRadius: 4,
    alignSelf:'center',
    marginTop: scaleSize(30),
  },
})
export default connect(
  state => ({
    // getLocalDataReducer: state.getLocalDataReducer
  })
)(AccountManage)
