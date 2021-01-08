import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableHighlight, Text
  } from 'react-native';
import {ImgAddAccount, IconWallet, IconCaretDown, IconCaretLeft, IconCaretUp} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const AddAccountBank = ({navigation}) => {
    const [norek, setNorek] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <FastImage 
                style={styles.logo} 
                source={ImgAddAccount}
                resizeMode={FastImage.resizeMode.contain}
            ></FastImage>
        </View>
        <View style={styles.body}>
            
            <View style={{alignItems:'center'}}>
                <IconWallet width={50} height={50}/>
                <PlainText
                    fontSize={18}
                    title="Tambah Akun Bank"
                    fontStyle="bold"
                    color={"#000"}  
                    marginTop={40}   
                />
                <PlainText
                    fontSize={12}
                    title="Pastikan nama rekening tujuan sama dengan data akun Homelab"
                    textAlign="center"
                    color={"#000"}    
                />

                <InputText 
                    width       = {windowWidth * 0.8}
                    placeholder = "Nomor rekening" 
                    secureTextEntry = {false} 
                    onChangeText= {(text) => setNorek(text)}
                    value={norek}
                    />
            </View>

          
            <ButtonPrimary  
                onPress={() => {
                    navigation.navigate('Withdraw');
                }}
                title="Tambah"
                width={windowWidth*0.9}
                marginTop   = {windowHeight * 0.05}
            />   
        </View>
    </View>
    )
}

export default AddAccountBank

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
