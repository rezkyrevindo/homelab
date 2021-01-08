import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    Dimensions,TouchableHighlight, 
  } from 'react-native';
import {ImgBisnis, IconLock} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Interest = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)

    return (
        <View style={styles.container}>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading && 
                <View style = {styles.container}>
                    <TouchableHighlight 
                    onPress={ ()=> navigation.navigate("MainApp")}>
                        <View  style={{alignItems:'center'}}>
                            <FastImage 
                                style={styles.logo} 
                                source={ImgBisnis}
                                resizeMode={FastImage.resizeMode.contain}
                            ></FastImage>
                            <PlainText
                                fontSize={24}
                                title="Bisnis"
                                fontStyle={"bold"}
                                color={"#fff"}   
                                marginTop={-windowHeight * 0.12}  
                            />
                        </View>
                        
                    </TouchableHighlight>
                    <TouchableHighlight  >
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
                        
                    </TouchableHighlight>
                </View>
            }
        </View>
    )
}

export default Interest

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
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
