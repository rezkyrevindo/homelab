import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableOpacity, Text
  } from 'react-native';
import {ImgWithdraw, IconPoints, IconRiwayat, IconWallet} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const WithdrawDetail = ({navigation}) => {
    const [amount, setAmount] = useState("")
    return (
        <View style={styles.container}>
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
            <View style={styles.header}>
                <PlainText
                    fontSize={24}
                    title="Enter Amount"
                    fontStyle="bold"
                    color={"#000"}  
                />
                <PlainText
                    fontSize={14}
                    title="Enter your amount and continue"
                    color={"#000"}  
                    marginTop={10}
                />
                <InputText 
                    width       = {windowWidth * 0.8}
                    placeholder = "Jumlah" 
                    secureTextEntry = {false} 
                    onChangeText= {(text) => setAmount(text)}
                    value={amount}
                    />
                <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                    <PlainText
                        fontSize={14}
                        title="Current Point"
                        color={"#000"}
                    />
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <PlainText
                            fontSize={14}
                            title="1.200"
                            color={"#000"}  
                        />
                        <IconPoints width={24} height={24} style={{marginLeft:10}}/>
                    </View>
                </View>
                <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                    <PlainText
                        fontSize={14}
                        title="After Withdraw"
                        color={"#000"}
                    />
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <PlainText
                            fontSize={14}
                            title="0"
                            color={"#000"}  
                        />
                        <IconPoints width={24} height={24} style={{marginLeft:10}}/>
                    </View>
                </View>
            </View>
            <ButtonPrimary  
                onPress={() => {
                    navigation.navigate('WithdrawKonfirmasi');
                }}
                title="Lanjutkan"
                width={windowWidth*0.9}
                marginTop   = {windowHeight * 0.05}
            />  
        </View>
    )
}

export default WithdrawDetail

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'white' ,
        padding:20,
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#ffff",
        marginTop:20,
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
