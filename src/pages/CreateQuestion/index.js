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

import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, ButtonPrimary} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateQuestion = () => {
    const [modalKategori, setModalKategori] = useState(false)
    const [modalPoint, setModalPoint] = useState(false)
    const KategoriModal = ()=>{
        return (
            <Modal
                visible={modalKategori}
                onTouchOutside={() => { setModalKategori(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }
    const PointModal = ()=>{
        return (
            <Modal
                visible={modalPoint}
                onTouchOutside={() => { setModalPoint(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                        <PlainText
                            title={"Pilih Kategori"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                        />
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            <KategoriModal/>
            <PointModal/>
             <View>
                <StatusBar translucent 
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=> setModalPoint(true)}>
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

                        <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=>setModalKategori(true)}>
                            
                           
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
                        <View style={{padding:20, backgroundColor : WARNA_UTAMA, borderTopEndRadius:10, borderTopStartRadius:10}}>
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
                    <View style={styles.footerContent}>
                        <IconFont  fill={'#000'} width={24} height={24}/>
                        <IconDerajat fill={'#000'} width={24} height={24}/>
                        <IconPicture fill={'#000'} width={24} height={24}/>
                        <TouchableOpacity
                                style={styles.btn}
                            >
                            <PlainText
                                    title={"Send"}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                />
                        </TouchableOpacity>
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
        borderRadius    : 10,
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
    btn :{
        backgroundColor: WARNA_UTAMA,
        borderRadius : 10,
        padding : 10,
        width : '40%',
        alignItems:'center'
    }
})
