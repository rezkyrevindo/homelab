import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableOpacity
  } from 'react-native';
import {ImgWithdraw, IconPoints, IconRiwayat, IconWallet} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Withdraw = ({navigation}) => {
    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <FastImage 
                    style={styles.logo} 
                    source={ImgWithdraw}
                    resizeMode={FastImage.resizeMode.contain}
                ></FastImage>
             </View>
            
            <View style={styles.body}>
                    <View style={{alignItems:'center'}}>
                        <PlainText
                            fontSize={24}
                            title="Pilih Akun Bank"
                            fontStyle={"bold"}
                            color={"#000"}     
                        />
                        <PlainText
                            fontSize={13}
                            title="atau tambah akun baru"
                            color={"#000"}     
                            marginTop={10}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={{
                            backgroundColor:'#fff',
                            flexDirection:'row',
                            padding:10,
                            borderRadius:20,
                            justifyContent:'space-around',
                            width: windowWidth *0.7,
                            alignItems:'center',
                            marginTop:20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,

                        }}>
                            <IconPoints width={30} height={30}/>
                            <View style={{
                                alignItems:'flex-end'
                            }}>
                                <PlainText
                                    fontSize={24}
                                    title="1.200"
                                    color={"#000"}     
                                    fontStyle={"bold"}
                                />
                                <PlainText
                                    fontSize={12}
                                    title="Poin saat ini"
                                    color={"#000"}     
                                />
                            </View>
                            <View style={{
                                alignItems:'center',
                                
                            }}>
                                <IconRiwayat width={24} height={24}/>
                                <PlainText
                                    fontSize={12}
                                    title="Riwayat"
                                    color={"#FF9F31"}     
                                    marginTop={0}
                                />
                            </View>
                            
                        </View>
                    </View>
                    <View style={{padding:20}}>
                        <PlainText
                            fontSize={14}
                            title="Akun"
                            fontStyle="bold"
                            color={"#000"}     
                            marginTop={10}
                        />
                        <TouchableOpacity style={{flexDirection:'row', marginTop:20, borderColor:'#DAD0D0',
                                borderBottomWidth:1,paddingBottom:10}}
                                onPress={()=>navigation.navigate('WithdrawDetail')}>
                            <IconWallet/>
                            <PlainText
                                    fontSize={14}
                                    title="Antonio Cassano"
                                    color={"#000"}     
                                    marginTop={0}
                                    marginLeft={20}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', marginTop:20, borderColor:'#DAD0D0',
                                borderBottomWidth:1,paddingBottom:10}}>
                            <IconWallet/>
                            <PlainText
                                    fontSize={14}
                                    title="Antonio Cassano"
                                    color={"#000"}     
                                    marginTop={0}
                                    marginLeft={20}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row', marginTop:20, borderColor:'#DAD0D0',
                                borderBottomWidth:1,paddingBottom:10}}>
                            <IconWallet/>
                            <PlainText
                                    fontSize={14}
                                    title="Antonio Cassano"
                                    color={"#000"}     
                                    marginTop={0}
                                    marginLeft={20}
                                />
                        </TouchableOpacity>
                    </View>
                   
            </View>
            <TouchableOpacity style={{backgroundColor:'#FFF9C4', height:50, alignItems:'center', justifyContent:'center'}}
            onPress={()=> navigation.navigate("PilihBank")}>
                        
                <PlainText
                    fontSize={14}
                    title="Tambah Baru"
                    color={"#000"}     
                    fontStyle="bold"
                />
        </TouchableOpacity>
        </View>
    )
}

export default Withdraw

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
