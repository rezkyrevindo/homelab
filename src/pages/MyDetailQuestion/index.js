import React,  { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View, SafeAreaView, FlatList,
  ImageBackground,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';

import {PlainText, HeaderText, ButtonPrimary,AnswerCard,  QuestionCard,ButtonDefault, LoadingIndicator} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import { useSelector, useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import FastImage from 'react-native-fast-image'
const MyDetailQuestion = ({route,navigation}) => {
    const { token,data } = useSelector (state => state.authReducers);
    const {isSolved, id_question} = route.params;
    const [solved, setSolved] = useState(isSolved);
    const [dataQuestion, setDataQuestion] = useState([])
    const [dataAnswer, setDataAnswer] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [modalAnswer, setModalAnswer] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        getDataQuestion()
    }, [])


    const verifyThisQuestion = async () => {
        setLoading(true)
        setModalAnswer(false)
        var data = new FormData()
        data.append('id_question' , id_question)
        data.append('id_answer' , selectedAnswer)
        axios.post('https://askhomelab.com/api/verify',
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
                   navigation.replace("MainApp")
                    
                }else{
                   
                }
                console.log(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error.response.status)
            });
    }

    const AnswerModal = ()=>{
        return (
            <Modal
                visible={modalAnswer}
                onTouchOutside={() => { setModalAnswer(false)}}
            >
                <ModalContent>
                    <View style={{ width:windowWidth*0.6, alignItems:'center'}}>
                    <PlainText
                        title={"Pilih Penjawab Yang Menjawab dengan Relevan"}
                        color={"#000"}
                        fontSize= {16}
                        fontStyle={"bold"}
                        textAlign={"center"}
                        marginBottom={20}
                    />
                    <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                        <FlatList
                        maxHeight={windowHeight * 0.4}
                        data={dataAnswer}
                        keyExtractor={(item) => item[0].answer.Id_Answer}
                        renderItem={renderAnswerModal}
                        showsHorizontalScrollIndicator={false}
                        extraData={selectedAnswer}
                        />
                        
                    </SafeAreaView>
                    { selectedAnswer == null &&
                        <View style={{alignItems:'center'}}>
                            <ButtonDefault  
                               
                                title="Lanjutkan"
                                width={windowWidth*0.6}
                                marginTop   = {windowHeight * 0.033}
                            />
                        </View>
                    }
                    { selectedAnswer != null &&
                        <View style={{alignItems:'center'}}>
                            <ButtonPrimary  
                                onPress={() => {
                                    verifyThisQuestion()
                                }}
                                title="Lanjutkan"
                                width={windowWidth*0.6}
                                marginTop   = {windowHeight * 0.033}
                            />
                        </View>
                    }
                    </View>
                    
                </ModalContent>
            </Modal>
        )
    }

    const renderAnswerModal = ({item}) => {
        const isSelected = item[0].answer.Id_Answer == selectedAnswer ? true: false;
        console.log(item)
        return (
            <View>
            {isSelected &&
                <TouchableOpacity style={{backgroundColor:WARNA_UTAMA,padding:10, alignItems:'center', borderRadius:15}}
                    
                >
                    <PlainText
                        title={item[0].answer.First_Name_Answer +" "+ item[0].answer.Last_Name_Answer}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }
            {!isSelected &&
                <TouchableOpacity style={{padding:10, alignItems:'center'}}
                    onPress={() => {
                        setSelectedAnswer(item[0].answer.Id_Answer);
                        
                    }}
                >
                    <PlainText
                        title={item[0].answer.First_Name_Answer +" "+ item[0].answer.Last_Name_Answer}
                        color={"#000"}
                        fontSize= {14}
                        fontStyle={"bold"}
                    />
                </TouchableOpacity>
            }


            </View>
           
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
                name = {item[0].answer.First_Name_Answer + " "+item[0].answer.Last_Name_Answer}
                time = {item[0].answer.Date_Answer}
                isRelevant={item[0].Is_Relevant}
                like = {item[0].answer.Total_Like}
                commentar={jum_commentar}
                onPress={() => navigation.navigate("Commentar", {listCommentar : item[1], id_answer : item[0].answer.Id_Answer, isSolved, id_question})}
                question={item[0].answer.Answer}
                id_answer = {item[0].answer.Id_Answer}
            />
        )
    }

    return (
        <View style={styles.container}>
            { isLoading &&
                <LoadingIndicator/>
            }

            { !isLoading &&
                
                <View style={styles.container}>
                <AnswerModal/>
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal : windowWidth * 0.05}}>
                    {dataQuestion.File_Question != null &&
                        <FastImage 
                            source={{
                                uri: "https://askhomelab.com/storage/"+ dataQuestion.File_Question,
                            }}
                            style={{width : windowWidth, height: 200}} />

                    }
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

                        <SafeAreaView style={{flex :1}}
                                    >
                            {/* <LoadAnswer/> */}
                            <FlatList
                            data={dataAnswer}
                            // keyExtractor={(item) => item[0].answer_0.id_Question.toString()}
                            renderItem={renderAnswer}
                            showsVerticalScrollIndicator={false}
                            />
                            
                            {/* { listQuestionSearch == null &&
                                <View style={{flexDirection :'row', alignItems:'center',alignContent:'center',
                                justifyContent:'center', marginTop:50}}>
                                <FastImage
                                    style={{  width: 300, height: 300 }}
                                    source={ImgNothingQuestion}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                </View>
                            } */}
                            
                            </SafeAreaView>
                        <View style={{padding:10}}></View>
                    </ScrollView>
                    { solved == "0" &&
                        <TouchableOpacity 
                         onPress={()=>setModalAnswer(true)}
                        style={{height: 60, backgroundColor:WARNA_SUCCESS, alignItems:'center', justifyContent:'center'}}>
                            <PlainText
                                title={"Close This Answer"}
                                color={"#fff"}
                                fontStyle={"bold"}
                                fontSize = {14}
                            />
                            <PlainText
                                title={"Means question is already answered"}
                                color={"#fff"}
                                fontSize = {11}
                            />
                        </TouchableOpacity>
                    }
                </View>
            }
           
        </View>
    )
}

export default MyDetailQuestion

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fafafa',
        
    }
    
})
