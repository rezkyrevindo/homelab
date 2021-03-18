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
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints} from '../../assets';
import {PlainText, HeaderText, ButtonPrimary,AnswerCard,  QuestionCard, LoadingIndicator} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height -56;

const DetailQuestion = ({route, navigation}) => {
    
    const { token,data } = useSelector (state => state.authReducers);
    const [solved, setSolved] = useState(true);
    const [modalKategori, setModalKategori] = useState(false);
    const [modalUnlock, setModalUnlock] = useState(false);
    
    const {isSolved, id_question} = route.params;
    const [isLoading, setLoading] = useState(false)

    const [dataQuestion, setDataQuestion] = useState([])
    const [dataAnswer, setDataAnswer] = useState([])
    const [reference, setReference] = useState(null)
    const [type_reference, setTypeReference] = useState(null)
    const [content, setContent] = useState("")
    const listType = [{'name': 'url'}, {"name" : "file"}, {"name" : "book"}]
    const [refresh , setRefresh] = useState(0)
    
    const dispatch = useDispatch();
    const updateProf = (token) => dispatch(updateProfile(token));

    useEffect(() => {
        getDataQuestion()
    }, [refresh])
    useEffect(() => {
        getDataQuestion()
    }, [])

    const addAnswer = async () => {
        setLoading(true)
        var data = new FormData()
        data.append('id_question', id_question)
        // data.append('img', img)
        data.append('answer', content)
        data.append('reference', reference)
        data.append('type_reference', "url")

        axios.post ('https://askhomelab.com/api/create_answer',
        data,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            
            getDataQuestion()
            console.log(response.data)
            setLoading(false)
        }).catch(function(error){
            setLoading(false)
            console.error(error.response.status)
        })
    }

    const unlockProcess = async () =>{
        setLoading(true)
        var data = new FormData()
        data.append('id_question', id_question)

        axios.post ('https://askhomelab.com/api/unlock_question',
        data,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            
            
            updateProf(token).then( () =>{
                setLoading(false)
                setRefresh(refresh+1)
            })
        }).catch(function(error){
            
            setLoading(false)
            setRefresh(refresh+1)
            console.error(error.response)
        })
    }

    const UnlockModal = ()=>{
        return (
            <Modal
                visible={modalUnlock}
                onTouchOutside={() => { setModalUnlock(false)}}
            >
                <ModalContent>
                        <PlainText
                            title={"Anda yakin membuka jawaban ini?"}
                            color={"#000"}
                            fontStyle={"bold"}
                            fontSize = {16}
                            textAlign={"center"}
                        />
                        <PlainText
                            title={"Membuka jawaban ini akan menghabiskan 3 point anda "}
                            color={"#000"}
                            fontSize = {14}
                            textAlign={"center"}
                        />
                       
                        <View style={{alignItems:'center'}}>
                            <ButtonPrimary  
                                onPress={() => {
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
    const TypeModal = ()=>{
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

    const getDataQuestion = async () =>{
        setLoading(true)
        var data = new FormData()
        data.append('id_question' , id_question)
        axios.post('https://askhomelab.com/api/detail_question',
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
                    console.log(dataAnswer)
                    
                }else{
                    setDataQuestion(null)
                    console.info("Unable to fetch data from API")
                    console.log(listQuestion)
                }
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error.response.status)
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
                name = {item[0].answer.First_Name_Answer + " "+item[0].answer.Last_Name_Answer}
                time = {item[0].answer.Date_Answer}
                isRelevant={item[0].Is_Relevant}
                like = {item[0].answer.Total_Like}
                is_like = {item[0].answer.Status_User_Like}
                commentar={jum_commentar}
                onPress={() => navigation.navigate("Commentar", {listCommentar : item[1], id_answer : item[0].answer.Id_Answer, isSolved, id_question})}
                question={item[0].answer.Answer}
                id_answer = {item[0].answer.Id_Answer}
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
            <View style={{alignItems:'center'}}>
            <View style={{width:50, height:3, backgroundColor:WARNA_UTAMA}}/>
            </View>
            
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
                            numberOfLines={20}
                            style={styles.inputContainer}
                            multiline = {true}
                            onChangeText= {(text) => setContent(text)}
                            value={content}
                        />
                    </View>
                    
                    <View style={styles.bodyContent}>
                    
                        <View style={{padding:20, backgroundColor : WARNA_UTAMA, borderTopEndRadius:10, borderTopStartRadius:10}}>
                            <PlainText
                                    title={"Referensi Jawaban Kamu"}
                                    color={"#000"}
                                    fontSize= {14}
                                    fontStyle={"bold"}
                                    
                                />
                        </View>
                        
                        <TextInput
                            numberOfLines={1}
                            style={styles.inputContainer}
                            multiline = {true}
                            onChangeText= {(text) => setReference(text)}
                            value={reference}
                        />
                    </View>

                    <View style={styles.footerContent}>
                        <IconFont  fill={'#000'} width={24} height={24}/>
                        <IconDerajat fill={'#000'} width={24} height={24}/>
                        <IconPicture fill={'#000'} width={24} height={24}/>
                        <TouchableOpacity
                                style={styles.btn}
                                onPress= {()=> addAnswer()}
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
      );
    
    const sheetRef = React.useRef(null);
    

    return (
        <View style={styles.container}> 
            <UnlockModal/>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading &&
                <View>
                
                
                
                <View style={{height:'100%', paddingBottom:80}}>
                    { isSolved == "1" &&
                                <View style={{height: 80, backgroundColor:WARNA_SUCCESS, alignItems:'center', justifyContent:'center'}}>
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
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal : windowWidth * 0.05}}>
                        
                        <QuestionCard
                            name = {dataQuestion.First_Name_Question + " " + dataQuestion.Last_Name_Question}
                            category = {dataQuestion.Sub_Kategori_Question}
                            time = {dataQuestion.Date_Question}
                            point = {"+"+dataQuestion.Point_Question}
                            isSolved={dataQuestion.Solved_Question}
                            question={dataQuestion.Content_Question}
                            answer = {dataAnswer.length}
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
              <BottomSheet
                        ref={sheetRef}
                        snapPoints={['90%', "40%", 0]}
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
        flex: 1 ,
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
