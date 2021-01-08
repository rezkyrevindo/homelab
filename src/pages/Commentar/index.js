import React, {useEffect, useState}  from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    TextInput,
    Dimensions, StatusBar, TouchableOpacity, 
    
  } from 'react-native';
  import FastImage from 'react-native-fast-image'
import {IconCaretDown,DefaultProfile, IconDerajat,IconPicture,IconFont, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, ButtonPrimary} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Commentar = () => {
    const [reply, setReply] = useState("")
    return (
        <View style={styles.container}>
            <ScrollView style={styles.body}>
                <View >
                    <View style={{flexDirection:'row',margin:10}}>
                        <FastImage source={DefaultProfile} style={{width : 50, height: 50}} />
                        <View style={{
                            flexDirection:'column',
                            marginHorizontal:10
                        }}>
                            <View style={{
                                flexDirection : 'row',marginBottom:10
                            }}>
                                 <PlainText
                                    title={"Laura"}
                                    color={"#979797"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                />
                                <PlainText
                                    title={"29 minutes ago"}
                                    color={"#979797"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                    marginLeft = {10}
                                />
                            </View>
                            <View style={{
                                backgroundColor:'#ffff',
                                paddingVertical:15,
                                paddingHorizontal:10,
                                maxWidth: windowWidth*0.7,
                                borderTopEndRadius:20,
                                borderBottomEndRadius:20,
                                borderBottomStartRadius:20}}>
                                <PlainText
                                    title={"Thanks for the answer"}
                                    color={"#424242"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                    marginLeft = {10}
                                /> 
                            </View>
                        </View>
                    </View>
                    
                </View>
                <View >
                    <View style={{flexDirection:'row-reverse',margin:10}}>
                        <FastImage source={DefaultProfile} style={{width : 50, height: 50}} />
                        <View style={{
                            flexDirection:'column',
                            marginHorizontal:10
                        }}>
                            <View style={{
                                flexDirection : 'row',marginBottom:10,
                                justifyContent:'flex-end' // if id_user == id_user-login
                            }}>
                                 <PlainText
                                    title={"Boi"}
                                    color={"#979797"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                />
                                <PlainText
                                    title={"27 minutes ago"}
                                    color={"#979797"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                    marginLeft = {10}
                                />
                            </View>
                            <View style={{
                                backgroundColor:'#ffff',
                                paddingVertical:15,
                                paddingHorizontal:10,
                                maxWidth: windowWidth*0.7,
                                borderTopEndRadius:20,
                                borderBottomEndRadius:20,
                                borderBottomStartRadius:20}}>
                                <PlainText
                                    title={"Thanks for the answer"}
                                    color={"#424242"}
                                    fontStyle={"bold"}
                                    fontSize = {11}
                                    marginLeft = {10}
                                /> 
                            </View>
                        </View>
                    </View>

                    
                    
                </View>
            </ScrollView>
            <View style={styles.footer}> 
                <InputText 
                    width       = {windowWidth * 0.7}
                    placeholder = "Reply ..." 
                    secureTextEntry = {false} 
                    onChangeText= {(text) => setReply(text)}
                    value={reply}
                    marginTop={0}
                    height = {40}
                    />
                <ButtonPrimary 
                    title="Send"
                    width={windowWidth*0.18}
                    fontSize={13}
                />
            </View>
        </View>
    )
}

export default Commentar

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor : '#FFF2D7',
    },
    body : {
        height: windowHeight-56,

    },
    footer :{
        height:56,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal: windowWidth*0.05,
    }
})
