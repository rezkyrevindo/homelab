import React, {useState, useEffect, FlatList} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView,Linking, Dimensions } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconPoints, IconLike,IconLikeActive,IconPending, IconCheck} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, BASE_URL_API, BASE_URL_IMG, OpenSans} from '../../utils/constant';
import FastImage from 'react-native-fast-image'
import Tooltip from 'react-native-walkthrough-tooltip';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -56
import { SliderBox } from "react-native-image-slider-box";

import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
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
    const [modalGambar, setModalGambar] = useState(false)
    const [toolTipVisibleHitam, setTooltipVisibleHitam] = useState(false)
    const [indexSelectedImg, setIndexSelectedImg] = useState(0)

    const [questionImages, setQuestionImages] = useState([])
    const [questionFile, setQuestionFile] = useState([])
    
    useEffect(() => {
      if(props.img != null){
        if(props.img.length > 0 ){
          
            props.img.map((sweetItem, index) => {
                  if(props.typeFile[index] == "image"){
                    let joined = questionImages.concat(BASE_URL_IMG + sweetItem);
                    setQuestionImages(joined)
                  }else{
                    let joined = questionFile.concat(BASE_URL_IMG + sweetItem);
                    setQuestionFile(joined)
                  }
            })
           
        }
      }

      
      
    }, [])
    const renderFile = () => {
        
        return questionFile.map((item, index) => {
          
          return (
            <TouchableOpacity style={{backgroundColor: WARNA_UTAMA, padding:5, borderRadius:20, width:200, marginVertical:5, 
            alignItems:'center'}}
            onPress={()=>{
              Linking.canOpenURL(item).then(supported => {
                        if (supported) {
                          Linking.openURL(item);
                        } else {
                          console.log("Don't know how to open URI: " + props.reference);
                        }
                      });
            }}>
              <PlainText
                  title={"Open File - File #"+(index+1)}
                  color={"#000"}
                  fontSize= {14}
                  fontStyle={"bold"}
                  
              />
            </TouchableOpacity>
          )
          
        })
        
    }


    const GambarModal = ()=>{
      return (
          <Modal
              visible={modalGambar}
              onTouchOutside={() => { setModalGambar(false)}}
          >
              <ModalContent >
                  
              <TouchableOpacity style={{ background:'#000000'}}
                  onPress={()=>setModalGambar(false)}
              >
                    <PlainText
                  title={"X"}
                  color={"#000"}
                  fontSize= {20}
                  marginLeft={20}
                  fontStyle={"bold"}
                  
              />          
              </TouchableOpacity>
                  <View style={{ width:windowWidth, height:windowHeight, alignItems:'center'}}>
                  {props.img != null &&
                  <FastImage 
                          source={{
                              uri: questionImages[indexSelectedImg],
                          }}
                          style={{width : windowWidth, height: windowHeight}} 
                          resizeMode={FastImage.resizeMode.contain}
                          />
                     }
                  </View>
                  
              </ModalContent>
          </Modal>
      )
  }
    return (
        <View 
         style={styles.cardQuestion}>
         <GambarModal/>
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
               
            {questionImages.length > 0 &&
            <SafeAreaView >
                <SliderBox
                
                      images={questionImages}
                      onCurrentImagePressed={index => {
                          setIndexSelectedImg(index)
                          setModalGambar(true)
                          
                        } 
                      }
                      ImageComponentStyle={{ width: windowWidth*0.9, marginLeft: -windowWidth*0.1}}
                
                  /></SafeAreaView>

                    

              }

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
              { questionFile.length > 0 &&
                <View style={{flexDirection:'column', marginTop:10}}>
                  <View   >
                      
                        <PlainText
                            title={"File"}
                            fontStyle={"bold"}
                            fontSize = {13}
                        />
                        {
                          renderFile()
                          
                        }
                  </View>
                    
                 
                </View>
              }
              

              
               
              
             
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
