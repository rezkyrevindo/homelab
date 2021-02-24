import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity, StatusBar
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ImgSignup, ImgIcon} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -56;
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import Axios from 'axios'
import Snackbar from 'react-native-snackbar';
import qs from 'qs'

const Register = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [namaDepan, setNamaDepan] = useState("")
    const [namaBelakang, setNamaBelakang] = useState("")
    const [confPassword, setConfPassword]= useState("")
    
    const submit = async () => {
        console.log(""+email + password)

        setLoading(true)

        const url = "https://askhomelab.com/api/register"
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }
        const data = new URLSearchParams()
        data.append("email", email)
        data.append("password", password)
        data.append("first_name", namaDepan)
        data.append("last_name", namaBelakang)
        data.append("password_confirmation", confPassword)
        
        Axios({
            method : 'post',
            url     : url,
            data : qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
            
        }).then(function(response) {
            console.log(response.data.messages)
            setLoading(false)
        }).catch(function (error) {
            console.log(error.response.data.errors)
            setLoading(false)
        })


    }


    const renderContent = () => (
        <View style={{height : windowHeight, backgroundColor:'white',}}>
            <ScrollView>
            <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
                <View style={{width:50,height:3, backgroundColor:WARNA_UTAMA, alignSelf:'center', marginTop:20}}></View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={{width:100, height:100, backgroundColor:'#C4C4C4', marginTop:20, borderRadius:100, alignItems:"center", justifyContent:'center'}}>
                        <FastImage 
                            style={{width:30, height:30}} 
                            source={ImgIcon}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row", justifyContent:"space-between", width:windowWidth *0.85}}>
                        <InputText 
                            width       = {windowWidth * 0.40}
                            placeholder = "Nama Depan" 
                            secureTextEntry = {false} 
                            onChangeText = {(text) => setNamaDepan(text)}
                            value={namaDepan}
                            />
                        <InputText 
                            width       = {windowWidth * 0.40}
                            placeholder = "Nama Belakang" 
                            secureTextEntry = {false} 
                            onChangeText = {(text) => setNamaBelakang(text)}
                            value={namaBelakang}
                            />
                    </View>
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Email" 
                        secureTextEntry = {false} 
                        onChangeText = {(text) => setEmail(text)}
                        value={email}
                        />
                    
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Password" 
                        secureTextEntry = {true}
                        onChangeText = {(text) => setPassword(text)}
                        value={password}
                        />
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Confirm Password" 
                        secureTextEntry = {true}
                        onChangeText = {(text) => setConfPassword(text)}
                            value={confPassword}
                        />
                </View>
           
            
            <View style={{alignItems:'center'}}>
                <ButtonPrimary  
                    onPress={() => {
                        submit()
                    }}
                    title="Continue"
                    width={windowWidth*0.6}
                    marginTop   = {windowHeight * 0.033}
                />
            </View>

            
            <View style={{alignItems:'center'}}>
                
                
                <PlainText
                        title={"By continuing, you agree to our"}
                        color={"#000"}
                        marginTop = {windowHeight * 0.033}
                        fontSize= {10}
                    />
                <PlainText
                    title={"Terms of Service and Privacy Policy "}
                    color={WARNA_UTAMA}
                    marginTop = {windowHeight * 0.01}
                    fontSize= {10}
                    marginBottom={50}
                />
            </View>
            </ScrollView>

            
        </View>
      );
     
    const sheetRef = React.useRef(null);
    return ( 
        <View style={styles.container}>
        {isLoading &&
            <LoadingIndicator/>
        }
        {!isLoading && 
            <View style = {styles.container}>
                
                <View style={styles.header}>
                    <FastImage 
                        style={styles.logo} 
                        source={ImgSignup}
                        resizeMode={FastImage.resizeMode.contain}
                    ></FastImage>
                </View> 
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[windowHeight , windowHeight * 0.85, windowHeight *0.75]}
                    initialSnap = {2}
                    borderRadius={10}
                    renderContent={renderContent}
                    />
            </View>
        }
    </View>
    )
}

export default Register

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
