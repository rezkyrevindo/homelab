import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconPoints, IconLike,IconLikeActive,IconPending, IconCheck} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, BASE_URL_API, BASE_URL_IMG, OpenSans} from '../../utils/constant';
import FastImage from 'react-native-fast-image'
import Tooltip from 'react-native-walkthrough-tooltip';
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
const QuestionCard = (props) => {
    const date = hitungSelisihHari(props.time)
    
    const [toolTipVisibleHitam, setTooltipVisibleHitam] = useState(false)
    return (
        <View 
         style={styles.cardQuestion}>
            <View style={styles.cardQuestionHeader}>
              <View style={{flexDirection : 'row'}}>
                {props.picture != null &&
                    <FastImage source={{uri: BASE_URL_IMG+props.picture}} style={{width : 60, height: 60, borderRadius:100}}  />
                }
                {props.picture == null &&
                    <FastImage source={DefaultProfile} style={{width : 60, height: 60}}  />
                }
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
                      title={date}
                      color={"#000"}
                      fontSize = {11}
                  />
                </View>
              </View>
              
              <View style={{alignItems:'center', flexDirection:'row'}}>
                <PlainText
                      title={"+"+props.point}
                      color={WARNA_UTAMA}
                      fontSize = {16}
                      fontStyle= {"bold"}
                  />
                <IconPoints style={{marginLeft: 5}}/>
                {props.isSolved == "2" &&
                    <Tooltip
                        isVisible={toolTipVisibleHitam}
                        content={
                            <PlainText
                                title={"Pertanyaan dan jawaban telah terverifikasi"}
                                color={"#000"}
                                fontSize= {13}
                            />
                        }
                        placement="bottom"
                        onClose={() => setTooltipVisibleHitam(false)}
                        >
                    
                            <TouchableOpacity  onPress={()=> setTooltipVisibleHitam(true)}>
                                
                            <IconCheck style={{marginLeft:10}} width={24} height={24} fill={'#fff'}/>
                            </TouchableOpacity>
                            
                        </Tooltip>
                  
                }
                {props.isSolved == "1" &&
                      <Tooltip
                        isVisible={toolTipVisibleHitam}
                        content={
                            <PlainText
                                title={"Pertanyaan dan jawaban sedang direview Admin."}
                                color={"#000"}
                                fontSize= {13}
                            />
                        }
                        placement="bottom"
                        onClose={() => setTooltipVisibleHitam(false)}
                        >
                    
                            <TouchableOpacity  onPress={()=> setTooltipVisibleHitam(true)}>
                                
                                <IconPending style={{marginLeft:10}} width={24} height={24} fill={'#888'}/>
                            </TouchableOpacity>
                            
                        </Tooltip>
                }
              </View>
                
             
            </View>

            <TouchableOpacity
            
            onPress={props.onPress}
            style={styles.cardQuestionContent}>
              <PlainText
                      title={props.question}
                      
                      fontSize = {13}
                      color={"#000000"}
              />
              
            </TouchableOpacity>
            <TouchableOpacity 
            
            onPress={props.onPress}
            style={styles.cardQuestionFooter}>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems :'center'}}>
                <View  style={{flexDirection:'row', justifyContent:'space-between', alignItems :'center'}} >
                     
                      <PlainText
                          title={"#"+props.category}
                          fontStyle={"bold"}
                          color={"#FF9F31"}
                          fontSize = {11}
                      />
                </View>

              

                <PlainText
                  title={props.answer + " Answer"}
                  fontStyle={"bold"}
                  color={"#000"}
                  fontSize = {13}
                  />
                
               
              </View>
             
            </TouchableOpacity>
           
          </View>
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
    elevation       : 1,   
    marginBottom : 5
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
    backgroundColor : WARNA_SUCCESS,
    borderRadius    : 40,
    justifyContent  : 'center',
},
})
