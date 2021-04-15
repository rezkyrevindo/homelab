import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions, SafeAreaView, FlatList,
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
import axios from 'axios'
import validate from '../../utils/validate'
import Snackbar from 'react-native-snackbar';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';

const Register = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("first")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("first")
    const [namaDepan, setNamaDepan] = useState("")
    const [namaDepanError, setNamaDepanError] = useState("first")
    const [namaBelakang, setNamaBelakang] = useState("")
    const [namaBelakangError, setNamaBelakangError] = useState("first")
    const [confPassword, setConfPassword]= useState("")
    const [confPasswordError, setConfPasswordError] = useState("first")
    const [selectedImage, setSelectedImage] = useState("/users/1.png")
    const [listImage, setListImage] = useState([
        {id:"/users/1.png", name:"http://askhomelab.com/storage/users/1.png"},
        {id:"/users/2.png", name:"http://askhomelab.com/storage/users/2.png"},
        {id:"/users/3.png", name:"http://askhomelab.com/storage/users/3.png"},
        {id:"/users/4.png", name:"http://askhomelab.com/storage/users/4.png"},
        {id:"/users/5.png", name:"http://askhomelab.com/storage/users/5.png"},
        {id:"/users/6.png", name:"http://askhomelab.com/storage/users/6.png"},
    ])
    const [modalGambar, setModalGambar] = useState(false)
    

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
        },
        namaDepan : {
            presence: {allowEmpty: false}
        },
        namaBelakang : {
            presence: {allowEmpty: false}
        },
        confirmPassword : {
            equality: "password"
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
      
        return null
      }

    const submit = async () => {
        

        setLoading(true)

        let emailError = validator('email', email)
        let passwordError = validator('password', password)
        let namaDepanError = validator('namaDepan', namaDepan)
        let namaBelakangError = validator('namaBelakang', namaBelakang)
        let confPasswordError = validator('confirmPassword', confPassword)
        if(emailError != null || passwordError != null || namaBelakangError!=null || namaDepanError != null || confPasswordError != null  ){
            setEmailError(emailError)
            setPasswordError(passwordError)
            setNamaBelakangError(namaBelakangError)
            setNamaDepanError(namaDepanError)
            setConfPasswordError(confPasswordError)
            setLoading(false)
            return;
        }

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
        data.append("img", selectedImage)
        
        axios.post('https://askhomelab.com/api/register',
         data,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'application/x-www-form-urlencoded'
          }  
        })
          .then(function (response) {
            
            navigation.navigate('RegisterSuccess')
            setLoading(false)
          })
          .catch(function (error) {
                Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
              });
              console.log(error.response)
              setLoading(false)
          });


    }
    const RenderGambar = ({item}) => {
        return (
            <TouchableOpacity
            style={{margin:1, flex :1 , flexDirection:'column', }}
                onPress={()=> {
                    setSelectedImage(item.id)
                    setModalGambar(false)
                    }}
            >
                        <FastImage 
                            style={{width:100, height:100}} 
                            source={{
                                uri : "http://askhomelab.com/storage"+item.id
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
            </TouchableOpacity>
           
        )
    }

    const GambarModal = ()=>{
        return (
            <Modal
                visible={modalGambar}
                onTouchOutside={() => { setModalGambar(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                        
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.5}
                        data={listImage}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderGambar}
                        showsHorizontalScrollIndicator={false}
                        extraData={selectedImage}
                        numColumns={2}
                        />
                        
                    </SafeAreaView>
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }

    const renderContent = () => (
        <View style={{height : windowHeight, backgroundColor:'white',}}>
        <GambarModal/>
            <ScrollView>
            <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
                <View style={{width:50,height:3, backgroundColor:WARNA_UTAMA, alignSelf:'center', marginTop:20}}></View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={{width:100, height:100, backgroundColor:'#C4C4C4', marginTop:20, borderRadius:100, alignItems:"center", justifyContent:'center'}}
                        onPress= {() => setModalGambar(true)}
                    >
                       
                        <FastImage 
                            style={{width:100, height:100, borderRadius:100}} 
                            source={{
                                uri : "http://askhomelab.com/storage"+selectedImage
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
                        
                    </TouchableOpacity>
                    <FastImage 
                            style={{width:30, height:30, marginTop:-65}} 
                            source={ImgIcon}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
                    <View style={{flexDirection:"row", justifyContent:"space-between", width:windowWidth *0.85, marginTop:20}}>
                        <InputText 
                            width       = {windowWidth * 0.40}
                            placeholder = "Nama Depan" 
                            secureTextEntry = {false} 
                            onChangeText = {(text) => setNamaDepan(text)}
                            value={namaDepan}
                            error={namaDepanError}
                            />
                        <InputText 
                            width       = {windowWidth * 0.40}
                            placeholder = "Nama Belakang" 
                            secureTextEntry = {false} 
                            onChangeText = {(text) => setNamaBelakang(text)}
                            value={namaBelakang}
                            error={namaBelakangError}
                            />
                    </View>
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Email" 
                        secureTextEntry = {false} 
                        onChangeText = {(text) => setEmail(text)}
                        value={email}
                        error={emailError}
                        />
                    
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Password" 
                        secureTextEntry = {true}
                        onChangeText = {(text) => setPassword(text)}
                        value={password}
                        error={passwordError}
                        />
                    <InputText 
                        width       = {windowWidth * 0.85}
                        placeholder = "Confirm Password" 
                        secureTextEntry = {true}
                        onChangeText = {(text) => setConfPassword(text)}
                            value={confPassword}
                            error={confPasswordError}
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
