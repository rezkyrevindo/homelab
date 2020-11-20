import React from 'react'
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    StatusBar,
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LogoHorizontal} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, ButtonDefault} from '../../components'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Verification = ({navigation}) => {
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
                        title={"Verification Code"}
                        textAlign={"center"}
                    
                    />
                    <View style={{alignItems:'center'}}>
                        <PlainText
                            title={"Please check your email immediately"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.033}
                            fontSize= {13}
                        />
                         <PlainText
                            title={"Enter the verication code below"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.02}
                            fontSize= {13}
                        />
                    </View>

                    <View style={{alignItems:'center'}}>
                        <View style={{flexDirection:'row', width:windowWidth*0.6, justifyContent:'space-between'}}>
                            <InputText 
                                width       = {windowWidth * 0.1}
                                placeholder = "" 
                                secureTextEntry = {false} 
                                />
                            <InputText 
                                width       = {windowWidth * 0.1}
                                placeholder = "" 
                                secureTextEntry = {false}
                                />
                            <InputText 
                                width       = {windowWidth * 0.1}
                                placeholder = "" 
                                secureTextEntry = {false}
                                />
                            <InputText 
                                width       = {windowWidth * 0.1}
                                placeholder = "" 
                                secureTextEntry = {false}
                                />
                            <InputText 
                                width       = {windowWidth * 0.1}
                                placeholder = "" 
                                secureTextEntry = {false}
                                />
                        </View>
                    </View>
                
                    
                
                    <View style={{alignItems:'center'}}>
                        <ButtonPrimary 
                            onPress={() => {
                                navigation.navigate('ConfirmationSuccess');
                            }} 
                            title="Next"
                            width={windowWidth*0.6}
                            marginTop   = {windowHeight * 0.04}
                        />
                    </View>

                   
                  

                    <View style={{alignItems:'center'}}>
                        <PlainText
                            title={"Didnt receive the email?"}
                            color={"#000"}
                            marginTop = {windowHeight * 0.033}
                            fontSize= {13}
                        />
                        <PlainText
                            title={"Resend Confirmation"}
                            color={WARNA_UTAMA}
                            marginTop = {windowHeight * 0.01}
                            fontSize= {13}
                        />
                    </View>
                    
                </View>

            </ScrollView>
        </View>
    )
}

export default Verification

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
    }
})
