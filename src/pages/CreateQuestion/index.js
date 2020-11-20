import React  from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,
    TextInput,
    Dimensions, StatusBar, TouchableOpacity, 
    
  } from 'react-native';

import {IconCaretDown, DefaultProfile, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;


const CreateQuestion = () => {
    return (
        <View style={styles.container}>
             <View>
                <StatusBar translucent 
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}}>
                            <IconPoints/>
                            <PlainText
                                marginLeft= {10}
                                title={"5"}
                                color={WARNA_UTAMA}
                                fontSize= {14}
                                fontStyle={"bold"}
                            />
                             <PlainText
                                title={" poin"}
                                color={WARNA_UTAMA}
                                fontSize= {14}
                                fontStyle={"bold"}
                            />
                            <IconCaretDown style={{marginLeft:10}} fill={WARNA_UTAMA} width={12} height={12} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}}>
                           
                            <PlainText
                                marginLeft= {10}
                                title={"Pilih Kategori"}
                                color={"#000"}
                                fontSize= {14}
                                fontStyle={"bold"}
                            />
                            <IconCaretDown style={{marginLeft:10}} fill={'#000'} width={12} height={12} />
                        </TouchableOpacity>
                        
                        
                    

                    </View>
                    <View style={styles.bodyContent}>
                        <View style={{padding:20, backgroundColor : WARNA_UTAMA, borderTopEndRadius:20, borderTopStartRadius:20}}>
                            <PlainText
                                    title={"Tulis pertanyaan kamu"}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                />
                        </View>
                        <TextInput
                            numberOfLines={20}
                            style={styles.inputContainer}
                            multiline = {true}
                        />
                    </View>
                    <View style={styles.bodyContent}>
                        
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateQuestion

const styles = StyleSheet.create({
    content : {
       
        flexDirection : 'column',
        margin : windowWidth * 0.05

    },
    container: {
        flex: 1,
        backgroundColor : '#FAFAFA',
    },
    headerContent : {
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : windowWidth * 0.9,
        padding : windowWidth * 0.05,
        borderRadius    : 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    bodyContent :{
        marginTop : 20,
        backgroundColor : '#fff',
        flexDirection : 'column',
        justifyContent : 'space-between',
        width : windowWidth * 0.9,
        borderRadius    : 20,
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
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        
        borderRadius: 20,
        backgroundColor: "transparent",
        textAlignVertical: 'top',
        padding: 20
    },
})
