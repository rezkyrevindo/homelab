import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,StatusBar,SafeAreaView , FlatList,
    Dimensions,TouchableOpacity, 
  } from 'react-native';
import {ImgBisnis, IconLock} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
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

        axios.get('https://askhomelab.com/api/detail_category', {
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

        axios.post('https://askhomelab.com/api/update_settings',
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
        const opacity = item.id === selectedId ? 0.5 : 1;
        
        return (
            <TouchableOpacity 
                onPress={() => setSelectedId(item.id)}
                style={{backgroundColor:'#fff'}}
            >
                <View  style={{alignItems:'center'}}>
                    <FastImage 
                        style={{    width : windowWidth * 0.9 , 
                                    height: windowHeight * 0.2, 
                                    opacity : opacity}} 
                        source={ImgBisnis}
                        resizeMode={FastImage.resizeMode.contain}
                    ></FastImage>
                    <PlainText
                        fontSize={24}
                        title={item.name}
                        fontStyle={"bold"}
                        color={"#fff"}   
                        marginTop={-windowHeight * 0.12}  
                    />
                </View>
                
            </TouchableOpacity>
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
                            showsVerticalScrollIndicator={false}
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
                        
                        
                        {/* <TouchableHighlight  >
                            <View  style={{alignItems:'center'}}>
                                <FastImage 
                                    style={styles.logo_lock} 
                                    source={ImgBisnis}
                                    resizeMode={FastImage.resizeMode.contain}
                                ></FastImage>
                                <FastImage 
                                    style={{width:40, height:40, marginTop: -windowHeight * 0.13}} 
                                    source={IconLock}
                                    resizeMode={FastImage.resizeMode.contain}
                                ></FastImage>
                                
                                <PlainText
                                    fontSize={18}
                                    title="IT"
                                    fontStyle={"bold"}
                                    color={"#000"}    
                                />
                            </View>
                            
                        </TouchableHighlight> */}
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
