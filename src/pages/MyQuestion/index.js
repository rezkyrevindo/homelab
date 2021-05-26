import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,SafeAreaView, FlatList,
  TouchableHighlight,
  Dimensions, StatusBar, TouchableOpacity, LogBox,
} from 'react-native';
import {IconSearchActive, ImgNothingAsked,ImgNothingQuestion, IconNotFound} from '../../assets';
import {PlainText, HeaderText, InputText,ButtonPrimary, QuestionCard, LoadingIndicator} from '../../components/';
import FastImage from 'react-native-fast-image'
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height-56;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;
const MyQuestion = ({navigation}) => {
    
  const { token,data } = useSelector (state => state.authReducers);
  const [selectedMyQuestion, setSelectedMyQuestion] = useState(null)
  
  const [listMyQuestion, setListMyQuestion] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if(selectedMyQuestion != null)
    navigation.navigate('MyDetailQuestion', {isSolved: selectedMyQuestion.Solved_Status,id_question: selectedMyQuestion.id_Question });
  }, [selectedMyQuestion])

  useEffect(()=> {
    LogBox.ignoreLogs(['Warning']); 
      getMyQuestion()
  }, [])

  const getMyQuestion = async () => {
    setLoading(true)
    axios({
        method :'get',
        url :'https://askhomelab.com/api/my_question',
        headers :{
            "Authorization" : "Bearer "+token
        }
    }) .then(function (response) {
          setListMyQuestion(response.data.My_Question)
          
          
          console.log(response.data.My_Question)
        
            setLoading(false)
    })
    .catch(function (err) {
         setLoading(false)
         setListMyQuestion(null)
    });  
  }
  const renderItemMyQuestion = ({item}) =>{
    
        return (
          <QuestionCard
            onPress={() => {
              navigation.navigate('MyDetailQuestion', {isSolved: item.Solved_Status,id_question: item.id_Question });
                }}
                name = {item.First_Name + " "+ item.Last_Name}
            picture = {item.Picture_User}
            category = {item.Sub_Category}
            time = {item.Date_Created}
            point = {item.Total_Point}
            isSolved={item.Solved_Status}
            answer = {item.Total_Answer}
            question={item.Content_Question}
            img = {item.File}
            typeFile= {item.Type_Of_File}
          />
      )
      
  }

    return (
        <ScrollView style={styles.page}
        keyboardShouldPersistTaps='always'>
            <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
       
            
        
        { !isLoading &&
            <SafeAreaView style={styles.content}>
            
            
                { listMyQuestion != null &&
                    <FlatList
                    data={listMyQuestion}
                    keyExtractor={(item) => item.id_Question.toString()}
                    renderItem={renderItemMyQuestion}
                    showsVerticalScrollIndicator={false}
                    
                    />
                }
                { listMyQuestion == null &&
                  <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                   
                    <IconNotFound width={300} height={300}/>
                    <PlainText
                        title={"Oppss??!!\nYou never create a question"}
                        color={"#000"}
                        fontSize= {18}
                        fontStyle={"bold"}
                        textAlign= {"center"}
                    />
                    <PlainText
                        title={"You want to create once?"}
                        color={"#000"}
                        fontSize= {13}
                        textAlign= {"center"}
                        
                    />
                    <ButtonPrimary  
                        onPress={() => {
                            navigation.navigate("CreateQuestion")
                        }}
                        title="Create Question"
                        width={windowWidth*0.6}
                        marginTop   = {windowHeight * 0.033}
                    />
                  </View>
                }
        </SafeAreaView>
        }
        
        { isLoading &&
        
        <View style={styles.content}>
            <LoadingIndicator/>
        </View>
        
        }
    
        
        </ScrollView>
       
    )
}

export default MyQuestion


const styles = StyleSheet.create({
    page: {
      flex : 1,
      backgroundColor : '#FAFAFA',
     
    },
    header: {
      backgroundColor : WARNA_UTAMA,
      width: windowWidth,
      height: windowHeight * 0.3,
      flexDirection : 'row',
      alignItems : 'center'
    },
    headerWrap : {
      paddingHorizontal : windowWidth * 0.05,
    },
    
    content: {
      backgroundColor : '#FAFAFA',
      borderTopLeftRadius : 30,
      borderTopRightRadius : 30,
      minHeight: windowHeight ,
      paddingHorizontal : windowWidth * 0.05,
      paddingVertical : 10,
      marginTop:-20
    },
    
    searchIcon :{
      width : 24,
      height : 24,
      marginLeft : -windowWidth *0.1,
    },
  
    searchWrap:{
      flexDirection:'row', 
      justifyContent : 'space-between',
      marginTop :  windowHeight * 0.02,
      
      
    },
    button : {
        backgroundColor : '#fff',
        width           : windowWidth * 0.28,
        borderRadius    : 30,
        justifyContent  : 'center',
        borderColor     : WARNA_DISABLE,
        borderWidth     : 1,
        
    }, 
    buttonSeeAll :{
        backgroundColor : WARNA_UTAMA,
        paddingVertical : 3,
        borderRadius    : 10,
        justifyContent  : 'center',
        paddingHorizontal : 15,
    },
  
  
    textBtn :{
        textAlign       : 'center',
        fontSize        : 16,
        color           : "#000",
        fontFamily      : OpenSans,
        
        
    },
});
  