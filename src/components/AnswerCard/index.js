import React,  { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconLike, IconLikeActive, IconCheck} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';

const AnswerCard = (props) => {
    
    return (
        <TouchableOpacity 
          onPress={props.onPress}
         style={styles.cardQuestion}>
            <View style={styles.cardQuestionHeader}>
              <View style={{flexDirection : 'row'}}>
                <Image source={DefaultProfile} style={{width : 50, height: 50}} />
                <View 
                style={{flexDirection : 'column', justifyContent:'space-around', marginLeft: 10}}
                >
                  <PlainText
                        title={props.name}
                        color={"#000"}
                        fontStyle={"bold"}
                        fontSize = {13}
                    />
                  <PlainText
                        title={props.time }
                        color={"#000"}
                        fontSize = {11}
                    />
                </View>
              </View>
                {props.isRelevant == true &&
                    <View style={{flexDirection:'row', alignItems : 'center'}}>
                        
                        
                        <IconCheck style={{marginLeft:3}} width={24} height={24} fill={'#fff'}/>
                    </View>
                    
                }
             
            </View>

            <View style={styles.cardQuestionContent}>
              <PlainText
                title={props.question}
                color={"#000"}
                fontSize = {13}
                />
            </View>
            <View style={styles.cardQuestionFooter}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View  style={{flexDirection:'row', justifyContent:'space-between', alignItems :'center'}} >
                    <IconLike width={18} height={18} fill={'#D7443E'}/>
                    <PlainText
                        marginLeft  = {10}
                        title={props.like + " Like"}
                        fontStyle={"bold"}
                        color={"#000"}
                        fontSize = {13}
                    />
                </View>
                
              
               
               
               
              </View>
             
            </View>
           
          </TouchableOpacity>
    )
}

export default AnswerCard

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
