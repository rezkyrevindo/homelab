import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,StatusBar
  } from 'react-native';
import {ImgForgotPassword} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING, BASE_URL_API} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import validate from '../../utils/validate'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const ForgotPassword = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("first")
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
      
        return null
      }

      const submit = async () => {
        

        setLoading(true)

        let emailError = validator('email', email)
        if(emailError != null){
            setEmailError(emailError)
            setLoading(false)
            return;
        }
       
        axios.get(BASE_URL_API+'forgot_password/email?='+email,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'application/x-www-form-urlencoded'
          }  
        })
          .then(function (response) {
            if(response.data.success){

            }
            navigation.replace('ForgotPasswordSuccess')

            setLoading(false)
          })
          .catch(function (error) {
               
              setLoading(false)
          });


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
                    <PlainText
                            fontSize= {24}
                            title="Lupa kata sandi?"
                            color={"#000"}
                            fontStyle="bold"
                            marginTop={30}
                        />
                    <PlainText
                            fontSize= {14}
                            title="Isi email kamu dibawah ini, lalu cek email kamu!"
                            color={"#000"}
                            marginTop={5}
                        />
                    <InputText 
                        width       = {windowWidth * 0.8}
                        placeholder = "Email" 
                        secureTextEntry = {false} 
                        onChangeText= {(text) => setEmail(text)}
                        value={email}
                        error= {emailError}
                        />
                    
                </View>

                
                
                <View style={{alignItems:'center'}}>
                    <ButtonPrimary  
                        onPress={() => {
                            submit();
                        }}
                        title="Lanjutkan"
                        width={windowWidth*0.8}
                        marginTop   = {windowHeight * 0.033}
                    />
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
                            source={ImgForgotPassword}
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

export default ForgotPassword


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
