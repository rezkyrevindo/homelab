import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { IconLoading} from '../../assets';
const LoadingIndicator = () => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center",}}>
        <FastImage 
            style={styles.icon} 
            source={IconLoading}
            resizeMode={FastImage.resizeMode.contain}
        ></FastImage>
    </View>
    )
}

export default LoadingIndicator

const styles = StyleSheet.create({
    icon :{
        width:38,
        height:38
    }
})
