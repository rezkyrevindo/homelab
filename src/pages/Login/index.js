import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar, TouchableHighlight
  } from 'react-native';
import {ImgLogin} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Login = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const renderContent = () => (
        <View style={{height : windowHeight, backgroundColor:'white',}}>
             <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
            <View style={styles.body}>
                <View style={{width:50,height:3, backgroundColor:WARNA_UTAMA, alignSelf:'center', marginTop:20}}></View>
                  
                <View style={{alignItems:'center'}}>
                    <InputText 
                        width       = {windowWidth * 0.8}
                        placeholder = "Email" 
                        secureTextEntry = {false} 
                        onChangeText= {(text) => setEmail(text)}
                        value={email}
                        />
                    <InputText 
                        width       = {windowWidth * 0.8}
                        placeholder = "Password" 
                        secureTextEntry = {true}
                        onChangeText= {(text) => setPassword(text)}
                        value={password}
                        />
                </View>

                
                
                <View style={{alignItems:'center'}}>
                    <ButtonPrimary  
                        onPress={() => {
                            navigation.navigate('Interest');
                        }}
                        title="Lanjutkan"
                        width={windowWidth*0.6}
                        marginTop   = {windowHeight * 0.033}
                    />
                </View>

                <View style={{alignItems:"center"}}>
                
                    <PlainText
                        fontSize={13}
                        title="atau masuk menggunakan"
                        color={"#000"}
                        marginTop = {windowHeight * 0.033}       
                    />
                </View>
                

                <View 
                
                style={styles.otherLogin}>
                    <ButtonWithIcon
                        title={"facebook"}
                    />
                    <ButtonWithIcon
                        title={"google"}
                    />
                    
                </View>
                
                <View style={{alignItems:'center'}}>
                    
                    

                    {/* <PlainText
                        title={"By continuing, you agree to our"}
                        color={"#000"}
                        marginTop = {windowHeight * 0.033}
                        fontSize= {10}
                    />
                    <PlainText
                        title={"Terms of Service and Privacy Policy "}
                        color={"#4267B2"}
                        marginTop = {windowHeight * 0.01}
                        fontSize= {10}
                    /> */}
                    <TouchableHighlight
                        onPress={ ()=> navigation.navigate("ForgotPassword")}
                    >
                        <PlainText
                        
                            fontSize= {13}
                            title="Lupa kata sandi?"
                            color={"#4267B2"}
                            marginTop   = {windowHeight * 0.02}
                        />
                        
                    </TouchableHighlight>
                    
                </View>
                      
                        
            </View>
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
                            source={ImgLogin}
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

export default Login


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
    }, 
  
})
