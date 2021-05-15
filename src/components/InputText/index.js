import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans,WARNA_WARNING,OpenSansBold} from '../../utils/constant';

import {IconSearch} from '../../assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import PlainText from '../PlainText'

const InputText = ({autoFocus,onSubmitEditing,keyboardType,placeholder, secureTextEntry, width,borderRadius, textAlign, marginTop, paddingRight, onChangeText, value,onBlur, height, error}) => {
    return (
        <View>
            {error == null || error == "first" &&
                <TextInput 
                width           = {width}
                secureTextEntry = {secureTextEntry}
                placeholder = {placeholder} 
                
                style={styles.textInput_Style(borderRadius,marginTop, paddingRight, height, error)}
                underlineColorAndroid='transparent'
                paddingHorizontal={20}
                textAlign= {textAlign}
                fontFamily={OpenSans}
                onChangeText={onChangeText}
                value={value}
                onBlur={onBlur}
                keyboardType = {keyboardType}
                onSubmitEditing = {onSubmitEditing}
                autoFocus = {autoFocus}
                />
            }

            {error != null && error != "first"  &&
                <View>
                    <TextInput 
                        width           = {width}
                        secureTextEntry = {secureTextEntry}
                        placeholder = {placeholder} 
                        style={styles.textInput_Style(borderRadius,marginTop, paddingRight, height, error)}
                        underlineColorAndroid='transparent'
                        paddingHorizontal={20}
                        textAlign= {textAlign}
                        fontFamily={OpenSans}
                        onChangeText={onChangeText}
                        value={value}
                        onBlur={onBlur}
                        keyboardType = {keyboardType}
                onSubmitEditing = {onSubmitEditing}
                    />
                        <PlainText
                            title={error}
                            color={WARNA_WARNING}
                            textAlign={"center"}
                            fontSize = {11}
                            width           = {width}
                            marginTop = {5}
                        />
                    </View>
            }
            
        </View>
        
    )
}

export default InputText

const styles = StyleSheet.create({
    textInput_Style: (borderRadius,marginTop, paddingRight, height, error) =>({
        paddingRight    : paddingRight != null ? paddingRight :20,
        borderRadius    : borderRadius != null ? borderRadius : 30,
        height          : height != null ? height : windowHeight * 0.07 ,
        marginTop       : marginTop != null ? marginTop : windowHeight * 0.04,
        borderColor     : error != null &&  error != "first" ? WARNA_WARNING: WARNA_DISABLE,
        borderWidth     : 1,
        backgroundColor : '#fff',
        
    }),
    
    
})
