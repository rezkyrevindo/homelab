import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableHighlight, Text
  } from 'react-native';
import {ImgPayment, IconWallet, IconCaretDown, IconCaretLeft, IconCaretUp} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;


const PembayaranTopUp = ({navigation}) => {
    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <FastImage 
                    style={styles.logo} 
                    source={ImgPayment}
                    resizeMode={FastImage.resizeMode.contain}
                ></FastImage>
            </View>
            <View style={styles.body}>
                <View style={{
                    alignItems:'center',
                    width: windowWidth * 0.9,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                    borderRadius:20,
                    
                }}>
                    <View style={{
                        backgroundColor : "#FFF9C4",
                        width: windowWidth * 0.9,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        padding:10,
                        paddingHorizontal:20,
                        alignItems:'center',
                        borderTopEndRadius:20,
                        borderTopStartRadius:20
                    }}> 
                        <IconWallet />
                        <View style={{flex:1, marginLeft:20}}>
                        <PlainText
                            fontSize={18}
                            title="E-Wallet"
                            fontStyle="bold"
                            color={"#000"}     
                        />
                        </View>
                         
                        <IconCaretDown fill={"#000"} width={12} height={12}  />
                    </View>
                    <View style={{
                        backgroundColor : "#fff",
                        width: windowWidth * 0.9,
                        padding:10,
                        paddingHorizontal:20,
                        alignItems:'center',
                        borderBottomEndRadius:20,
                        borderBottomStartRadius:20
                    }}> 
                        <TouchableHighlight onPress={() => navigation.navigate("KonfirmasiTopUp")}>
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
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                            width: windowWidth * 0.8,
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
                        
                         
                    </View>
                    
                </View>
                
            </View>
        </View>
    )
}

export default PembayaranTopUp

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
        paddingVertical :20,
        alignItems:'center'
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
