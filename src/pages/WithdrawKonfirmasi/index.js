import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableHighlight, Text
  } from 'react-native';
import {ImgKonfirmasi, IconWallet, IconCaretDown, IconCaretLeft, IconCaretUp} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const WithdrawKonfirmasi = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <FastImage 
                style={styles.logo} 
                source={ImgKonfirmasi}
                resizeMode={FastImage.resizeMode.contain}
            ></FastImage>
        </View>
        <View style={styles.body}>
            <PlainText
                fontSize={18}
                title="Receiver Detail"
                fontStyle="bold"
                color={"#000"}  
            />
            <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                <IconWallet/>
                <View style={{marginLeft:20}}>
                    <PlainText
                        fontSize={14}
                        title="Sean Roland"
                        fontStyle="bold"
                        color={"#000"}  
                    />
                    <PlainText
                        fontSize={14}
                        title="239138103908183901"
                        color={"#000"}  
                    />
                </View>
                
            </View>
            <PlainText
                fontSize={14}
                title="Keterangan transfer"
                fontStyle="bold"
                color={"#000"}  
                marginTop={40}   
            />
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:20,
                borderColor:'#DAD0D0',
                borderBottomWidth:1,
                paddingBottom:10,
            }}>
                 <PlainText
                    fontSize={12}
                    title="Jumlah penarikan"
                    color={"#000"}      
                />
                <PlainText
                    fontSize={12}
                    title="Rp 50.000"
                    color={"#000"}    
                />
            </View>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:20,
                borderColor:'#DAD0D0',
                borderBottomWidth:1,
                paddingBottom:10,
            }}>
                 <PlainText
                    fontSize={12}
                    title="Biaya Admin"
                    color={"#000"}    
                />
                <PlainText
                    fontSize={12}
                    title="Rp 5.000"
                    color={"#000"}    
                />
            </View>

            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:40,
                borderColor:'#DAD0D0',
                borderBottomWidth:1,
                paddingBottom:10,
            }}>
                 <PlainText
                    fontSize={14}
                    title="Total"
                    fontStyle="bold"
                    color={"#000"}    
                />
                <PlainText
                    fontSize={14}
                    title="Rp 45.000"
                    fontStyle="bold"
                    color={"#448AFF"}    
                />
            </View>
            <ButtonPrimary  
                onPress={() => {
                    navigation.navigate('MainApp');
                }}
                title="Lanjut"
                width={windowWidth*0.9}
                marginTop   = {windowHeight * 0.05}
            />   
        </View>
    </View>
    )
}

export default WithdrawKonfirmasi

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'white' 
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
        padding :20,
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
