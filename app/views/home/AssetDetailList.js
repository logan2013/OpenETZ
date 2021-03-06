import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'

import { pubS,DetailNavigatorStyle,MainThemeNavColor } from '../../styles/'
import { setScaleText, scaleSize } from '../../utils/adapter'
import RecordListItem from './tradingRecord/RecordListItem'
import { splitNumber } from '../../utils/splitNumber'
import { tradingAction } from '../../actions/tradingAction'
const DATA = [
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },
  {
    a_type: 'ETZ',
    a_total_name: 'Bitcoin',
    a_dollar: '123,45',
    a_mrb: '123,345,67',
  },
]

class AssetDetailList extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){
    web3.eth.getTransactionCount('0xec80a9fe89b05e337efa9c801c07c8444d9cb32e').then((res,rej)=>{
      console.log('res===',res)
      console.log('rej===',rej)
    })
  }

  toTradingRecordDetail = () => {
    this.props.navigator.push({
      screen: 'trading_record_detail',
      title:'Transaction Records',
      navigatorStyle: MainThemeNavColor,
      passProps: {
        // tx_sender: 'senderAddress',
        // tx_receiver:'receiverAddress',
        tx_note: '合作愉快',
        tx_hash: '0x462e3c5c32e4b19fa1378a1d40006ff85030cb48eaa7a6f94411c3e5761c6421',
        tx_value: '1000',
      }
    })
  }
  renderItem = () => {
    return(
      <RecordListItem
        style={{marginBottom: scaleSize(10)}}
        listIcon={require('../../images/xhdpi/lab_ico_selectasset_collection_def.png')}
        listIconStyle={{width: scaleSize(20),height:scaleSize(20)}}
        onPressListItem={this.toTradingRecordDetail}
      />
    )
  }
  ListHeaderComponent = () => {
    const { etzBalance, etz2rmb } = this.props
      return(
        <View style={[styles.listViewStyle,pubS.center]}>
          <Text style={pubS.font72_1}>{splitNumber(etzBalance)}</Text>
          <Text style={pubS.font26_3}>{`≈ ¥ 0`}</Text>
        </View>
      ) 
  }
  payBtn = () => {
    this.props.navigator.push({
      screen: 'on_payment',
      title:'Payment',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  collectBtn = () => {
    this.props.navigator.push({
      screen: 'on_collection',
      title:'Receive',
      navigatorStyle: DetailNavigatorStyle,
    })
  }
  render(){
    return(
      <View style={[pubS.container,{backgroundColor:'#F5F7FB'}]}>
        <FlatList
          data={DATA}
          renderItem={this.renderItem}
          keyExtractor = {(item, index) => index}
          ListHeaderComponent={this.ListHeaderComponent}
        />
        <View style={[styles.bottomBtnStyle,pubS.rowCenter]}>
          <TouchableOpacity activeOpacity={.7} onPress={this.payBtn} style={[styles.btnStyle,{backgroundColor:'#FFAA3B'},pubS.center]}>
            <Text style={pubS.font30_3}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.7} onPress={this.collectBtn} style={[styles.btnStyle,{backgroundColor:'#FF9844'},pubS.center]}>
            <Text style={pubS.font30_3}>Receive</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnStyle:{
    width: '50%',
    height: scaleSize(96),
  },
  bottomBtnStyle:{
    width: scaleSize(750),
    height: scaleSize(96),
    position:'absolute',
    bottom: 0,
  },
  listViewStyle:{
    height: scaleSize(280),
    backgroundColor: '#144396',
  },
})
export default AssetDetailList
