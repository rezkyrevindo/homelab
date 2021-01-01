import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';

import {IconSearch} from '../../assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputText = ({placeholder, secureTextEntry, width,borderRadius, textAlign, marginTop, paddingRight, onChangeText, value}) => {
    return (
        <View>
            <TextInput 
                width           = {width}
                secureTextEntry = {secureTextEntry}
                placeholder = {placeholder} 
                style={styles.textInput_Style(borderRadius,marginTop, paddingRight)}
                underlineColorAndroid='transparent'
                paddingHorizontal={20}
                textAlign= {textAlign}
                fontFamily={OpenSans}
                onChangeText={onChangeText}
                value={value}
                />
        </View>
        
    )
}

export default InputText

const styles = StyleSheet.create({
    textInput_Style: (borderRadius,marginTop, paddingRight) =>({
        paddingRight    : paddingRight != null ? paddingRight :20,
        borderRadius    : borderRadius != null ? borderRadius : 30,
        height          : windowHeight * 0.07,
        marginTop       : marginTop != null ? marginTop : windowHeight * 0.04,
        borderColor     : WARNA_DISABLE,
        borderWidth     : 1,
        backgroundColor : '#fff',
        
    }),
    
    
})
