import React,  { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,SafeAreaView, FlatList,
  
  TouchableHighlight, TextInput, Alert,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import axios from 'axios'
import BottomSheet from 'reanimated-bottom-sheet';
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, ButtonPrimary,AnswerCard,  QuestionCard, LoadingIndicator} from '../../components/';
import {WARNA_WARNING, WARNA_UTAMA, WARNA_SUCCESS, WARNA_ABU_ABU, OpenSans, BASE_URL_API, BASE_URL_IMG} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import FastImage from 'react-native-fast-image'

import ImagePicker,{showImagePicker,launchCamera, launchImageLibrary} from 'react-native-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -56
import validate from '../../utils/validate'
import Snackbar from 'react-native-snackbar';
import { SliderBox } from "react-native-image-slider-box";
const DetailQuestion = ({route, navigation}) => {
    
    const { token,data } = useSelector (state => state.authReducers);
    const [solved, setSolved] = useState(true);
    const [modalKategori, setModalKategori] = useState(false);
    const [modalUnlock, setModalUnlock] = useState(false);
    const [modalGambar, setModalGambar] = useState(false)
    const [modalType, setModalType] = useState(false)
    
    const {isSolved, id_question} = route.params;
    const [isLoading, setLoading] = useState(false)

    const [dataQuestion, setDataQuestion] = useState([])
    const [dataAnswer, setDataAnswer] = useState([])
    const [reference, setReference] = useState(null)
    const [referenceError, setReferenceError] = useState("first")
    const [type_reference, setTypeReference] = useState({'id': 'url','name': 'URL'})
    const [content, setContent] = useState("")
    const listType = [{'id': 'url','name': 'URL'}, {'id':'document description',"name" : "Notes"}]
    const [refresh , setRefresh] = useState(0)
    const [filePath, setFilePath] = useState(null)
    const [fileData, setFileData] = useState(null)
    const [fileUri, setFileUri] = useState(null)
    const [sourceImg, setSourceImg] = useState(null)
    const [idAnswer, setIdAnswer] = useState("")
    const [indexSelectedImg, setIndexSelectedImg] = useState(0)
    const [questionImages, setQuestionImages] = useState([])
    


    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));

    useEffect(() => {
        getDataQuestion()
    }, [refresh])
    useEffect(() => {
        getDataQuestion()
    }, [])

    const constraints = {
        yourInput: {
            url: true,
            presence: {allowEmpty: false}
        },
        note : {
            presence: {allowEmpty: false}
        },
      }
      
      
      const validator = (field, value) => {
        // Creates an object based on the field name and field value
        // e.g. let object = {email: 'email@example.com'}
        let object = {}
        object[field] = value
      
        let constraint = constraints[field]
        // console.log(object, constraint)
      
        // Validate against the constraint and hold the error messages
        const result = validate(object, { [field]: constraint })
        console.log(result)
      
        // If there is an error message, return it!
        if (result) {
          // Return only the field error message if there are multiple
          return result[field][0]
        }
      
        return null
      }

    const GambarModal = ()=>{
        return (
            <Modal
                visible={modalGambar}
                onTouchOutside={() => { setModalGambar(false)}}
            >
                <ModalContent >
                    
                <TouchableOpacity style={{ background:'#000000'}}
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
                    <View style={{ width:windowWidth, height:windowHeight- 100, alignItems:'center'}}>
                    
                    <FastImage 
                            source={ sourceImg
                            }
                            style={{width : windowWidth, height: windowHeight- 100}} 
                            resizeMode={FastImage.resizeMode.contain}
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
    const TypeModal = ()=>{
        return (
            <Modal
                visible={modalType}
                onTouchOutside={() => { setModalType(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.4}
                        data={listType}
                        keyExtractor={(item) => item.name.toString()}
                        renderItem={renderType}
                        showsHorizontalScrollIndicator={false}
                        />
                        
                    </SafeAreaView>
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }
    const renderType = ({item}) => {
        return (
            <View>
            
                <TouchableOpacity style={{padding:10, alignItems:'center'}}
                    onPress={() => {
                        setTypeReference(item);
                        setModalType(false)
                    }}
                >
                    <PlainText
                        title={item.name}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            
            </View>
           
        )
    }

    const updateAnswer = async () =>{
        var referenceError = null
        if(type_reference.id == "url"){
            referenceError = validator('yourInput', reference)
        }else{
            referenceError = validator('note', reference)
        }

        if(content == ""){
            Snackbar.show({
                text: "Jawaban tidak boleh kosong",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            return;
        }
        
        
        if(referenceError != null){
            setReferenceError(referenceError)
            return;
        }

        setLoading(true)
        sheetRef.current.snapTo(2)
        
       
        
       

        var formdata = new FormData()
        
        formdata.append('id_answer', idAnswer)
        formdata.append('answr', content)
        formdata.append('refrens', reference)
        formdata.append('type_refrens', type_reference.id)

        axios.post (BASE_URL_API+'edit_answer',
        formdata,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            
            Snackbar.show({
                text: "Berhasil memperbarui jawaban",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
           
            setRefresh(refresh+1)
            setLoading(false)
        }).catch(function(error){
            Snackbar.show({
                text: "Gagal memperbarui jawaban",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            setLoading(false)
            setRefresh(refresh+1)
            
            
            console.error(error.response.status)
        })
    }

    const addAnswer = async () => {
        var referenceError = null
        if(type_reference.id == "url"){
            referenceError = validator('yourInput', reference)
        }else{
            referenceError = validator('note', reference)
        }

        if(content == ""){
            Snackbar.show({
                text: "Jawaban tidak boleh kosong",
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'Ok',
                    textColor: WARNA_UTAMA,
                    onPress: () => { /* Do something. */ },
                },  
                });
            return;
        }
        
        
        if(referenceError != null){
            setReferenceError(referenceError)
            return;
        }

        setLoading(true)
        sheetRef.current.snapTo(2)
        
       
        
       

        var formdata = new FormData()
        if (filePath != null){
            formdata.append('file', {
                uri: filePath.uri,
                type: filePath.type,
                name: filePath.fileName,
            });
        }
        formdata.append('id_question', id_question)
        formdata.append('answer', content)
        formdata.append('reference', reference)
        formdata.append('type_reference', type_reference.id)

        axios.post (BASE_URL_API+'create_answer',
        formdata,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            
           
            setRefresh(refresh+1)
            setLoading(false)
        }).catch(function(error){
            setLoading(false)
            setRefresh(refresh+1)
            
            
            console.error(error.response.status)
        })
    }

    const unlockProcess = async () =>{
        setLoading(true)
        var data = new FormData()
        data.append('id_question', id_question)

        axios.post (BASE_URL_API+'unlock_question',
        data,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            
            
            updateProf(token).then( () =>{
                setRefresh(refresh+1)
                setLoading(false)
                

            })
        }).catch(function(error){
            updateProf(token).then( () =>{
                setRefresh(refresh+1)
                setLoading(false)
                
            })
            
        })
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
            // console.log("file ",{'uri': Platform.OS === "android" ? response.uri.replace("content://", "file://") : response.uri.replace("file://", ""), 'type': response.type,'name': response.fileName})
            
            
            setSourceImg(source)
            // console.log(response)
            setFilePath(response)
            setFileData({'uri': Platform.OS === "android" ? response.uri.replace("content://", "file://") : response.uri.replace("file://", "") , 'type': response.type,'name': response.fileName})
            setFileUri(response.uri)
            
          }
        });
    
      }

    const UnlockModal = ()=>{
        return (
            <Modal
                visible={modalUnlock}
                onTouchOutside={() => { setModalUnlock(false)}}
            >
                <ModalContent style={{width: windowWidth *0.8}}>
                        <PlainText
                            title={"Anda yakin membuka jawaban ini?"}
                            color={"#000"}
                            fontStyle={"bold"}
                            fontSize = {16}
                            textAlign={"center"}
                        />
                        <PlainText
                            title={"Membuka jawaban ini akan menghabiskan 30 point anda "}
                            color={"#000"}
                            fontSize = {14}
                            textAlign={"center"}
                        />
                       
                        <View style={{alignItems:'center'}}>
                            <ButtonPrimary  
                                onPress={() => {
                                    setModalUnlock(false)
                                    unlockProcess()
                                    
                                }}
                                title="Lanjutkan"
                                width={windowWidth*0.6}
                                marginTop   = {windowHeight * 0.033}
                            />
                        </View>
                </ModalContent>
            </Modal>
        )
    }
   

    const getDataQuestion = async () =>{
        setLoading(true)
        var data = new FormData()
        data.append('id_question' , id_question)
        axios.post(BASE_URL_API+'detail_question',
        data,
        {
            headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : "Bearer "+token
            }  
        })
            .then(function (response) {
                if (response.data){
                    setDataQuestion(response.data.Question)
                    setDataAnswer(response.data.Sub_Question)
                    setQuestionImages(response.data.Question.File_Question.map(sweetItem => {
                        return BASE_URL_IMG + sweetItem
                    }))
                    
                    
                }else{
                    setDataQuestion(null)
                    console.info("Unable to fetch data from API")
                    console.log(listQuestion)
                }
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
            });
    }

    const renderAnswer = ({item}) =>{
        var jum_commentar = 0; 
        console.log(item[1].map(data=>{
            if(data.comment == "comment_is_null"){
                jum_commentar = "No"
            }else{
                jum_commentar = item[1].length
            }
            
        }))
        console.log("ini data item +"+ JSON.stringify(item[0].answer))
        
        return (
            <AnswerCard
                is_lock ={false}
                name = {item[0].answer.First_Name_Answer + " "+item[0].answer.Last_Name_Answer}
                time = {item[0].answer.Date_Answer}
                isRelevant={item[0].Is_Relevant}
                like = {item[0].answer.Total_Like}
                is_like = {item[0].answer.Status_User_Like}
                commentar={jum_commentar}
                onPress={() => navigation.navigate("Commentar", {listCommentar : item[1], id_answer : item[0].answer.Id_Answer, isSolved, id_question})}
                question={item[0].answer.Answer}
                id_answer = {item[0].answer.Id_Answer}
                is_me = {item[0].answer.Status_User_Answer}
                img= {item[0].answer.Image_Answer}
                typeFile= {item[0].answer.Type_File}
                type_reference = {item[0].answer.Type_Reference}
                reference={item[0].answer.Reference}
                picture = {item[0].answer.Photo_User_Answer}
                onEditAnswer = {() => {
                    sheetRef.current.snapTo(1)
                    setIdAnswer(item[0].answer.Id_Answer)
                    setContent(item[0].answer.Answer)
                    setReference(item[0].answer.Reference)
                    if(item[0].answer.Type_Reference == "url"){
                        setTypeReference({'id': 'url','name': 'URL'})
                    }else{
                        setTypeReference({'id':'document description',"name" : "Notes"})
                    }
                } }
                is_solved = {dataQuestion.Solved_Question}
                
            />
        )
    }
    const renderAnswerLock = ({item}) =>{
        var jum_commentar = 0; 
        console.log(item[1].map(data=>{
            if(data.comment == "comment_is_null"){
                jum_commentar = "No"
            }else{
                jum_commentar = item[1].length
            }
            
        }))
        
        return (
            <AnswerCard
                is_lock = {true}
                is_me = {item[0].answer.Status_User_Answer}
                name = {item[0].answer.First_Name_Answer + " "+item[0].answer.Last_Name_Answer}
                time = {item[0].answer.Date_Answer}
                isRelevant={item[0].Is_Relevant}
                like = {item[0].answer.Total_Like}
                is_like = {item[0].answer.Status_User_Like}
                commentar={jum_commentar}
                onPress={() => setModalUnlock(true)}
                question={item[0].answer.Answer}
                id_answer = {item[0].answer.Id_Answer}
                picture = {item[0].answer.Photo_User_Answer}
            />
        )
    }

    const renderContent = () => (
        <View
          style={{
            
            backgroundColor: "#fff",
            padding: 16,
            height: "100%",
            borderTopEndRadius:20,
            borderTopStartRadius:20,
            
        }}
        >   
        <ScrollView>
            <View style={{alignItems:'center'}}>
            <View style={{width:50, height:3, backgroundColor:WARNA_UTAMA}}/>
            </View>
            {sourceImg != null &&
                                <TouchableOpacity onPress={()=> setModalGambar(true)}>
                                <FastImage
                                    style={{  width: windowWidth, height: 200, marginLeft :-20, marginBottom:20, marginTop:-20 }}
                                    source={sourceImg}
                                />
                                </TouchableOpacity>
                            }
                    <View style={styles.bodyContent}>
                    
                        <View style={{padding:20, backgroundColor : WARNA_UTAMA, borderTopEndRadius:10, borderTopStartRadius:10}}>
                            <PlainText
                                    title={"Tulis jawaban kamu"}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                    
                                />
                        </View>
                        <TextInput
                            numberOfLines={5}
                            style={styles.inputContainer}
                            multiline = {true}
                            onChangeText= {(text) => setContent(text)}
                            value={content}
                        />
                    </View>
                    
                    <View style={styles.bodyContent}>
                    
                        <View style={{padding:20, backgroundColor : WARNA_UTAMA, borderTopEndRadius:10, borderTopStartRadius:10, flexDirection:'row',
                        justifyContent:"space-between"}}>
                            <PlainText
                                    title={"Referensi Jawaban "}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                    
                                />
                                <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=> setModalType(true)}>
                                    
                                    <PlainText
                                        marginLeft= {10}
                                        title={type_reference.name}
                                        color={"#000"}
                                        fontSize= {14}
                                        fontStyle={"bold"}
                                    />
                                    
                                    <IconCaretDown style={{marginLeft:10}} fill={"#000"} width={12} height={12} />
                                </TouchableOpacity>
                        </View>
                        
                        <TextInput
                            numberOfLines={1}
                            style={{ flexDirection: "row",
                                    width: "100%",
                                    borderRadius: 10,
                                    backgroundColor: "transparent",
                                    textAlignVertical: 'top',
                                    padding: 20}}
                            multiline = {false}
                            onChangeText= {(text) => setReference(text)}
                            value={reference}
                        />
                        {referenceError != null && referenceError != "first" &&
                                <View style={{
                                    borderTopColor:WARNA_ABU_ABU,
                                    padding:10,
                                    borderTopWidth:1,
                                    alignItems:'center'
                                    
                                }}>
                                <PlainText
                                    title={referenceError}
                                    color={WARNA_WARNING}
                                    fontSize= {11}
                                />   
                                </View>
                        }
                    </View>

                    <View style={styles.footerContent}>
                        {idAnswer == "" &&
                        <TouchableOpacity onPress={()=> _launchCamera()}>
                        <IconPicture fill={'#000'} width={24} height={24}/>
                        </TouchableOpacity>
                        }
                        
                        
                        
                        <TouchableOpacity
                                style={styles.btn}
                                onPress= {()=> {
                                    if(idAnswer == ""){
                                        addAnswer()
                                    }else{
                                        updateAnswer()
                                    }
                                    
                                    }}
                            >
                            <PlainText
                                    title={"Send"}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                />
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
        </View>
      );
    
    const sheetRef = React.useRef(null);
    

    return (
        <View style={styles.container}> 
        
            <TypeModal/>
            <GambarModal/>
            <UnlockModal/>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading &&
                <View>
                
                
                
                <View style={{height:'100%', paddingBottom:80}}>
                   
                    <ScrollView showsVerticalScrollIndicator={false} >
                    
                   
                        <View style={{paddingHorizontal : windowWidth *0.05}}>
                        <QuestionCard
                            name = {dataQuestion.First_Name_Question + " " + dataQuestion.Last_Name_Question}
                            category = {dataQuestion.Sub_Kategori_Question}
                            time = {dataQuestion.Date_Question}
                            point = {dataQuestion.Point_Question}
                            isSolved={dataQuestion.Solved_Question}
                            question={dataQuestion.Content_Question}
                            answer = {dataAnswer.length}
                            picture = {dataQuestion.Photo_User_Question}
                            img = {dataQuestion.File_Question}
                            typeFile = {dataQuestion.File_Type_Question}
                        />

                        <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
                            <PlainText
                                title={"Answer"}
                                color={"#000"}
                                fontStyle={"bold"}
                                fontSize = {14}
                            />
                            
                        </View>

                        { dataQuestion.Status_Question_User_key != "False" &&
                            <SafeAreaView style={{flex :1}}
                            >
                                
                                <FlatList
                                data={dataAnswer}
                                // keyExtractor={(item) => item[0].answer_0.id_Question.toString()}
                                renderItem={renderAnswer}
                                showsVerticalScrollIndicator={false}
                                />
                                
                                
                            </SafeAreaView>
                        }
                        { dataQuestion.Status_Question_User_key == "False" &&
                            <SafeAreaView style={{flex :1}}
                            >
                                
                                <FlatList
                                data={dataAnswer}
                                // keyExtractor={(item) => item[0].answer_0.id_Question.toString()}
                                renderItem={renderAnswerLock}
                                showsVerticalScrollIndicator={false}
                                />
                                
                                
                            </SafeAreaView>
                        }
                        </View>
                       
                    </ScrollView>
                    
                    
                </View>

                
                
              
               
                
                
                
                </View>
            }
            { dataQuestion.Status_Question_User_key == "False" &&
                <TouchableOpacity
                    onPress={() => setModalUnlock(true)}
                    style={{height: 70, width:'100%', backgroundColor:WARNA_UTAMA, alignItems:'center', justifyContent:'center', alignContent:'center',
                                position: 'absolute', 
                                bottom: 0, }}>
                    <PlainText
                        title={"Unlock"}
                        color={"#000"}
                        fontStyle={"bold"}
                        fontSize = {16}
                    />
                        <PlainText
                        title={"menggunakan 3 point"}
                        color={"#000"}
                        
                        fontSize = {14}
                    />
                
                </TouchableOpacity>
            }
                    { isSolved == "0" && dataQuestion.Status_Question_User_Answer == "False" &&
                    
                        <TouchableOpacity
                                onPress={() => sheetRef.current.snapTo(0)}
                                style={{height: 70,
                                width:"100%",
                                backgroundColor:WARNA_UTAMA, 
                                alignItems:'center', 
                                justifyContent:'center', 
                                position: 'absolute', 
                                bottom: 0, }}>
                                <PlainText
                                    title={"Answer"}
                                    color={"#000"}
                                    fontStyle={"bold"}
                                    fontSize = {14}
                                />
                            
                            </TouchableOpacity>
                            
                        
                    }
                    { isSolved == "0" && dataQuestion.Status_Question_User_Answer == "True" &&
                    
                        <TouchableOpacity
                                style={{height: 70,
                                width:"100%",
                                backgroundColor:WARNA_UTAMA, 
                                alignItems:'center', 
                                justifyContent:'center', 
                                position: 'absolute', 
                                bottom: 0, }}>
                                <PlainText
                                    title={"Kamu telah menjawab pertanyaan ini"}
                                    color={"#000"}
                                    fontStyle={"bold"}
                                    fontSize = {14}
                                />
                            
                            </TouchableOpacity>
                            
                        
                    }
                    { isSolved == "1"  &&
                        <View style={{height: 80,width:'100%', backgroundColor:WARNA_UTAMA, alignItems:'center', justifyContent:'center',
                            position: 'absolute', 
                        bottom: 0,}}>
                            <PlainText
                                title={"Pertanyaan dan Jawaban"}
                                color={"#fff"}
                                fontStyle={"bold"}
                                fontSize = {14}
                            />
                            <PlainText
                                title={"Sedang di review oleh "}
                                color={"#fff"}
                                fontSize = {11}
                            />
                            <PlainText
                                title={"Admin"}
                                color={"#fff"}
                                fontSize = {11}
                            />
                        </View>
                    }
                    { isSolved == "2"  &&
                                <View style={{height: 80,width:'100%', backgroundColor:WARNA_SUCCESS, alignItems:'center', justifyContent:'center',
                                 position: 'absolute', 
                                bottom: 0,}}>
                                    <PlainText
                                        title={"Question Solved"}
                                        color={"#fff"}
                                        fontStyle={"bold"}
                                        fontSize = {14}
                                    />
                                    <PlainText
                                        title={"Jawaban relevan "}
                                        color={"#fff"}
                                        fontSize = {11}
                                    />
                                    <PlainText
                                        title={"adalah jawaban yang ada tanda centang"}
                                        color={"#fff"}
                                        fontSize = {11}
                                    />
                                </View>
                            }
                    
                    <BottomSheet
                        ref={sheetRef}
                        snapPoints={['93%', "93%", 0]}
                        initialSnap={2}
                        borderRadius={10}
                        renderContent={renderContent}
                    />
           
        </View>
        
    )
}

export default DetailQuestion

const styles = StyleSheet.create({
    
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-end',
      },
    content : {
       backgroundColor:'#ffffff',
       
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
        height:200,
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
