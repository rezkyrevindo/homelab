import React from 'react'
import { StyleSheet, Text, View , TouchableOpacity, Dimensions} from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';
const ButtomPrimary = ({onPress,title, width, marginTop,color, fontSize}) => {
    return (
        <View
             
            style={styles.buttonLogin}
            width={width}
            marginTop = {marginTop}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.textLoginBtn(color,fontSize)}> {title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtomPrimary

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    buttonLogin : {
        backgroundColor : WARNA_UTAMA,
        borderRadius    : 10,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation: 3,    
        paddingHorizontal : 10
        
    }, 
    textLoginBtn : (color, fontSize) => ({
        
        textAlign       : 'center',
        marginTop       : 10,
        marginBottom    : 10,
        fontSize        : fontSize != null ? fontSize : 20,
        color           : color != null ? color : "#fff",
        fontFamily      : OpenSansBold,
    }),
})
