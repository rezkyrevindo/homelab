import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,ScrollView, TouchableHighlight
  } from 'react-native';
import {ImgLogin, IconPoints, IconRiwayat} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import { useSelector, useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const TopUp = ({navigation}) => {
    const { token,data, snapToken,clientKey, production, acum_price, point  } = useSelector (state => state.authReducers);
    
    useEffect(() => {
        if(snapToken !=''){
            navigation.replace("PembayaranTopUp",  {"_acum_price" : acum_price, "_point": point})
        }
    }, [])

    return (
        <ScrollView style={styles.container}>
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
                        justifyContent:'center',
                        width: windowWidth *0.6,
                        alignItems:'center',
                        marginTop:20

                    }}>
                        <IconPoints width={30} height={30}/>
                        <View style={{
                            alignItems:'center', marginLeft:20,
                        }}>
                            <PlainText
                                fontSize={24}
                                title={data[2].point}
                                color={"#000"}     
                                fontStyle={"bold"}
                            />
                            <PlainText
                                fontSize={12}
                                title="Poin saat ini"
                                color={"#000"}     
                            />
                        </View>
                     
                    </View>
            </View>
            <View style={styles.body}>
                <TouchableHighlight onPress={()=> navigation.replace("PembayaranTopUp", {"_acum_price" : "24000", "_point": "600"})}>
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
                                title="600 pt"
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
                            {/* <PlainText
                                fontSize={11}
                                title="Rp 24.000"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            /> */}
                            <PlainText
                                fontSize={18}
                                title="Rp 24.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=>navigation.replace("PembayaranTopUp", {"_acum_price" : "37500", "_point": "1000"})}
                >
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
                                title="1000 pt"
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
                            {/* <PlainText
                                fontSize={11}
                                title="Rp 30.000"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            /> */}
                            <PlainText
                                fontSize={18}
                                title="Rp 37.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=>navigation.replace("PembayaranTopUp", {"_acum_price" : "66000", "_point": "2000"})}
                >
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
                                title="2000 pt"
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
                            {/* <PlainText
                                fontSize={11}
                                title="Rp 46.500"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            /> */}
                            <PlainText
                                fontSize={18}
                                title="Rp 66.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={()=>navigation.replace("PembayaranTopUp", {"_acum_price" : "123000", "_point": "4000"})}
                >
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
                                title="4000 pt"
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
                            {/* <PlainText
                                fontSize={11}
                                title="Rp 67.500"
                                fontStyle={"bold"}
                                color={"#FF5252"}  
                                strikeTrought={true}
                                 
                            /> */}
                            <PlainText
                                fontSize={18}
                                title="Rp 123.000"
                                fontStyle={"bold"}
                                color={"#000"}     
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                
            </View>
        </ScrollView>
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
