import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,Text,
    Dimensions,StatusBar, TouchableHighlight, Button
  } from 'react-native';
import {ImgLogin} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import validate from '../../utils/validate'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

import { useSelector, useDispatch } from 'react-redux';
import { login, refresh , addLogin} from '../../redux/actions';



const Login = ({navigation}) => {
    
    const { token,data, } = useSelector (state => state.authReducers)
    const dispatch = useDispatch();
    const setRefresh = ()=> dispatch(refresh())
    const requestLogin = (email,password) => dispatch(login(email,password));
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError]  = useState("first")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] =  useState("first")
    const passRef = React.useRef(null)
    const constraints = {
        email: {
            presence: {
                message: "cannot be blank."
            },
            email: {
                message: 'must contain a valid email address'
            },
            length: {
                minimum: 8,
                message: 'must be at least 8 characters'
            }
        },
        password: {
            presence: {
                message: "cannot be blank."
            },
            length: {
                minimum: 6,
                message: 'must be at least 6 characters'
            }
        }
      }
      
      
      const validator = (field, value) => {
        // Creates an object based on the field name and field value
        // e.g. let object = {email: 'email@example.com'}
        let object = {}
        object[field] = value
      
        let constraint = constraints[field]
        // console.log(object, constraint)
      
        // Validate against the constraint and hold the error messages
        const result = validate(object, { [field]: constraint })
        console.log(result)
      
        // If there is an error message, return it!
        if (result) {
          // Return only the field error message if there are multiple
          return result[field][0]
        }
      
        return "first"
      }

    


    const submit = async () => {
        
        setLoading(true)
        try{
            let emailError = validator('email', email)
            let passwordError = validator('password', password)
            if(emailError != "first" || passwordError != "first"){
                setEmailError(emailError)
                setPasswordError(passwordError)
                setLoading(false)
                return;
            }

            await dispatch(addLogin(email,password))
            navigation.replace("VerifikatorLogin")
            setLoading(false)
        }catch (err){
            Snackbar.show({
                text: "Username atau password salah",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            setLoading(false)
        }
        
        
       
        
    }

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
                        error ={emailError}
                        keyboardType= {"email-address"}
                        
                        />
                    <InputText 
                        ref = {passRef}
                        width       = {windowWidth * 0.8}
                        placeholder = "Password" 
                        secureTextEntry = {true}
                        onChangeText= {(text) => setPassword(text)}
                        value={password}
                        error ={passwordError}
                        onSubmitEditing= {() => submit()}
                        
                        />
                </View>

                
                
                <View style={{alignItems:'center'}}>
                    <ButtonPrimary  
                        onPress={() => {
                            submit()
                        }}
                        title="Lanjutkan"
                        width={windowWidth*0.6}
                        marginTop   = {windowHeight * 0.033}
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

