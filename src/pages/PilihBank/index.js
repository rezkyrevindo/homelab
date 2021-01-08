import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableOpacity, Text, TouchableHighlight
  } from 'react-native';
import {ImgWithdraw, IconPoints, IconCaretLeft, IconWallet} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;
const PilihBank = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => navigation.navigate("AddAccountBank")}>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    width: windowWidth * 0.8,
                    borderColor:'#DAD0D0',
                    borderBottomWidth:1,
                    paddingVertical:20
                }}>
                    <IconWallet />
                    <View style={{flex:1, marginLeft:20}}>
                        <PlainText
                            fontSize={14}
                            title="Gopay"
                            fontStyle="bold"
                            color={"#000"}     
                        />
                    </View>
                    <IconCaretLeft/>
                </View>
            </TouchableHighlight>
            
        </View>
    )
}

export default PilihBank

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'white' ,
        alignItems:'center',
        padding:20
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#FFF2D7",
    },
    logo : {
        width : "80%", 
        height: windowHeight * 0.20
    },
    body:{
        flex: 1,
        paddingVertical :20
    },
    otherLogin : {
        flexDirection   : 'row',
        width           : windowWidth * 0.30,
        textAlign       : 'center',
        justifyContent  : 'space-between',
        marginLeft      : windowWidth * 0.35,
        marginRight     : windowWidth * 0.35,
        marginTop       : windowHeight * 0.02,
    }, 
})
