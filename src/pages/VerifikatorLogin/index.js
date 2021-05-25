import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { login, refresh } from '../../redux/actions';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import Snackbar from 'react-native-snackbar';
import messaging from '@react-native-firebase/messaging';
const VerifikatorLogin = ({navigation}) => {
    const { token,data, notification , verify_user} = useSelector (state => state.authReducers)
    useEffect(() => {
        
        if(token == "false"){
            
        }else if (token != 'false' && verify_user == "true") {
            Snackbar.show({
            text: "Login berhasil",
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
                text: 'Ok',
                textColor: WARNA_UTAMA,
                onPress: () => { /* Do something. */ },
            },  
            });
            if ( data[2].category_id != null){
                navigation.replace('MainApp')
                if(notification == "true"){
                    subcribe(data[2].email)
                }
                
            }else{
                navigation.replace('Interest')
            }
            
        }else if (token != 'false' && verify_user == "false"){
            console.log("Token yg dikirim : "+token)
            navigation.replace("Verification", {"token" : token})
        }
    }, [])
    const subcribe = async (email) =>{
        var asciiKeys = [];
        for (var i = 0; i < email.length; i ++)
        asciiKeys.push(email[i].charCodeAt(0));

        messaging()
        .subscribeToTopic(asciiKeys.join(""))
        .then(() => {
            console.log("berhasil subscribe +"+ asciiKeys)
        });
    }
    
    return (
        <View style={{flex:1}}>
            <LoadingIndicator/>
        </View>
    )
}

export default VerifikatorLogin

const styles = StyleSheet.create({})
