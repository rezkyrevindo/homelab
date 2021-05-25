import React, {useState, useEffect} from 'react'
import {
    StyleSheet, SafeAreaView, FlatList,
    View,Text, TextInput, TouchableOpacity,
    Dimensions,StatusBar, TouchableHighlight, Button, Switch
  } from 'react-native';
import {ImgSetting , IconUserActive, ImgIcon, IconCaretUp,IconCaretLeft, IconPicture, IconCaretDown,IconSecurity, IconNotificationActive,IconNotification, IconInfo, IconFile, IconFaq} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING,WARNA_SUCCESS, BASE_URL_API, BASE_URL_IMG} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator, IconSetting} from '../../components'
import FastImage from 'react-native-fast-image'
import Snackbar from 'react-native-snackbar';
import {ScrollView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, logout ,update_notification} from '../../redux/actions';
import axios from 'axios'
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import ImagePicker,{showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Setting = ({navigation}) => {
    
    const requestLogout = (token) => dispatch(logout(token));
    const { token,data, notification } = useSelector (state => state.authReducers);
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));
    const updateNotif = (not)  => dispatch(update_notification(not))
    
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [no_rek, setNoRek] = useState(data[2].account_number)
    const [bank, setBank] = useState(data[2].bank)
    const [gender, setGender] = useState(data[2].gender)
    const [password_confirmation, setPasswordConfirmation] = useState("")
    const [noHp, setNoHp] = useState(data[2].handphone)
    const [universitas, setUniversitas] = useState(data[2].universitas!="null"? data[2].universitas:"")
    const [namaDepan, setNamaDepan] = useState(data[2].first_name)
    const [namaBelakang, setNamaBelakang] = useState(data[2].last_name)
    const [isLoading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(BASE_URL_IMG+""+data[2].picture)
    const [selectedImageType,setSelectedImageType] = useState("url")
    const [listImage, setListImage] = useState([
        {id:"/users/1.png", name:BASE_URL_IMG+"users/1.png"},
        {id:"/users/2.png", name:BASE_URL_IMG+"users/2.png"},
        {id:"/users/3.png", name:BASE_URL_IMG+"users/3.png"},
        {id:"/users/4.png", name:BASE_URL_IMG+"users/4.png"},
        {id:"/users/5.png", name:BASE_URL_IMG+"users/5.png"},
        {id:"/users/6.png", name:BASE_URL_IMG+"users/6.png"},
    ])
    const [listBank, setListBank] = useState([
        {id:"BRI", name:"BRI"},
        {id:"BCA", name:"BCA"},
        {id:"MANDIRI", name:"MANDIRI"},
        {id:"BNI", name:"BNI"},
    ])
    const [listGender, setListGender] = useState([
        {id:"Pria", name:"Pria"},
        {id:"Wanita", name:"Wanita"}
    ])

    const [modalGambar, setModalGambar] = useState(false)
    const [modalGender, setModalGender] = useState(false)
    const [modalBank, setModalBank]     = useState(false)
    const [profileMinimize, setProfileMinimize] = useState(false)
    const [passwordMinimize, setPasswordMinimize] = useState(false)
    const [notificationMinimize, setNotificationMinimize] = useState(false)
    const [infoMinimize, setInfoMinimize] = useState(false)
    const [filePath, setFilePath] = useState(null)
    const [isEnabled, setIsEnabled] = useState(notification == "true" ? true : false);
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    

    useEffect(() => {
        console.log(isEnabled)
        if(isEnabled){
            updateNotif("true")
            subcribe(data[2].email)
        }else{
            updateNotif("false")
            unsubscribe(data[2].email)
        }
    }, [isEnabled])

    const subcribe = async (email) =>{
        var asciiKeys = [];
        for (var i = 0; i < email.length; i ++)
        asciiKeys.push(email[i].charCodeAt(0));

        messaging()
        .subscribeToTopic(asciiKeys.join(""))
        // .subscribeToTopic(email.replace(/[^a-zA-Z0-9]/g, ""))
        .then(() => {
            console.log("Berhasil subcribe + "+asciiKeys.join(""))
        });
    }
    
   const unsubscribe = async (email) =>{
        var asciiKeys = [];
        for (var i = 0; i < email.length; i ++)
        asciiKeys.push(email[i].charCodeAt(0));
        messaging()
        .unsubscribeFromTopic(asciiKeys.join(""))
        .then(() => console.log('Unsubscribed fom the topic!'));
    }
    const _launchImageLibrary = () => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            maxHeight : 1000,
            maxWidth : 1000
          };
          launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            // console.log('User cancelled image picker');
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            // console.log('response', JSON.stringify(response));
            console.log("file ",{'uri': Platform.OS === "android" ? response.uri.replace("content://", "file://") : response.uri.replace("file://", ""), 'type': response.type,'name': response.fileName})
            setModalGambar(false)
            setSelectedImageType("upload")
            setSourceImg(source)
            setSelectedImage(source)
            console.log(response)
            setFilePath(response)
            setFileData({'uri': Platform.OS === "android" ? response.uri.replace("content://", "file://") : response.uri.replace("file://", "") , 'type': response.type,'name': response.fileName})
            setFileUri(response.uri)
            
          }
        });
    
      }

    const submit = async () => {
        
        setLoading(true)
        const formData = new FormData()
        formData.append("universitas", universitas)
        formData.append("first_name", namaDepan)
        formData.append("last_name", namaBelakang)
        formData.append("handphone", noHp)
        formData.append("category_id", data[2].category_id)
        formData.append("email", data[2].email)
        formData.append("gender", gender)
        formData.append("no_rek", no_rek)
        formData.append("bank", bank)
        

       
        if(selectedImageType == "url"){
            
            
            formData.append('file', {
                uri: selectedImage,
                type: 'image/png',
                name: "Photo_React_Native",
            });
            
        }else{
            if (filePath != null){
            
                formData.append('file', {
                    uri: filePath.uri,
                    type: filePath.type,
                    name: "Photo_React_Native",
                });
            }
        }

        
        axios.post('https://askhomelab.com/api/update_settings',
        formData,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : 'Bearer '+token
          }  
        })
          .then(function (response) {
            
            Snackbar.show({
                text: "Berhasil memperbarui Profile",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            updateProf(token).then(() => setLoading(false))
            
          })
          .catch(function (error) {
                Snackbar.show({
                text: error.response,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
              });
              console.log(error)
              setLoading(false)
          });


    }
    const update_password = async () => {
        
        setLoading(true)
        const formData = new FormData()
        formData.append("password", password)
        formData.append("current_password", currentPassword)
        formData.append("password_confirmation", password_confirmation)

       
       
        
        axios.post('https://askhomelab.com/api/update_password',
        formData,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : 'Bearer '+token
          }  
        })
          .then(function (response) {
              console.log(response.data)
            if(response.data.message == "Success"){
                Snackbar.show({
                    text: "Berhasil memperbarui Password",
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'Ok',
                        textColor: WARNA_UTAMA,
                        onPress: () => { /* Do something. */ },
                    },  
                    });
                    setPassword("")
                    setPasswordConfirmation("")
                    setCurrentPassword("")
            }else{
                Snackbar.show({
                    text: response.data.message,
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'Ok',
                        textColor: WARNA_UTAMA,
                        onPress: () => { /* Do something. */ },
                    },  
                    });
            }
            setLoading(false)
            
          })
          .catch(function (error) {
                Snackbar.show({
                text: error.response,
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
              });
              console.log(error)
              setLoading(false)
          });


    }
    const RenderGambar = ({item}) => {
        console.log(item.name)
        return (
            <TouchableOpacity
            style={{margin:1, flex :1 , flexDirection:'column', }}
                onPress={()=> {
                    setSelectedImage(item.name)
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

    const RenderGender = ({item}) => {
        console.log(item.name)
        return (
            <TouchableOpacity style={{padding:10, alignItems:'center', borderRadius:15}}
                    onPress={()=> {
                    setGender(item.name)
                    setModalGender(false)
                    }}
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
           
           
        )
    }

    const GenderModal = ()=>{
        return (
            <Modal
                visible={modalGender}
                onTouchOutside={() => { setModalGender(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                    <PlainText
                        title={"Select Your Gender"}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                        marginLeft={20}
                    />
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.5}
                        data={listGender}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderGender}
                        showsHorizontalScrollIndicator={false}
                        extraData={gender}
                        
                        keyboardShouldPersistTaps='always'
                        />
                        
                    </SafeAreaView>
                   
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }
    const RenderBank = ({item}) => {
        console.log(item.name)
        return (
            <TouchableOpacity style={{padding:10, alignItems:'center', borderRadius:15}}
                    onPress={()=> {
                    setBank(item.name)
                    setModalBank(false)
                    }}
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
           
           
        )
    }

    const BankModal = ()=>{
        return (
            <Modal
                visible={modalBank}
                onTouchOutside={() => { setModalBank(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                    <PlainText
                        title={"Select Your Bank"}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                        marginLeft={20}
                    />
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.5}
                        data={listBank}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderBank}
                        showsHorizontalScrollIndicator={false}
                        extraData={bank}
                        
                        keyboardShouldPersistTaps='always'
                        />
                        
                    </SafeAreaView>
                   
                    </View>
                    
                </ModalContent>
            </Modal>
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
                    <PlainText
                        title={"Select Your Images"}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                        marginLeft={20}
                    />
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.5}
                        data={listImage}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderGambar}
                        showsHorizontalScrollIndicator={false}
                        extraData={selectedImage}
                        numColumns={2}
                        keyboardShouldPersistTaps='always'
                        />
                        
                    </SafeAreaView>
                    <TouchableOpacity
                            style={{backgroundColor:WARNA_UTAMA, borderRadius:20, padding:20, alignItems:'center', flexDirection:'column',
                            marginTop:20}}
                            onPress={() => {
                                _launchImageLibrary()
                            }}
                        >
                            <IconPicture fill={'#000'} width={24} height={24}/>
                            <PlainText
                                title={"Gallery"}
                                color={"#000"}
                                fontSize= {14}
                                fontStyle={"bold"}
                            />
                        </TouchableOpacity>
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }

    return (
        <ScrollView style={styles.container} 
        keyboardShouldPersistTaps='always'>
        <GambarModal/>
        <GenderModal/>
        <BankModal/>
            { isLoading &&
                <LoadingIndicator/>
            }
            { !isLoading &&
                   <View>
                   <View style={styles.header}>
                        <FastImage 
                            style={styles.logo} 
                            source={ImgSetting}
                            resizeMode={FastImage.resizeMode.contain}
                        ></FastImage>
                    </View> 
                    
                
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(profileMinimize){
                                        setProfileMinimize(false)
                                    }else{
                                        setProfileMinimize(true)
                                    }
                                } }
                            style={{padding:20, backgroundColor :'#fff', borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <View style={{flexDirection : 'row'}}>
                                    <IconUserActive width={24} height={24}/>
                                    <PlainText
                                            title={"Profile"}
                                            color={"#000"}
                                            fontSize= {14}
                                            fontStyle={"bold"}
                                            marginLeft={20}
                                        />
                                </View>
                                <View>
                                    {profileMinimize &&
                                        <IconCaretUp/>
                                    }
                                    {!profileMinimize &&
                                        <IconCaretUp style={{transform: [{rotateX: '180deg'}]}}/>
                                    }
                                </View>
                            </TouchableOpacity>
                            {profileMinimize && 
                                <View style={{alignContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity style={{width:100, height:100, backgroundColor:'#C4C4C4', marginTop:20, borderRadius:100, alignItems:"center", justifyContent:'center'}}
                                        onPress= {() => setModalGambar(true)}
                                    >
                                        {selectedImageType == "url" &&
                                        <FastImage 
                                            style={{width:100, height:100, borderRadius:100}} 
                                            source={{
                                                uri : selectedImage
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        ></FastImage>
                                        }
                                        {selectedImageType != "url" &&
                                        <FastImage 
                                            style={{width:100, height:100, borderRadius:100}} 
                                            source={selectedImage}
                                            resizeMode={FastImage.resizeMode.contain}
                                        ></FastImage>
                                        }
                                        
                                        
                                    </TouchableOpacity>
                                    <FastImage 
                                        style={{width:30, height:30, marginTop:-65}} 
                                        source={ImgIcon}
                                        resizeMode={FastImage.resizeMode.contain}
                                    ></FastImage>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", width:windowWidth *0.7, marginTop:30}}>
                                        <InputText 
                                            width       = {windowWidth * 0.32}
                                            placeholder = "Nama Depan" 
                                            secureTextEntry = {false} 
                                            onChangeText = {(text) => setNamaDepan(text)}
                                            value={namaDepan}
                                            error="first"
                                            />
                                        <InputText 
                                            width       = {windowWidth * 0.32}
                                            placeholder = "Nama Belakang" 
                                            secureTextEntry = {false} 
                                            onChangeText = {(text) => setNamaBelakang(text)}
                                            value={namaBelakang}
                                            error="first"
                                            
                                            />
                                    </View>
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Nomor HP" 
                                        secureTextEntry = {false} 
                                        onChangeText = {(text) => setNoHp(text)}
                                        value={noHp}
                                        error="first"
                                        />
                                    
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Universitas" 
                                        secureTextEntry = {false}
                                        onChangeText = {(text) => setUniversitas(text)}
                                        value={universitas}
                                        error="first"
                                        />
                                   
                                    <TouchableOpacity style={{flexDirection :'row',alignContent:'center',justifyContent:'center', alignItems:'center'}} onPress={()=> setModalGender(true)}>
                                        
                                        <InputText 
                                            width       = {windowWidth * 0.63}
                                            placeholder = "Jenis Kelamin" 
                                            secureTextEntry = {false}
                                            
                                            value={gender}
                                            error="first"
                                        />
                                        <IconCaretDown style={{marginLeft:10,marginTop:30}} fill={"#000"} width={18} height={18} />
                                    </TouchableOpacity>    
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Nomor Rekening" 
                                        secureTextEntry = {false}
                                        onChangeText = {(text) => setNoRek(text)}
                                        value={no_rek}
                                        error="first"
                                        />
                                    <TouchableOpacity style={{flexDirection :'row',alignContent:'center',justifyContent:'center', alignItems:'center'}} onPress={()=> setModalBank(true)}>
                                        
                                        <InputText 
                                            width       = {windowWidth * 0.63}
                                            placeholder = "BANK" 
                                            secureTextEntry = {false}
                                            
                                            value={bank}
                                            error="first"
                                        />
                                        <IconCaretDown style={{marginLeft:10,marginTop:30}} fill={"#000"} width={18} height={18} />
                                    </TouchableOpacity>   
                                    <View style={{alignItems:'center', marginBottom:20}}>
                                        <ButtonPrimary  
                                            onPress={() => {
                                                submit()
                                            }}
                                            title="Perbarui"
                                            width={windowWidth*0.6}
                                            marginTop   = {windowHeight * 0.033}
                                        />
                                    </View>
                                </View>
                            }
                            
                        </View>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(passwordMinimize){
                                        setPasswordMinimize(false)
                                    }else{
                                        setPasswordMinimize(true)
                                    }
                                } }
                            style={{padding:20, backgroundColor :'#fff', borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <View style={{flexDirection : 'row'}}>
                                    <IconSecurity width={24} height={24} />
                                    <PlainText
                                            title={"Change Password"}
                                            color={"#000"}
                                            fontSize= {14}
                                            fontStyle={"bold"}
                                            marginLeft={20}
                                        />
                                </View>
                                <View>
                                    {passwordMinimize &&
                                        <IconCaretUp/>
                                    }
                                    {!passwordMinimize &&
                                        <IconCaretUp style={{transform: [{rotateX: '180deg'}]}}/>
                                    }
                                </View>
                            </TouchableOpacity>
                            {passwordMinimize && 
                                <View style={{alignContent:'center', alignItems:'center'}}>
                                   
                                    
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Current Password" 
                                        secureTextEntry = {true} 
                                        onChangeText = {(text) => setCurrentPassword(text)}
                                        value={currentPassword}
                                        error="first"
                                        />
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Password Baru" 
                                        secureTextEntry = {true} 
                                        onChangeText = {(text) => setPassword(text)}
                                        value={password}
                                        error="first"
                                        />
                                    <InputText 
                                        width       = {windowWidth * 0.7}
                                        placeholder = "Current Password" 
                                        secureTextEntry = {true} 
                                        onChangeText = {(text) => setPasswordConfirmation(text)}
                                        value={password_confirmation}
                                        error="first"
                                        />
                                    
                                   
                                    <View style={{alignItems:'center', marginBottom:20}}>
                                        <ButtonPrimary  
                                            onPress={() => {
                                                update_password()
                                            }}
                                            title="Perbarui"
                                            width={windowWidth*0.6}
                                            marginTop   = {windowHeight * 0.033}
                                        />
                                    </View>
                                </View>
                            }
                            
                        </View>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(notificationMinimize){
                                        setNotificationMinimize(false)
                                    }else{
                                        setNotificationMinimize(true)
                                    }
                                } }
                            style={{padding:20, backgroundColor :'#fff', borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <View style={{flexDirection : 'row'}}>
                                    <IconNotificationActive width={24} height={24} />
                                    <PlainText
                                            title={"Notification"}
                                            color={"#000"}
                                            fontSize= {14}
                                            fontStyle={"bold"}
                                            marginLeft={20}
                                        />
                                </View>
                                <View>
                                    {notificationMinimize &&
                                        <IconCaretUp/>
                                    }
                                    {!notificationMinimize &&
                                        <IconCaretUp style={{transform: [{rotateX: '180deg'}]}}/>
                                    }
                                </View>
                            </TouchableOpacity>
                            {notificationMinimize && 
                                <View style={{alignContent:'center', alignItems:'center', padding:20}}>
                                
                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                            <IconNotification width={24} height={24} fill={"#000"}/>
                                            <PlainText
                                                    title={"Notifikasi"}
                                                    color={"#000"}
                                                    fontSize= {11}
                                                    fontStyle={"bold"}
                                                    marginLeft={20}
                                                />
                                        </View>
                                        <Switch
                                            trackColor={{ false: WARNA_WARNING, true: WARNA_SUCCESS }}
                                            thumbColor={isEnabled ? "#fff" : "#ffff"}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                    </View>
                                    
                                </View>
                            }
                            
                        </View>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    if(infoMinimize){
                                        setInfoMinimize(false)
                                    }else{
                                        setInfoMinimize(true)
                                    }
                                } }
                            style={{padding:20, backgroundColor :'#fff', borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                <View style={{flexDirection : 'row'}}>
                                    <IconInfo width={24} height={24} />
                                    <PlainText
                                            title={"Tentang"}
                                            color={"#000"}
                                            fontSize= {14}
                                            fontStyle={"bold"}
                                            marginLeft={20}
                                        />
                                </View>
                                <View>
                                    {infoMinimize &&
                                        <IconCaretUp/>
                                    }
                                    {!infoMinimize &&
                                        <IconCaretUp style={{transform: [{rotateX: '180deg'}]}}/>
                                    }
                                </View>
                            </TouchableOpacity>
                            {infoMinimize && 
                                <View style={{alignContent:'center', alignItems:'center', padding:20}}>
                                
                                    <TouchableOpacity style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        
                                        paddingBottom:10,
                                        borderBottomWidth:1,
                                        borderColor: "#DAD0D0"
        
                                    }}
                                        onPress= {()=> navigation.navigate("OpenWebView", {"title": "Syarat dan Ketentuan", 
                                        "url": "http://askhomelab.com/binance/syarat_dan_ketentuan.php"})}
                                    >
                                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                            
                                            <PlainText
                                                    title={"Syarat dan Ketentuan"}
                                                    color={"#000"}
                                                    fontSize= {12}
                                                    fontStyle={"bold"}
                                                    
                                                />
                                        </View>
                                        <IconCaretLeft style={{height:24, width:24}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        paddingTop:10,
                                        paddingBottom:10,
                                        borderBottomWidth:1,
                                        borderColor: "#DAD0D0"
                                    }}
                                    onPress= {()=> navigation.navigate("OpenWebView", {"title": "Kebijakan Privasi", 
                                        "url": "http://askhomelab.com/binance/kebijakan_privasi.php"})}
                                    >
                                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                            
                                            <PlainText
                                                    title={"Kebijakan Privasi"}
                                                    color={"#000"}
                                                    fontSize= {12}
                                                    fontStyle={"bold"}
                                                    
                                                />
                                        </View>
                                        <IconCaretLeft style={{height:24, width:24}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        paddingTop:10,
                                        paddingBottom:10,
                                        
                                        borderBottomWidth:1,
                                        borderColor: "#DAD0D0"
                                    }}
                                    onPress= {()=> navigation.navigate("OpenWebView", {"title": "Informasi Poin", 
                                        "url": "http://askhomelab.com/binance/informasi_poin.php"})}
                                    >
                                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                            
                                            <PlainText
                                                    title={"Informasi Poin"}
                                                    color={"#000"}
                                                    fontSize= {12}
                                                    fontStyle={"bold"}
                                                    
                                                />
                                        </View>
                                        <IconCaretLeft style={{height:24, width:24}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        paddingTop:10,
                                        paddingBottom:10,
                                    }}
                                    onPress= {()=> navigation.navigate("OpenWebView", {"title": "Tentang Kami", 
                                        "url": "http://askhomelab.com/binance/tentang_homelab.php"})}
                                    >
                                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                                            
                                            <PlainText
                                                    title={"Tentang Kami"}
                                                    color={"#000"}
                                                    fontSize= {12}
                                                    fontStyle={"bold"}
                                                />
                                        </View>
                                        <IconCaretLeft style={{height:24, width:24}}/>
                                    </TouchableOpacity>
                                    
                                </View>
                            }
                            
                        </View>

                    
                        <View style={{alignItems:'center', marginBottom:20}}>
                                <ButtonPrimary  
                                   onPress = { () => {
                                            requestLogout(token).then(()=> {
                                                unsubscribe(data[2].email)  
                                                navigation.replace("Landing")
                                            })
                                            
                                        } 
                                    } 
                                    title="Logout"
                                    width={windowWidth*0.8}
                                    marginTop   = {windowHeight * 0.033}
                                />
                            </View>
                        
                                
                    </View>
                  
                   </View>
                
            
            
            }
            </ScrollView>
            
    )
}

export default Setting

const styles = StyleSheet.create({
    container:{
        flex : 1,
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
        alignItems:'center'
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
    bodyContent :{
        marginTop : 20,
        backgroundColor : '#fff',
        flexDirection : 'column',
        justifyContent : 'space-between',
        width : windowWidth * 0.9,
        borderRadius    : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginBottom : 10
    },
    footerContent :{
        marginTop : 20,
        
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems:'center',
        width : windowWidth * 0.9,
        borderRadius    : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginBottom : 10,
        paddingHorizontal: 20,
        paddingVertical : 10,
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        
        borderRadius: 10,
        backgroundColor: "transparent",
        textAlignVertical: 'top',
        padding: 20
    },
})
