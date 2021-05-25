import React, {useEffect, useState, useRef}  from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,FlatList,
    TextInput,SafeAreaView,TouchableWithoutFeedback ,
    Dimensions, StatusBar, TouchableOpacity, TouchableHighlight
    
} from 'react-native';

import Tooltip from 'react-native-walkthrough-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, ButtonPrimary, LoadingIndicator} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_WARNING, BASE_URL_IMG, BASE_URL_API} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { updateProfile } from '../../redux/actions';
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import ImagePicker,{showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';



const CreateQuestion = ({navigation}) => {

    const { token, data } = useSelector (state => state.authReducers);
    const [modalKategori, setModalKategori] = useState(false)
    const [modalPoint, setModalPoint] = useState(false)
    const points = [{id:'110', name:'110'}, {id:'130', name:'130'} , {id:'150', name:'150'} ]
    const [selectedPoint, setSelectedPoint] = useState('110')
    const [listKategori, setListKategori] = useState([])
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [selectedKategoriName, setSelectedKategoriName] = useState('Pilih Kategori')
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));
    const [isLoading, setLoading] = useState(false)
    const [filePath, setFilePath] = useState(null)
    const [fileData, setFileData] = useState(null)
    const [fileUri, setFileUri] = useState(null)
    const [sourceImg, setSourceImg] = useState(null)
    const [content, setContent] = useState("")
    const [modalGambar, setModalGambar] = useState(false)
    const [toolTipVisible, setTooltipVisible] = useState(false)
    const [toolTipVisibleHitam, setTooltipVisibleHitam] = useState(false)
    const addQuestion = async () => {
        if(selectedKategoriName == "Pilih Kategori"){
            Snackbar.show({
                text: "Silahkan pilih kategori",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            return;
        }
        if(content == ""){
            Snackbar.show({
                text: "Pertanyaan tidak boleh kosong",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            return;
        }
        setLoading(true)
        
        var formData = new FormData();
        if (filePath != null){
            let array = {
                uri: filePath.uri,
                type: filePath.type,
                name: "Photo_React_Native",
            }
            formData.append('file', array);
        }
        
        formData.append('content', content)
        formData.append('id_category',data[2].category_id )
        formData.append('id_sub_category', selectedKategori)
        formData.append('point', selectedPoint)
        
        var postData = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                "Content-Type" :'multipart/form-data',
                "Authorization" : 'Bearer '+token
            },
            body: formData,
        }
        return fetch(BASE_URL_API+"create_question", postData)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
                    updateProf(token).then(()=> navigation.replace("MainApp"))
                    setLoading(false)

        })
        .catch((error) => {
            
            setLoading(false)
            console.error(JSON.stringify(error))

        });
       
    }

    useEffect(() => {
       getCategory()
    }, [])

    const GambarModal = ()=>{
        return (
            <Modal
                visible={modalGambar}
                onTouchOutside={() => { setModalGambar(false)}}
            >
                <ModalContent >
                    
                <TouchableOpacity 
                    onPress={()=>setModalGambar(false)}
                >
                                <PlainText
                                    title={"x"}
                                    color={"#000"}
                                    fontSize= {20}
                                    marginTop={20}
                                    marginLeft={20}
                                    fontStyle={"bold"}
                                    
                                />
                </TouchableOpacity>
                    <View style={{ width:windowWidth, height:windowHeight *0.8, alignItems:'center'}}>
                        <FastImage
                            style={{width : windowWidth, height: windowHeight *0.7}} 
                            resizeMode={FastImage.resizeMode.contain}
                            source={sourceImg}
                        />
                   
                            
                    </View>
                    <TouchableOpacity style={{ alignItems:'center', alignContent:'center'}}
                    onPress={()=>{
                        setSourceImg(null)
                        
                        setFilePath(null)
                        setModalGambar(false)
                    }}
                        >
                                <View style={{backgroundColor:WARNA_WARNING, paddingHorizontal:20, paddingVertical:10, borderRadius : 20,}}>
                                <PlainText
                                    title={"Delete"}
                                    color={"#fff"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                    
                                />
                                </View>
                                
                </TouchableOpacity>
                    
                </ModalContent>
            </Modal>
        )
    }

    const _launchCamera = () => {
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
            
            
            setSourceImg(source)
            console.log(response)
            setFilePath(response)
            setFileData({'uri': Platform.OS === "android" ? response.uri.replace("content://", "file://") : response.uri.replace("file://", "") , 'type': response.type,'name': response.fileName})
            setFileUri(response.uri)
            
          }
        });
    
      }

    const getCategory = async () =>{
        setLoading(true)

        axios.get(BASE_URL_API+'sub_category', {
            headers: {
                "Authorization" : "Bearer " + token 
            }
        }).then(function (response){
            setListKategori(response.data.Sub_Kategori)
            setLoading(false)
        }).catch(function (error){
            setListKategori(null)
            console.error(error)
            setLoading(false)
        })

    }

    const RenderPoint = ({item}) => {
        const isSelected = item.id == selectedPoint ? true: false;
        return (
            <View>
            {isSelected &&
                <TouchableOpacity style={{backgroundColor:WARNA_UTAMA,padding:10, alignItems:'center', borderRadius:15}}
                    
                >
                    <PlainText
                        title={item.name}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }
            {!isSelected &&
                <TouchableOpacity style={{padding:10, alignItems:'center'}}
                    onPress={() => {
                        setSelectedPoint(item.id);
                        setModalPoint(false)
                    }}
                >
                    <PlainText
                        title={item.name}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }
            </View>
           
        )
    }

    const RenderKategori = ({item}) => {
        const isSelected = item.id == selectedKategori ? true: false;
        return (
            <View>
            {isSelected &&
                <TouchableOpacity style={{backgroundColor:WARNA_UTAMA,padding:10, alignItems:'center', borderRadius:15}}
                    
                >
                    <PlainText
                        title={item.name}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }
            {!isSelected &&
                <TouchableOpacity style={{padding:10, alignItems:'center'}}
                    onPress={() => {
                        setSelectedKategori(item.id);
                        setSelectedKategoriName(item.name)
                        setModalKategori(false)
                    }}
                >
                    <PlainText
                        title={item.name}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }
            </View>
           
        )
    }

    const KategoriModal = ()=>{
        return (
            <Modal
                visible={modalKategori}
                onTouchOutside={() => { setModalKategori(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                        
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.4}
                        data={listKategori}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderKategori}
                        showsHorizontalScrollIndicator={false}
                        extraData={selectedKategori}
                        />
                        
                    </SafeAreaView>
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
                    <SafeAreaView style={{marginTop:10, flexDirection : 'column', paddingBottom : 5,height:270, alignItems:'center'}}>
                        <Tooltip
                        isVisible={toolTipVisibleHitam}
                        content={
                            <PlainText
                                title={"Kamu akan mengeluarkan poin setiap membuat pertanyaan, ketika kamu menemukan jawaban yang sesuai,"+
                                " penjawab akan mendapatkan poin yang telah kamu keluarkan.  "+
                                "\nBerikut rinciannya : \n"+
                                "1. 110 poin untuk jawaban yang mudah, penjawab akan mendapatkan 85 poin\n"+
                                "2. 130 poin untuk jawaban yang menengah, penjawab akan mendapatkan 105 poin\n"+
                                "3. 150 poin untuk jawaban yang susah, penjawab akan mendapatkan 125 poin\n"}
                                color={"#000"}
                                fontSize= {13}
                            />
                        }
                        placement="bottom"
                        onClose={() => setTooltipVisibleHitam(false)}
                        >
                    
                            <TouchableOpacity style={{backgroundColor:'#000', alignItems:'center', marginBottom:20, 
                            borderRadius:50, paddingHorizontal:20,}} onPress={()=> setTooltipVisibleHitam(true)}>
                                <PlainText
                                    title={"?"}
                                    color={"#fff"}
                                    fontSize= {20}
                                    fontStyle={"bold"}
                                    textAlign={"center"}
                                />
                            </TouchableOpacity>
                            
                        </Tooltip>
                        <PlainText
                            title={"Jumlah point yang dikeluarkan untuk pertanyaan ini"}
                            color={"#000"}
                            fontSize= {14}
                            fontStyle={"bold"}
                            textAlign={"center"}
                            marginBottom={20}
                        />
                        
                        <FlatList
                        data={points}
                        width={windowWidth*0.45}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={RenderPoint}
                        showsHorizontalScrollIndicator={false}
                        extraData={selectedPoint}
                        />
                        
                    </SafeAreaView>
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }
    return (
        <View style={styles.container}>
            
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading &&
                
                <View style={styles.container}> 
                    <GambarModal/>
                    <KategoriModal/>
                    <PointModal/>
                    <View>
                        <StatusBar translucent 
                        backgroundColor={WARNA_UTAMA} 
                        barStyle="dark-content" />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.content}>
                       
                            {sourceImg != null &&
                                <TouchableOpacity onPress={()=> setModalGambar(true)}>
                                <FastImage
                                    style={{  width: windowWidth, height: 200, marginLeft :-20, marginBottom:20, marginTop:-20 }}
                                    source={sourceImg}
                                />
                                </TouchableOpacity>
                            }
                            <View style={styles.headerContent}>
                                    <Tooltip
                                        isVisible={toolTipVisible}
                                        content={
                                            <PlainText
                                                title={"Kamu akan mengeluarkan poin setiap membuat pertanyaan, ketika kamu menemukan jawaban yang sesuai,"+
                                                " penjawab akan mendapatkan poin yang telah kamu keluarkan.  "+
                                                "\nBerikut rinciannya : \n"+
                                                "1. 110 poin untuk jawaban yang mudah, penjawab akan mendapatkan 85 poin\n"+
                                                "2. 130 poin untuk jawaban yang menengah, penjawab akan mendapatkan 105 poin\n"+
                                                "3. 150 poin untuk jawaban yang susah, penjawab akan mendapatkan 125 poin\n"}
                                                color={"#000"}
                                                fontSize= {13}
                                            />
                                        }
                                        placement="bottom"
                                        onClose={() => setTooltipVisible(false)}
                                        >
                                    
                                            <TouchableOpacity style={{backgroundColor:WARNA_UTAMA, alignItems:'center', 
                                            borderRadius:50, paddingHorizontal:10,paddingVertical:3}} onPress={()=> setTooltipVisible(true)}>
                                                <PlainText
                                                    title={"?"}
                                                    color={"#fff"}
                                                    fontSize= {14}
                                                    fontStyle={"bold"}
                                                />
                                            </TouchableOpacity>
                                            
                                        </Tooltip>
                                <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=> setModalPoint(true)}>
                                    <IconPoints/>
                                    <PlainText
                                        marginLeft= {10}
                                        title={selectedPoint}
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
                                        title={selectedKategoriName}
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
                                    onChangeText= {(text) => setContent(text)}
                                    value={content}
                                />
                            </View>
                            <View>
                           
                            </View>
                            
                        </View>
                    </ScrollView>
                    <View style={styles.footerContent}>
                    
                       

                        <View style={{
                            width : windowWidth  ,
                            paddingHorizontal : windowWidth * 0.1,
                            backgroundColor : '#fff',
                            flexDirection : 'row',
                            justifyContent : 'space-between',
                            alignItems:'center',
                            alignContent:'center'
                            }}>
                            
                            
                            <TouchableOpacity 
                            onPress= {()=>_launchCamera()}>
                            <IconPicture fill={'#000'} width={24} height={24}/>
                            </TouchableOpacity>

                            
                                <TouchableOpacity
                                        style={styles.btn}
                                        onPress= {()=> addQuestion()}
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
                </View>
            }
           
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
        paddingHorizontal : windowWidth * 0.05,
        paddingVertical:20,
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
        marginBottom : 50
    },
    footerContent :{
        bottom:0,
        position: 'absolute', 
        
        backgroundColor : '#fff',
        flexDirection : 'column',
        alignContent:'center',
        alignItems:'center',
        width : windowWidth  ,
        paddingVertical : 10,
        paddingHorizontal:40
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
        width : '70%',
        alignItems:'center'
    }
})
