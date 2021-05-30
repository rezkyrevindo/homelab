import React, { useEffect } from 'react'
import { StyleSheet, StatusBar, View, ImageBackground, Image } from 'react-native'
import {Logo } from '../../assets'
import { useSelector, useDispatch } from 'react-redux';


const Splash = ({ navigation }) => {
    const { token,data, notification } = useSelector (state => state.authReducers);

    useEffect(() => {
        
        setTimeout( () => {
            if(token != 'false' && data[2].category_id == null){
                navigation.replace('Interest')
            }else if(token != 'false' && data[2].category_id != null){
                navigation.replace('MainApp');
            }else{
                navigation.replace('Landing')
            }
            // navigation.replace('Landing')
        }, 3000)
    }, [navigation]);


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
