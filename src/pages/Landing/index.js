import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image'
import {LogoHorizontal, ImgLanding} from '../../assets';
import {WARNA_UTAMA} from '../../utils/constant';
import {ButtonPrimary, PlainText} from '../../components'

const Landing = ({navigation}) => {
    return (
        <View style={styles.container}>
             <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
            <View style={styles.body}>
                <View style={{alignItems:'center', marginTop:10}}>
                    <FastImage 
                        style={styles.logo} 
                        source={LogoHorizontal}
                        resizeMode={FastImage.resizeMode.contain}
                    ></FastImage>
                </View>
                <View style={{alignItems:'center', marginTop:10}}>
                    <PlainText
                        fontSize= {24}
                        title="Selamat Datang"
                        color={"#000"}
                        fontStyle="bold"
                        marginTop={30}
                    />
                     <PlainText
                        fontSize= {11}
                        title="Perjalananmu dimulai disini"
                        color={"#000"}
                    />
                     <FastImage 
                        style={styles.img} 
                        source={ImgLanding}
                        resizeMode={FastImage.resizeMode.contain}
                        
                    ></FastImage>
                    <ButtonPrimary  
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                        title="Masuk"
                        width={"80%"}
                        marginTop={30}
                    />
                     <ButtonPrimary  
                        onPress={() => {
                            navigation.navigate('Register');
                        }}
                        title="Daftar"
                        width={"80%"}
                        marginTop={30}
                    />
                </View>
               
            </View>
        </View>
    )
}

export default Landing

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white' 
    },
    body :{
        flex : 1,
        width: "100%"
    }, 
    logo : {
        width: 150,
        height: 75 ,
    }, 
    img :{
        width: "80%",
        height: "50%" ,
        marginTop : 30,
    }
})
