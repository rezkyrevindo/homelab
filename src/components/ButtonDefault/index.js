import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Dimensions} from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';

const ButtonDefault = ({onPress,title,width,marginTop}) => {
    return (
        <View
            
            style={styles.buttonLogin}
            width={width}
            marginTop = {marginTop}>
            <TouchableOpacity
                onPress={onPress} 
            >
                <Text style={styles.textLoginBtn}> {title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonDefault

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    buttonLogin : {
        backgroundColor : WARNA_DISABLE,
        borderRadius    : 10,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation: 3,    
    }, 
    textLoginBtn :{
        textAlign       : 'center',
        marginTop       : 10,
        marginBottom    : 10,
        fontSize        : 14,
        color           : "#757575",
        fontFamily      : OpenSans,
    },
})