import React,  { useState, useEffect } from 'react'
import { StyleSheet, Text,Linking, View, TouchableOpacity, Dimensions } from 'react-native'
import PlainText from '../PlainText'
import { DefaultProfile, IconLike, IconLikeActive, IconCheck, IconLock, IconCaretLeft} from '../../assets';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, BASE_URL_API,BASE_URL_IMG} from '../../utils/constant';
import FastImage from 'react-native-fast-image'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
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

const AnswerCard = (props) => {
  const [modalGambar, setModalGambar] = useState(false)
  const { token,data } = useSelector (state => state.authReducers);
  const [like, setLike] = useState(props.like)
  const [isLike, setIsLike] = useState(props.is_like)
  const [indexSelectedImg, setIndexSelectedImg] = useState(0)

  const [answerImages, setAnswerImages] = useState([])
  const [answerFile, setAnswerFile] = useState([])
  
  useEffect(() => {
    if(props.img != null){
      
      if(props.img.length > 0){
        props.img.map((sweetItem, index) => {
          if(props.typeFile[index] == "image"){
            let joined = answerImages.concat(BASE_URL_IMG + sweetItem);
            setAnswerImages(joined)
          }else{
            let joined = answerFile.concat(BASE_URL_IMG + sweetItem);
            setAnswerFile(joined)
          }
        })
      }
      
    }
  }, [])

  const addLike = () =>{
    var form_data = new FormData()
    form_data.append('id_answer', props.id_answer)

    axios.post ('https://askhomelab.com/api/like_answer',
    form_data,
    {
        headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : "Bearer "+token
            }  
    }).then(function(response) {
        // console.log(response.data)
     
        setLike(like+1)
        setIsLike("True")
    }).catch(function(error){
        // console.error(error)
    })
  }
  const renderFile = () => {
        
    return answerFile.map((item, index) => {
      
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
                                title={"x"}
                                color={"#000"}
                                fontSize= {20}
                                marginTop={20}
                                marginLeft={20}
                                fontStyle={"bold"}
                                
                            />
            </TouchableOpacity>
                <View style={{ width:windowWidth, height:windowHeight, alignItems:'center'}}>
                {props.img != null &&
                <FastImage 
                        source={{
                            uri: answerImages[indexSelectedImg],
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

  const date = hitungSelisihHari(props.time)
  // console.log(date)
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
                  { props.is_me == 'True' &&
                  <PlainText
                          title={"You"}
                          color={"#000"}
                          fontStyle={"bold"}
                          fontSize = {13}
                      />
                  }
                  { props.is_me == 'False' &&
                  <PlainText
                          title={props.name}
                          color={"#000"}
                          fontStyle={"bold"}
                          fontSize = {13}
                      />
                  }
                  
                  <PlainText
                        title={date }
                        color={"#000"}
                        fontSize = {11}
                    />
                </View>
              
              </View>
                {props.isRelevant == true &&
                    <View style={{flexDirection:'row', alignItems : 'center'}}>
                        
                        
                        <IconCheck  width={24} height={24} fill={'#fff'}/>
                    </View>
                    
                }
                {props.is_me == "True" && props.is_solved == "0" &&
                  <TouchableOpacity onPress={props.onEditAnswer} style={{flexDirection:'row', alignItems : 'center'}}>
                      <IconCaretLeft  width={24} height={24} />
                  </TouchableOpacity>
                }
                
               
             
            </View>
                { props.is_lock && 
                  <TouchableOpacity    style={styles.cardQuestionContent}>
                    
                    <PlainText
                      title={"Jawaban ini terkunci"}
                      color={"#000"}
                      fontSize = {13}
                      />
                  </TouchableOpacity>
                
                }

                { props.is_lock && 
                  <TouchableOpacity    
                  style={{backgroundColor : '#F5F5F5',
                  padding:20, 
                  borderBottomStartRadius:20,
                  borderBottomEndRadius:20 , alignItems:'center'}}
                  onPress={props.onPress}>
                    <FastImage source= {IconLock} style={{width:25, height:25}}/>

                    <PlainText
                        title={" Buka jawaban untuk melihat seluruh jawaban maupun gambar "}
                        color={"#000"}
                        fontSize = {13}
                        marginTop={10}
                        textAlign= "center"
                        />
                      
                    
                    
                  </TouchableOpacity>
                
                }
                {props.img != null && !props.is_lock &&
                    
                       
                          <SliderBox
                            images={answerImages}
                            onCurrentImagePressed={index => {
                                setIndexSelectedImg(index)
                                setModalGambar(true)
                                
                            } }
                      
                        />

                    }

                { !props.is_lock &&
                  <TouchableOpacity   onPress={props.onPress} style={styles.cardQuestionContent}>
                  <PlainText
                            title={props.question}
                            
                            fontSize = {13}
                            color={"#000000"}
                    />
                  </TouchableOpacity>
                  
                  
                }
                { props.type_reference == "url" && !props.is_lock &&
                <TouchableOpacity style={styles.cardQuestionRef}
                    onPress={props.onPress}
                    
                  > 
                      <PlainText
                        title={"Referensi"}
                        color={"#000"}
                        fontSize = {13}
                        fontStyle="bold"
                        />
                    <TouchableOpacity   style={{backgroundColor:WARNA_UTAMA, borderRadius:20, marginTop:10, padding:10, alignItems:'center'}}
                       onPress=  {() => {
                      Linking.canOpenURL(props.reference).then(supported => {
                        if (supported) {
                          Linking.openURL(props.reference);
                        } else {
                          console.log("Don't know how to open URI: " + props.reference);
                        }
                      });
                    
                  }
                       }>
                          <PlainText
                            title={"Klik Disini"}
                            color={"#000"}
                            fontSize = {13}
                            
                            />
                        </TouchableOpacity>
                        
                </TouchableOpacity>
                       
                    
                  } 
                  { props.type_reference != "url" && !props.is_lock &&
                  <View style={styles.cardQuestionRef}> 
                      <PlainText
                        title={"Referensi"}
                        color={"#000"}
                        fontSize = {13}
                        fontStyle="bold"
                        />
                    <TouchableOpacity    >
                          <PlainText
                            title={props.reference}
                            color={"#000"}
                            fontSize = {13}
                            marginTop={10}
                            />
                        </TouchableOpacity>
                </View>
                  } 
                  { answerFile.length > 0 &&
                    <View style={{flexDirection:'column', marginTop:-20, padding:20}}>
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
                  
                { !props.is_lock &&
                  <View style={styles.cardQuestionFooter}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                      {isLike == "True" &&
                        <TouchableOpacity  
                        style={{flexDirection:'row', justifyContent:'space-between', alignItems :'center'}} >
                            <IconLikeActive width={18} height={18} fill={'#D7443E'}/>
                            <PlainText
                                marginLeft  = {10}
                                title={like + " Like"}
                                fontStyle={"bold"}
                                color={"#000"}
                                fontSize = {13}
                            />
                          
                        </TouchableOpacity>
                      }
                      {isLike == "False" &&
                        <TouchableOpacity  
                        onPress= {()=> addLike()}
                        style={{flexDirection:'row', justifyContent:'space-between', alignItems :'center'}} >
                            <IconLike width={18} height={18} fill={'#D7443E'}/>
                            <PlainText
                                marginLeft  = {10}
                                title={like + " Like"}
                                fontStyle={"bold"}
                                color={"#000"}
                                fontSize = {13}
                            />
                          
                        </TouchableOpacity>
                      }
                      
                      <TouchableOpacity onPress={props.onPress}>
                      <PlainText
                            title={props.commentar + " comment"}
                            fontStyle={"bold"}
                            color={"#000"}
                            fontSize = {13}
                            />
                      </TouchableOpacity>
                    
                    
                    </View>
                    
                
                </View>
              }
          </View>
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
    padding:20,
  },
  cardQuestionRef : {
    padding:20,
    borderTopColor:WARNA_ABU_ABU,
    borderTopWidth:1,
  },
  cardQuestionFooter : {
    padding:20,
    paddingTop : 20,
    borderTopColor:WARNA_ABU_ABU,
    borderTopWidth:1,
    
    
  },
  buttonSeeAll :{
        backgroundColor : WARNA_SUCCESS,
        paddingVertical : 3,
        borderRadius    : 10,
        justifyContent  : 'center',
        paddingHorizontal : 15,
    },
})
