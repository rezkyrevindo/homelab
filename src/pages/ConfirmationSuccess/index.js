import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    StatusBar,
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LogoHorizontal, ImgSuccess} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, ButtonDefault} from '../../components'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfirmationSuccess = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <View>
                <StatusBar translucent 
                backgroundColor={"#FFF"} 
                barStyle="dark-content" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image 
                        
                    style={styles.logo} source={LogoHorizontal}></Image>
                </View>
                <View style={styles.body}>
                    <HeaderText
                        marginTop = {windowHeight * 0.054}
                        title={"Beli Poin Berhasil"}
                        textAlign={"center"}
                    
                    />
                    <View style={{alignItems:'center'}}>
                        <PlainText
                            title={"Pembayaran telah diterima"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.033}
                            fontSize= {13}
                        />
                        <Image source={ImgSuccess} style={styles.img}></Image>
                       
                    </View>

                  
                    
                
                    <View style={{alignItems:'center'}}>
                        <ButtonPrimary 
                            onPress={() => {
                                navigation.replace('MainApp');
                            }}  
                            title="Done"
                            width={windowWidth*0.6}
                            marginTop   = {windowHeight * 0.04}
                        />
                        <PlainText></PlainText>
                    </View>

                
                
                    
                </View>

            </ScrollView>
        </View>
    )
}

export default ConfirmationSuccess

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white' 
    },
    header: {
        width: windowWidth,
        height: windowHeight * 0.11,
        paddingTop : 40,
        alignItems : 'center',
    },
    logo : {
        width : windowWidth * 0.36,
        height : windowHeight * 0.052
    },
    body:{
        flex:1,
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
    img:{
        marginTop       : windowHeight * 0.027,
        width           : windowWidth * 0.52,
        height          : windowHeight * 0.47
    }
})
