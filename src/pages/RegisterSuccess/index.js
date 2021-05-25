import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity, Text, StatusBar
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { ImgSuccess} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
import FastImage from 'react-native-fast-image'

const RegisterSuccess = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <StatusBar  
                backgroundColor={"#37D272"} 
                barStyle="dark-content" />
            </View>
            <View style={{alignItems:'center'}}>
                <PlainText
                    fontSize= {21}
                    title="Verifikasi Email berhasil"
                    color={"#fff"}
                    fontStyle="bold"
                    marginTop={30}
                />
                <PlainText
                    fontSize= {16}
                    title="Silahkan login kembali!"
                    color={"#fff"}
                    fontStyle="bold"
                    marginTop={10}
                    textAlign={"center"}
                />
                <FastImage 
                    style={styles.logo} 
                    source={ImgSuccess}
                    resizeMode={FastImage.resizeMode.contain}
                ></FastImage>
                 <ButtonPrimary  
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    title="Continue"
                    width={windowWidth*0.6}
                    marginTop   = {windowHeight * 0.033}
                />
            </View>
            
        </View>
    )
}

export default RegisterSuccess

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'#37D272' ,
        alignItems:'center',
        justifyContent:'center',padding:20
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#FFF2D7",
    },
    logo : {
        width : 250, 
        height: 200, marginTop:30
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
