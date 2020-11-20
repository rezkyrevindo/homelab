import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import {Logo } from '../../assets'

const Splash = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout( () => {
            navigation.replace('Login');
        }, 3000)
    }, [navigation]);

    return (
       <ImageBackground style={styles.background}>
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
