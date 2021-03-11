import React, {useEffect, useState}  from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,FlatList,
    TextInput,SafeAreaView,
    Dimensions, StatusBar, TouchableOpacity, 
    
  } from 'react-native';

  import { useSelector, useDispatch } from 'react-redux';
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, ButtonPrimary, LoadingIndicator} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { updateProfile } from '../../redux/actions';
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import ImagePicker,{showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';
const CreateQuestion = ({navigation}) => {
    const { token, data } = useSelector (state => state.authReducers);
    const [modalKategori, setModalKategori] = useState(false)
    const [modalPoint, setModalPoint] = useState(false)
    const points = [{'id':'25', 'name':'25'}, {'id':'20', 'name':'20'},{'id':'15', 'name':'15'}, {'id':'5', 'name':'5'}]
    const [selectedPoint, setSelectedPoint] = useState('5')
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

    const createFormData = (photo, body) => {
        const data = new FormData();
        if(photo != null){
            data.append("file", {
                name: photo.fileName,
                type: photo.type,
                uri:
                  Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
              });
        }
        
      
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
        
        console.log(JSON.stringify(data))

        return data;
      };

    const addQuestion = async () => {
        setLoading(true)
       
        

        axios.post('https://askhomelab.com/api/create_question',
            createFormData(filePath, {
                id_category : data[2].category_id,
                id_sub_category : selectedKategori,
                points  : selectedPoint,
                content : content
            }),
            {
                headers : {
                Accept : '*/*',
                "Content-Type" :'application/x-www-form-urlencoded',
                "Authorization" : 'Bearer '+token
                }  
            }, 
           
           
            
            )
            .then(function (response) {
                  
                console.log(response)
                updateProf(token).then(()=> navigation.replace("MainApp"))
                setLoading(false)  
                    
            }).catch(function (error) {
                setLoading(false)
                console.error(error.response)
                
            });
    }

    useEffect(() => {
       getCategory()
    }, [])

    const _launchCamera = () => {
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            maxHeight : 600,
            maxWidth : 600
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

        axios.get('https://askhomelab.com/api/sub_category', {
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
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.4}
                        data={points}
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
                
                <View>
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
                                <View style={{alignItems : 'center'}}>
                                    <Image source={DefaultProfile} style={{width : 60, height: 60}} />   
                                </View>
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
                            {sourceImg != null &&
                                <FastImage
                                style={{  width: 300, height: 300 }}
                                source={sourceImg}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            }
                            
                            </View>
                            <View style={styles.footerContent}>
                                <IconFont  fill={'#000'} width={24} height={24}/>
                                <IconDerajat fill={'#000'} width={24} height={24}/>
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
                    </ScrollView>
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
        paddingVertical:10,
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
