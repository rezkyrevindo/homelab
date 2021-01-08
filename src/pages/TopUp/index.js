import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableHighlight
  } from 'react-native';
import {ImgLogin, IconPoints, IconRiwayat} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const TopUp = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                    <PlainText
                        fontSize={28}
                        title="Beli Poin"
                        fontStyle={"bold"}
                        color={"#000"}     
                    />
                    <PlainText
                        fontSize={13}
                        title="Pilih jumlah poin dan lanjutkan"
                        color={"#000"}     
                        marginTop={10}
                    />
                    <View style={{
                        backgroundColor:'#fff',
                        flexDirection:'row',
                        padding:10,
                        borderRadius:20,
                        justifyContent:'space-around',
                        width: windowWidth *0.7,
                        alignItems:'center',
                        marginTop:20

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
            <View style={styles.body}>
                <TouchableHighlight onPress={()=> navigation.navigate("PembayaranTopUp")}>
                    <View style={{
                        
                        width:windowWidth * 0.4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        borderRadius:20,
                        margin:10
                    }}>
                        <View style={{
                            backgroundColor:"#FFF9C4",
                            alignItems:'center',
                            padding:10,
                            borderTopEndRadius:20,
                            borderTopStartRadius:20
                        }}>
                            <IconPoints width={100} height={100}/>
                            <PlainText
                                fontSize={24}
                                title="30 pt"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                        <View  style={{
                            backgroundColor:"#fff",
                            alignItems:'center',
                            padding:10,
                            borderBottomStartRadius:20,
                            borderBottomEndRadius:20
                        }}>
                            <PlainText
                                fontSize={11}
                                title="Rp 15.000"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            />
                            <PlainText
                                fontSize={18}
                                title="Rp 10.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={{
                        
                        width:windowWidth * 0.4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        borderRadius:20,
                        margin:10
                    }}>
                        <View style={{
                            backgroundColor:"#FFF9C4",
                            alignItems:'center',
                            padding:10,
                            borderTopEndRadius:20,
                            borderTopStartRadius:20
                        }}>
                            <IconPoints width={100} height={100}/>
                            <PlainText
                                fontSize={24}
                                title="60 pt"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                        <View  style={{
                            backgroundColor:"#fff",
                            alignItems:'center',
                            padding:10,
                            borderBottomStartRadius:20,
                            borderBottomEndRadius:20
                        }}>
                            <PlainText
                                fontSize={11}
                                title="Rp 30.000"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            />
                            <PlainText
                                fontSize={18}
                                title="Rp 20.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={{
                        
                        width:windowWidth * 0.4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        borderRadius:20,
                        margin:10
                    }}>
                        <View style={{
                            backgroundColor:"#FFF9C4",
                            alignItems:'center',
                            padding:10,
                            borderTopEndRadius:20,
                            borderTopStartRadius:20
                        }}>
                            <IconPoints width={100} height={100}/>
                            <PlainText
                                fontSize={24}
                                title="100 pt"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                        <View  style={{
                            backgroundColor:"#fff",
                            alignItems:'center',
                            padding:10,
                            borderBottomStartRadius:20,
                            borderBottomEndRadius:20
                        }}>
                            <PlainText
                                fontSize={11}
                                title="Rp 46.500"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            />
                            <PlainText
                                fontSize={18}
                                title="Rp 31.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View style={{
                        
                        width:windowWidth * 0.4,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        borderRadius:20,
                        margin:10
                    }}>
                        <View style={{
                            backgroundColor:"#FFF9C4",
                            alignItems:'center',
                            padding:10,
                            borderTopEndRadius:20,
                            borderTopStartRadius:20
                        }}>
                            <IconPoints width={100} height={100}/>
                            <PlainText
                                fontSize={24}
                                title="150 pt"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                        <View  style={{
                            backgroundColor:"#fff",
                            alignItems:'center',
                            padding:10,
                            borderBottomStartRadius:20,
                            borderBottomEndRadius:20
                        }}>
                            <PlainText
                                fontSize={11}
                                title="Rp 67.500"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            />
                            <PlainText
                                fontSize={18}
                                title="Rp 45.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                
            </View>
        </View>
    )
}

export default TopUp

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent:'space-around',
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
