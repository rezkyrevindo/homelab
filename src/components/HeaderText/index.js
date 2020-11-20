import React from 'react'
import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import {WARNA_UTAMA, WARNA_DISABLE, OpenSans, OpenSansBold} from '../../utils/constant';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderText = ({title, marginTop, textAlign, marginLeft, fontSize}) => {
    return (
        <View marginTop={marginTop}
        marginLeft={marginLeft}
        alignItems={textAlign}>
            <Text         
            style={styles.textLogin(fontSize)}
             >
            {title}
        </Text>
        </View>
        
    )
}

export default HeaderText

const styles = StyleSheet.create({
    textLogin: (fontSize) =>({
        fontSize : fontSize != null ? fontSize : 29,
        fontFamily: OpenSansBold,
        
    }),
})
