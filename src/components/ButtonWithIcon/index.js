import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';
import {
    IconFacebook,
    IconGoogle
} from '../../assets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ButtonWithIcon = ({title}) => {
    const Icon = () => {
        if (title === 'facebook') return <IconFacebook />;
        if (title === 'google') return <IconGoogle />;
        return <IconFacebook />;
      };
    return (
        <TouchableOpacity style={styles.buttonLoginOther}  >
            <Icon/>
        </TouchableOpacity>
    )
}

export default ButtonWithIcon

const styles = StyleSheet.create({
    buttonLoginOther : {
        padding         : 7,
        backgroundColor : "#fff",
        borderRadius    : 5,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation: 3,    
    }
})
