import React, {useState, useEffect} from 'react'
import {
    StyleSheet, SafeAreaView, FlatList,
    View,Text, TextInput, TouchableOpacity,
    Dimensions,StatusBar, TouchableHighlight, Button
  } from 'react-native';
import {ImgSetting , IconUserActive, ImgIcon} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import Snackbar from 'react-native-snackbar';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions';
import axios from 'axios'
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
const Setting = ({navigation}) => {
    const { token,data } = useSelector (state => state.authReducers);
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));
    const [noHp, setNoHp] = useState(data[2].handphone)
    const [universitas, setUniversitas] = useState(data[2].universitas!="null"? data[2].universitas:"")
    const [namaDepan, setNamaDepan] = useState(data[2].first_name)
    const [namaBelakang, setNamaBelakang] = useState(data[2].last_name)
    const [isLoading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(data[2].picture)
    const [listImage, setListImage] = useState([
        {id:"/users/1.png", name:"http://askhomelab.com/storage/users/1.png"},
        {id:"/users/2.png", name:"http://askhomelab.com/storage/users/2.png"},
        {id:"/users/3.png", name:"http://askhomelab.com/storage/users/3.png"},
        {id:"/users/4.png", name:"http://askhomelab.com/storage/users/4.png"},
        {id:"/users/5.png", name:"http://askhomelab.com/storage/users/5.png"},
        {id:"/users/6.png", name:"http://askhomelab.com/storage/users/6.png"},
    ])
    const [modalGambar, setModalGambar] = useState(false)

    const submit = async () => {
        
        setLoading(true)
        const data = new FormData()
        data.append("universitas", universitas)
        data.append("first_name", namaDepan)
        data.append("last_name", namaBelakang)
        data.append("handphone", noHp)
        data.append("picture", selectedImage)
        
        axios.post('https://askhomelab.com/api/update_settings',
         data,
        {
          headers : {
            Accept : '*/*',
            "content-type" :'application/x-www-form-urlencoded',
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

    return (
        <ScrollView style={styles.container}>
        <GambarModal/>
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
                            <View style={{padding:20, backgroundColor :'#fff', borderTopEndRadius:10, borderTopStartRadius:10, flexDirection:'row', alignItems:'center'}}>
                                <IconUserActive width={24} height={24}/>
                                <PlainText
                                        title={"Profile"}
                                        color={"#000"}
                                        fontSize= {14}
                                        fontStyle={"bold"}
                                        marginLeft={20}
                                    />
                            </View>
                            <View style={{alignContent:'center', alignItems:'center'}}>
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
                            <View style={{flexDirection:"row", justifyContent:"space-between", width:windowWidth *0.85, marginTop:30}}>
                                <InputText 
                                    width       = {windowWidth * 0.40}
                                    placeholder = "Nama Depan" 
                                    secureTextEntry = {false} 
                                    onChangeText = {(text) => setNamaDepan(text)}
                                    value={namaDepan}
                                    error="first"
                                    />
                                <InputText 
                                    width       = {windowWidth * 0.40}
                                    placeholder = "Nama Belakang" 
                                    secureTextEntry = {false} 
                                    onChangeText = {(text) => setNamaBelakang(text)}
                                    value={namaBelakang}
                                    error="first"
                                    />
                            </View>
                            <InputText 
                                width       = {windowWidth * 0.85}
                                placeholder = "Nomor HP" 
                                secureTextEntry = {false} 
                                onChangeText = {(text) => setNoHp(text)}
                                value={noHp}
                                error="first"
                                />
                            
                            <InputText 
                                width       = {windowWidth * 0.85}
                                placeholder = "Universitas" 
                                secureTextEntry = {false}
                                onChangeText = {(text) => setUniversitas(text)}
                                value={universitas}
                                error="first"
                                />
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
