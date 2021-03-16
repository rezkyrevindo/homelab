import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
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
const Setting = ({navigation}) => {
    const { token,data } = useSelector (state => state.authReducers);
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));
    const [noHp, setNoHp] = useState(data[2].handphone)
    const [universitas, setUniversitas] = useState(data[2].universitas)
    const [namaDepan, setNamaDepan] = useState(data[2].first_name)
    const [namaBelakang, setNamaBelakang] = useState(data[2].last_name)
    const [isLoading, setLoading] = useState(false)
    

    const submit = async () => {
        
        setLoading(true)
        const data = new FormData()
        data.append("universitas", universitas)
        data.append("first_name", namaDepan)
        data.append("last_name", namaBelakang)
        data.append("no_hp", noHp)
        
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
            console.log(response.data)
            
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
    return (
        <View style={styles.container}>
        <ScrollView>
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
                            <TouchableOpacity style={{width:100, height:100, backgroundColor:'#C4C4C4', marginTop:20, borderRadius:100, alignItems:"center", justifyContent:'center', alignContent:'center'}}>
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
                                placeholder = "Nomor HP" 
                                secureTextEntry = {false} 
                                onChangeText = {(text) => setNoHp(text)}
                                value={noHp}
                                />
                            
                            <InputText 
                                width       = {windowWidth * 0.85}
                                placeholder = "Universitas" 
                                secureTextEntry = {false}
                                onChangeText = {(text) => setUniversitas(text)}
                                value={universitas}
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
            </View>
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
