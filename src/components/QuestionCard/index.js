import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconPoints} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
const QuestionCard = (props) => {
    return (
        <TouchableOpacity style={styles.cardQuestion}>
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
                      title={props.time + ' - ' + props.category}
                      color={"#000"}
                      fontSize = {11}
                  />
                </View>
              </View>
              
              <View style={{alignItems:'center', flexDirection:'row'}}>
                <PlainText
                      title={props.point}
                      color={WARNA_UTAMA}
                      fontSize = {16}
                      fontStyle= {"bold"}
                  />
                <IconPoints style={{marginLeft: 5}}/>
              </View>
             
            </View>

            <View style={styles.cardQuestionContent}>
              <PlainText
                title={props.question}
                color={"#000"}
                fontSize = {13}
                />
            </View>
            <View style={styles.cardQuestionFooter}>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <PlainText
                  title={props.answer + " Answer"}
                  fontStyle={"bold"}
                  color={"#000"}
                  fontSize = {13}
                  />
                {props.isSolved == true &&
                    <TouchableOpacity style={styles.buttonSeeAll}>
                        <PlainText
                            title={"Solved"}
                            color={'#000'}
                            fontSize = {11}
                        />
                    </TouchableOpacity>
                }
               
              </View>
             
            </View>
           
          </TouchableOpacity>
    )
}

export default QuestionCard

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
    elevation       : 3,   
  },
  cardQuestionHeader :{
    flexDirection:'row', 
    paddingHorizontal:20,
    paddingVertical : 10, 
    justifyContent : 'space-between' , 
    backgroundColor : '#FFD31D25', 
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
    backgroundColor : WARNA_UTAMA,
    paddingVertical : 3,
    borderRadius    : 10,
    justifyContent  : 'center',
    paddingHorizontal : 15,
},
})
