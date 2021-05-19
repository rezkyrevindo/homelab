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

import { useSelector, useDispatch } from 'react-redux';
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, ButtonPrimary, LoadingIndicator} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, BASE_URL_IMG, BASE_URL_API} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { updateProfile } from '../../redux/actions';
import axios from 'axios'
import FastImage from 'react-native-fast-image'
import ImagePicker,{showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

import MathText from 'react-native-math';


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
    const [isText, setIsText] = useState(true)
    const [formula, setFormula] = useState("")
    const [formulaSelection, setFormulaSelection]= useState({start: 0, end: 0})
    const formulaRef = useRef(null);
    const listKeyboard_1 = [
        {value: '(', type:'char', output:'('},
        {value: ')', type:'char', output:')'},
        {value: '7', type:'char', output:'7'},
        {value: '8', type:'char', output:'8'},
        {value: '9', type:'char', output:'9'},
        {value: '+', type:'char', output:'+'},
        {value: 'x', type:'char', output:'x'},
        {value: 'y', type:'char', output:'y'},
        {value: '4', type:'char', output:'4'},
        {value: '5', type:'char', output:'5'},
        {value: '6', type:'char', output:'6'},
        {value: '-', type:'char', output:'-'},
        {value: 'x2', type:'char', output:'{?}^{2}'},
        {value: 'xx', type:'char', output:'{?}^{?}'},
        {value: '1', type:'char', output:'1'},
        {value: '2', type:'char', output:'2'},
        {value: '3', type:'char', output:'3'},
        {value: 'X', type:'char', output:`\\times `},
        {value: 'x/y', type:'char', output:`\\frac{?}{?}`},
        {value: 'xXx/y', type:'char', output:'?\\times \\frac{?}{?}'},
        {value: '0', type:'char', output:'0'},
        {value: '.', type:'char', output:'.'},
        {value: '=', type:'char', output:'='},
        {value: '/', type:'char', output:'\\div '},
        {value: '^', type:'char', output:'\\sqrt{?}'},
        {value: 'akar^', type:'char', output:'\\sqrt[?]{?}'},
        {value: '|x|', type:'char', output:'|?|'},
        {value: '<', type:'char', output:'<'},
        {value: '>', type:'char', output:'>'},
        {value: 'B', type:'char', output:' \\\\ '},
        {value: '123', type:'nav', output:'123'},
        {value: 'pi', type:'nav', output:'pi'},
        {value: 'abc', type:'nav', output:'abc'},
        {value: '<=', type:'char', output:'\\leqslant'},
        {value: '>=', type:'char', output:'\\geqslant'},
        {value: 'D', type:'char', output:'D'},
    ]
    

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
            formData.append('file', {
                uri: filePath.uri,
                type: filePath.type,
                name: "Photo_React_Native",
            });
        }
        if(formula != ""){
            let new_content = `<u>Formula</u> <br><p><span class='latexEle' data-latex='${formula}'></span></p>`+""+content
            formData.append('content', new_content)
        }else{
            formData.append('content', content)
        }
        
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
            console.error(error)

        });
       
    }

    useEffect(() => {
       getCategory()
    }, [])

    const addFormula = () =>{

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
        launchCamera(options, (response) => {
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
                                <View style={{alignItems : 'center'}}>
                                {data[2].picture != null &&
                                    <FastImage source={{uri: BASE_URL_IMG+data[2].picture}} style={{width : 60, height: 60, borderRadius:100}}  />
                                }
                                {data[2].picture == null &&
                                    <FastImage source={DefaultProfile} style={{width : 60, height: 60}}  />
                                }
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
                                { formula != "" &&
                                    <View style={{width:windowWidth *0.9 , marginBottom:10,
                                    padding:10,
                                    borderBottomWidth:1,borderColor:'#dadada', alignContent:'center',}}>
                                        <MathText
                                        value={`<u>Formula</u> <br><p><span class='latexEle' data-latex='${formula}'></span></p>`}
                                        style={{ height:100, alignItems: "center", justifyContent: "center" }}
                                        textSize={15}
                                        textColor={"#000000"}
                                />
                                    </View>
                                    
                                }   
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
                                    style={{  width: windowWidth, height: 200, marginLeft :-20 }}
                                    source={sourceImg}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                }
                            </View>
                            
                        </View>
                    </ScrollView>
                    <View style={styles.footerContent}>
                    
                       

                        <View style={{
                            width : windowWidth  ,
                            paddingHorizontal : windowWidth * 0.05,
                            backgroundColor : '#fff',
                            flexDirection : 'row',
                            justifyContent : 'space-between',
                            alignItems:'center',
                            }}>
                            {isText &&
                                <TouchableOpacity onPress={()=>setIsText(true)}>
                                    <IconFont  fill={WARNA_UTAMA} width={18} height={18}/>
                                </TouchableOpacity>
                                    
                                
                            }
                            {isText &&
                                <TouchableOpacity onPress={()=>setIsText(false)}>
                                    <IconDerajat fill={'#000'} width={18} height={18}/>
                                    </TouchableOpacity>  
                            }
                            {!isText &&
                                <TouchableOpacity onPress={()=>setIsText(true)}>
                                    <IconFont  fill={"#000"} width={18} height={18}/>
                                    </TouchableOpacity>
                                
                            }
                            {!isText &&
                                <TouchableOpacity onPress={()=>setIsText(false)}>
                                    <IconDerajat fill={WARNA_UTAMA} width={18} height={18}/>
                                    </TouchableOpacity>  
                            }
                           
                           
                            
                            
                            <TouchableOpacity 
                            onPress= {()=>_launchCamera()}>
                            <IconPicture fill={'#000'} width={18} height={18}/>
                            </TouchableOpacity>

                            {isText &&
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
                            }
                            {!isText &&
                                <TouchableOpacity
                                        style={styles.btn}
                                        onPress= {()=> addFormula()}
                                    >
                                    <PlainText
                                            title={"Add Formula"}
                                            color={"#000"}
                                            fontSize= {14}
                                            fontStyle={"bold"}
                                        />
                                </TouchableOpacity>
                            }
                            
                        </View>
                        {!isText &&
                            <View style={{
                            width : windowWidth ,
                            height: windowHeight *0.4,
                            backgroundColor : '#dadada',
                            marginTop:10,
                            }}>
                            
                                <TextInput

                                        ref={formulaRef}
                                        style={{
                                            backgroundColor:"#fff",
                                            marginTop:10,
                                            marginHorizontal:10,
                                            borderRadius:10,
                                            height:windowHeight*0.4 * 0.14,
                                            paddingHorizontal:20,
                                            

                                        }}
                                        allowFontScalling={true}
                                        onChangeText= {(text) => setFormula(text)}
                                        value={formula}
                                        showSoftInputOnFocus= {false}
                                        onSelectionChange={({ nativeEvent: { selection } }) => {
                                            
                                            setFormulaSelection(selection)
                                            
                                        }}
                                        
                                    />
                                    <FlatList
                                        style={{marginTop:10, marginHorizontal : 5,}}
                                        data={ listKeyboard_1 }
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({item}) =>
                                            <TouchableHighlight  style={{
                                                
                                                    justifyContent: 'center',
                                                    flex:1,
                                                    alignItems: 'center',
                                                    height:windowHeight*0.4 * 0.1,
                                                    borderRadius:5,
                                                    margin: 5,
                                                    backgroundColor: '#fff'
                                            }}
                                            onPress={()=> {
                                                
                                                if(item.value =="D"){
                                                    let new_value = formula.substring(0, parseInt(formulaSelection.start)-1)  + formula.substring(formulaSelection.start)
                                                    setFormula(new_value)
                                                    
                                                    setFormulaSelection({start:parseInt(formulaSelection.start)-1, end : parseInt(formulaSelection.end)-1 })
                                                }else{
                                                    let new_value = formula.substring(0, formulaSelection.start) + item.output + formula.substring(formulaSelection.start)
                                                    setFormula(new_value)
                                                    
                                                    setFormulaSelection({start:parseInt(formulaSelection.start)+1, end : parseInt(formulaSelection.end)+1 })
                                                }
                                                }}
                                            >
                                                <Text style={{
                                                    color: '#000',
                                                    padding: 10,
                                                    fontSize: 12,
                                                    justifyContent: 'center',
                                                }} > {item.value} </Text>
                                            </TouchableHighlight>}
                                        numColumns={6}
                                        />
                            </View>
                        }
                        
                        
                        
                        
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
        marginBottom : 50
    },
    footerContent :{
        bottom:0,
        position: 'absolute', 
        
        backgroundColor : '#fff',
        flexDirection : 'column',
        alignContent:'center',
        alignItems:'center',
        width : windowWidth ,
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
