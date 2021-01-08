import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlainText = ({title, color, marginLeft, marginTop, fontSize, marginBottom, fontStyle, textAlign, strikeTrought}) => {
    return (
        <View>
             <Text
                style={styles.forgotPassword(color,marginLeft, marginTop,fontSize, marginBottom, fontStyle, textAlign, strikeTrought)}
                >
                {title}
            </Text>
        </View>
    )
}

export default PlainText

const styles = StyleSheet.create({
    forgotPassword:(color, marginLeft,marginTop, fontSize, marginBottom, fontStyle, textAlign, strikeTrought) => ({
        marginLeft      : marginLeft,
        marginTop       : marginTop,
        fontFamily      : fontStyle =="bold" ? OpenSansBold : OpenSans,
        textDecorationLine: strikeTrought != null ? "line-through" : 'none',
        color           : color,
        fontSize        : fontSize,
        marginBottom    : marginBottom,
        textAlign       : textAlign != null ? textAlign : null
        
    }),
})
