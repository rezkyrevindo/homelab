import React,  { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconLike, IconLikeActive, IconCheck} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';
import FastImage from 'react-native-fast-image'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;
function hitungSelisihHari(tgl1){
  var miliday = 60 * 60 * 1000;

  var tanggal1 = new Date(tgl1);
  var tanggal2 = new Date();

  var tglPertama = Date.parse(tanggal1);
  var tglKedua = Date.parse(tanggal2);

  var selisih = (tglKedua - tglPertama) / miliday;
  if (selisih >= 24){
    selisih = selisih/24
    return Math.floor(selisih) + " days ago"
  }else if (selisih < 24 && selisih > 1){
    return Math.floor(selisih) + " hours ago"
  }else{
    selisih = selisih * 60
    return Math.floor(selisih) + " minutes ago"
  }
}
const CommentCard = (props) => {
  const date = hitungSelisihHari(props.time)
  console.log(date)
    return (
      <View>
      { props.is_me == 'False' &&
      <View >
        <View style={{flexDirection:'row',margin:10}}>
            <FastImage source={DefaultProfile} style={{width : 50, height: 50}} />
            <View style={{
                flexDirection:'column',
                marginHorizontal:10
            }}>
                <View style={{
                    flexDirection : 'row',marginBottom:10
                }}>
                        <PlainText
                        title={props.name}
                        color={"#979797"}
                        fontStyle={"bold"}
                        fontSize = {11}
                    />
                    <PlainText
                        title={date}
                        color={"#979797"}
                        fontStyle={"bold"}
                        fontSize = {11}
                        marginLeft = {10}
                    />
                </View>
                <View style={{
                    backgroundColor:'#ffff',
                    paddingVertical:15,
                    paddingHorizontal:10,
                    maxWidth: windowWidth*0.7,
                    borderTopEndRadius:20,
                    borderBottomEndRadius:20,
                    borderBottomStartRadius:20}}>
                    <PlainText
                        title={props.comment}
                        color={"#424242"}
                        fontStyle={"bold"}
                        fontSize = {11}
                        marginLeft = {10}
                    /> 
                </View>
            </View>
        </View>
        
    </View>
      } 
      { props.is_me == 'True' &&
      <View >
        <View style={{flexDirection:'row-reverse',margin:10}}>
            <FastImage source={DefaultProfile} style={{width : 50, height: 50}} />
            <View style={{
                flexDirection:'column',
                marginHorizontal:10
            }}>
                <View style={{
                    flexDirection : 'row',marginBottom:10
                }}>
                        <PlainText
                        title={props.name}
                        color={"#979797"}
                        fontStyle={"bold"}
                        fontSize = {11}
                    />
                    <PlainText
                        title={date}
                        color={"#979797"}
                        fontStyle={"bold"}
                        fontSize = {11}
                        marginLeft = {10}
                    />
                </View>
                <View style={{
                    backgroundColor:'#ffff',
                    paddingVertical:15,
                    paddingHorizontal:10,
                    maxWidth: windowWidth*0.7,
                    borderTopStartRadius:20,
                    borderBottomEndRadius:20,
                    borderBottomStartRadius:20}}>
                    <PlainText
                        title={props.comment}
                        color={"#424242"}
                        fontStyle={"bold"}
                        fontSize = {11}
                        marginLeft = {10}
                    /> 
                </View>
            </View>
        </View>
        
    </View>
      } 
      </View>
        
    )
}

export default CommentCard

const styles = StyleSheet.create({
    //------------------------
  cardQuestion : {
    backgroundColor : '#fff',
    marginTop       : 20,
    borderRadius    : 20,
    shadowColor     : "#000",
    shadowOffset    : {
        width: 0,
        height: 1,
    },
    shadowOpacity   : 0.22,
    shadowRadius    : 2.22,
    elevation       : 1,   
  },
  cardQuestionHeader :{
    flexDirection:'row', 
    paddingHorizontal:20,
    paddingVertical : 10, 
    justifyContent : 'space-between' , 
    alignItems : 'center',
    backgroundColor : '#F5F5F5', 
    borderTopEndRadius : 20, 
    borderTopStartRadius : 20 
  },
  cardQuestionContent : {
    padding:20
    
  },
  cardQuestionFooter : {
    padding:20,
    paddingTop : 0,
  },
  buttonSeeAll :{
        backgroundColor : WARNA_SUCCESS,
        paddingVertical : 3,
        borderRadius    : 10,
        justifyContent  : 'center',
        paddingHorizontal : 15,
    },
})
