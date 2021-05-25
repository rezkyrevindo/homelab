import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    Image,
    View,TouchableOpacity,
    Dimensions,
    StatusBar,
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LogoHorizontal} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, ButtonDefault, LoadingIndicator} from '../../components'
import axios from 'axios'

import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Verification = ({route, navigation}) => {
    const {token} = route.params;
    const [isLoading, setLoading] = useState(false)
    const [code, setCode] = useState('')

    useEffect(() => {
        resend()
    }, [])

    const resend = async () => {
        setLoading(true)

        axios({
            method :'get',
            url :'https://askhomelab.com/api/re_send',
            headers :{
                "Authorization" : "Bearer "+token
            }
        }) .then(function (response) {
              
              
            
            setLoading(false)
        })
        .catch(function (err) {
             setLoading(false)
        });

    }

    const submit = async () =>{
        setLoading(true)
     
        const data = new FormData()
        
        data.append("code", code)
        
        axios.post('https://askhomelab.com/api/verify_email',
         data,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'application/x-www-form-urlencoded',
            "Authorization" : "Bearer "+token
            
          }  
        })
          .then(function (response) {
              console.log(JSON.stringify(response))
            if(response.data.message != "error"){
                
                navigation.replace('RegisterSuccess')
            }else{
                Snackbar.show({
                    text:"Tidak cocok",
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'Ok',
                        textColor: WARNA_UTAMA,
                        onPress: () => { /* Do something. */ },
                    },  
                    });
            }

            setLoading(false)
          })
          .catch(function (error) {
               console.error(error)
              setLoading(false)
          });
    }

    return (
        <View style = {styles.container}>
            <View>
                <StatusBar translucent 
                backgroundColor={"#FFF"} 
                barStyle="dark-content" />
            </View>
            {isLoading &&
                <LoadingIndicator></LoadingIndicator>
            }
            {!isLoading &&
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <FastImage 
                            style={{width:200, height:100}} 
                            source={LogoHorizontal}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
                    
                </View>
                <View style={styles.body}>
                    <HeaderText
                        marginTop = {windowHeight * 0.054}
                        title={"Verification Code"}
                        textAlign={"center"}
                    
                    />
                    <View style={{alignItems:'center'}}>
                        <PlainText
                            title={"Please check your email immediately"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.033}
                            fontSize= {13}
                        />
                         <PlainText
                            title={"Enter the verication code below"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.02}
                            fontSize= {13}
                        />
                    </View>

                    <View style={{alignItems:'center'}}>
                        <View style={{flexDirection:'row', width:windowWidth*0.6, justifyContent:'center'}}>
                            
                            <InputText 
                                autoFocus = {true}
                                width       = {windowWidth * 0.6}
                                placeholder = "" 
                                secureTextEntry = {false}
                                error= "first"
                                onChangeText = {(text) => setCode(text)}
                                value={code}
                                keyboardType = "number-pad"
                                textAlign="center"
                                />
                            
                        </View>
                    </View>
                
                    
                
                    <View style={{alignItems:'center'}}>
                        <ButtonPrimary 
                            onPress={() => {
                                submit();
                            }} 
                            title="Next"
                            width={windowWidth*0.6}
                            marginTop   = {windowHeight * 0.04}
                        />
                    </View>

                   
                  

                    <View style={{alignItems:'center'}}>
                        <PlainText
                            title={"Didnt receive the email?"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.033}
                            fontSize= {13}
                        />
                        <TouchableOpacity>
                            <PlainText
                                title={"Resend Confirmation"}
                                color={WARNA_UTAMA}
                                marginTop = {windowHeight * 0.01}
                                fontSize= {13}
                            />
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>

            </ScrollView>
            }
            
            
        </View>
    )
}

export default Verification

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white' 
    },
    header: {
        width: windowWidth,
        height: windowHeight * 0.11,
        paddingTop : 40,
        alignItems : 'center',
    },
    logo : {
        width : windowWidth * 0.14,
        height : windowHeight * 0.06,
    },
    body:{
        flex:1,
    },
    otherLogin : {
        flexDirection   : 'row',
        width           : windowWidth * 0.30,
        textAlign       : 'center',
        justifyContent  : 'space-between',
        marginLeft      : windowWidth * 0.35,
        marginRight     : windowWidth * 0.35,
        marginTop       : windowHeight * 0.02,
    }
})
