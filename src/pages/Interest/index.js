import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,StatusBar,SafeAreaView , FlatList,
    Dimensions,TouchableOpacity, TouchableHighlight
  } from 'react-native';
import {ImgBisnis, IconLock} from '../../assets';
import {WARNA_UTAMA, WARNA_ABU_ABU,WARNA_WARNING, BASE_URL_API, BASE_URL_IMG} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import { updateProfile } from '../../redux/actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Interest = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const { token,data } = useSelector (state => state.authReducers);
    const [selectedId, setSelectedId] = useState(null);
    const [listInterest, setListInterest] = useState([])
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));

    useEffect(() => {
        getInterest()
    }, [])

    const getInterest = async () =>{
        setLoading(true)

        axios.get(BASE_URL_API+'detail_category', {
            headers: {
                "Authorization" : "Bearer " + token 
            }
        }).then(function (response){
            
            setListInterest(response.data.Kategori)
           
            setLoading(false)
        }).catch(function (error){
            console.error(error)
            setLoading(false)
        })
    }

    const processUpdateProfile = async () =>{
        setLoading(true)
        var data = new FormData();        
        data.append('category_id', selectedId)

        axios.post(BASE_URL_API+'category_setting',
        data,
        {
            headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : 'Bearer ' + token 
            }  
        }).then(function (response){
            if (response.status == 200){
                updateProf(token).then(() => navigation.replace("MainApp") )
            }
            setLoading(false)
        }).catch(function(error){
            console.error(error)
            setLoading(false)
        })
    }

    const renderItem = ({item}) =>{
        const opacity = item.id === selectedId ? 1 : 0.6
        const selected = item.id === selectedId ?  {alignItems:'center', borderWidth:1,
        borderColor:WARNA_UTAMA, borderRadius:20, padding:10} : {alignItems:'center'}
        return (
            <View >
            { item.status == "1" &&
                <TouchableOpacity 
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => setSelectedId(item.id)}
                style={{backgroundColor : "#fff", flex:1,padding:10,alignItems:'center',justifyContent:'center', alignContent:"center"}}
            >
                <View  style={selected}>
                    <FastImage 
                        style={{    width : windowWidth * 0.4 , 
                                    height: windowHeight * 0.2,
                                    opacity : opacity,
                                    
                                    }} 
                        source={{uri : BASE_URL_IMG + item.img}}
                        resizeMode={FastImage.resizeMode.contain}
                    ></FastImage>
                    <PlainText
                        fontSize={18}
                        title={item.name}
                        fontStyle={"bold"}
                        color={"#000"}   
                    />
                </View>
                
            </TouchableOpacity>
        }
        { item.status == "0" &&
                <TouchableOpacity 
                style={{backgroundColor : "#fff", flex:1, padding:10, alignContent:"center"}}
            >
                <View  style={{alignItems:'center', borderWidth:1,
                        borderColor:WARNA_ABU_ABU, borderRadius:20, padding:10}}>
                    <FastImage 
                        style={{    width : windowWidth * 0.4 , 
                                    height: windowHeight * 0.2, 
                                    opacity : opacity,}} 
                        source={{uri : BASE_URL_IMG + item.img}}
                        resizeMode={FastImage.resizeMode.contain}
                    ></FastImage>
                    <PlainText
                        fontSize={18}
                        title={item.name}
                        fontStyle={"bold"}
                        color={"#000"}   
                    />
                    <PlainText
                        fontSize={12}
                        title={"Coming Soon"}
                        fontStyle={"bold"}
                        color={"#000"}   
                    />
                </View>
                
            </TouchableOpacity>
        }
        </View>
)
    }

    return (    
        <SafeAreaView  style={styles.container}>
            <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading && 
                <SafeAreaView style={{flex : 1}}>
                    <SafeAreaView style = {styles.container}>
                        
                        <FlatList
                            data={listInterest}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            extraData={selectedId}
                            
                            numColumns={2}
                            
                            />
                    </SafeAreaView>
                    <SafeAreaView style={{flex:1}}>
                        {selectedId != null &&
                            <View style={{alignItems:'center'}}>
                                <ButtonPrimary  
                                    onPress={() => {
                                        processUpdateProfile()
                                    }}
                                    title="Lanjutkan"
                                    width={windowWidth*0.6}
                                    marginTop   = {windowHeight * 0.033}
                                />
                            </View>
                        }
                        
                        
                    
                    </SafeAreaView>
                </SafeAreaView>
            }
        </SafeAreaView>
    )
}

export default Interest

const styles = StyleSheet.create({
    container:{
        flex:8,
        backgroundColor:'white',
        alignItems:'center'
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#FFF2D7",
    },
    logo : {
        width : windowWidth * 0.9 , 
        height: windowHeight * 0.2,
        
        
    },
    logo_lock :{
        width : windowWidth * 0.9 , 
        height: windowHeight * 0.2,
        opacity : 0.5
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
