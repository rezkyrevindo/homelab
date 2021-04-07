import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { login, refresh } from '../../redux/actions';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import Snackbar from 'react-native-snackbar';
const VerifikatorLogin = ({navigation}) => {
    const { token,data } = useSelector (state => state.authReducers)
    useEffect(() => {
        
        if(token == "false"){
            
        }else{
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
            }else{
                navigation.replace('Interest')
            }
            
        }
    }, [])
    
    return (
        <View style={{flex:1}}>
            <LoadingIndicator/>
        </View>
    )
}

export default VerifikatorLogin

const styles = StyleSheet.create({})
