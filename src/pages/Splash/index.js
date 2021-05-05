import React, { useEffect } from 'react'
import { StyleSheet, StatusBar, View, ImageBackground, Image } from 'react-native'
import {Logo } from '../../assets'
import { useSelector, useDispatch } from 'react-redux';

import messaging from '@react-native-firebase/messaging';
const Splash = ({ navigation }) => {
    const { token,data, notification } = useSelector (state => state.authReducers);

    useEffect(() => {
    
        setTimeout( () => {
            if(token != 'false' && data[2].category_id == null){
                if(notification == "true"){
                    subcribe(data[2].email)
                }
                
                navigation.replace('Interest')
            }else if(token != 'false' && data[2].category_id != null){
                if(notification == "true"){
                    subcribe(data[2].email)
                }
                navigation.replace('MainApp');
            }else{
                navigation.replace('Landing')
            }
            // navigation.replace('Landing')
        }, 3000)
    }, [navigation]);

    const subcribe = async (email) =>{
        var asciiKeys = [];
        for (var i = 0; i < email.length; i ++)
        asciiKeys.push(email[i].charCodeAt(0));

        console.log("ascii key "+asciiKeys.join(""))
        messaging()
        // .subscribeToTopic(asciiKeys.join(""))
        .subscribeToTopic(email.replace(/[^a-zA-Z0-9]/g, ""))
        .then(() => {
            // console.log('Subscribed to topic!')
            // console.log("Topic Name : " + email.replace(/[^a-zA-Z0-9]/g, ""))
        });
    }
    return (
        
            <ImageBackground style={styles.background}>
            <StatusBar  
                backgroundColor={"#FFD31D"} 
                barStyle="dark-content" />
                <Image source={Logo} style={styles.logo} />
            </ImageBackground>
        
    
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : '#FFD31D'
    },
    logo: {
        width: 222,
        height: 125
    }
})
