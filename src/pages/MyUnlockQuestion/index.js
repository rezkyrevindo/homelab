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
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import FastImage from 'react-native-fast-image'
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height-56;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;
const MyUnlockQuestion = ({navigation}) => {
    
  const { token,data } = useSelector (state => state.authReducers);
  const [selectedMyQuestion, setSelectedMyQuestion] = useState(null)
  
  const [listMyQuestion, setListMyQuestion] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if(selectedMyQuestion != null)
    navigation.navigate('DetailQuestion', {isSolved: selectedMyQuestion.Solved_Status,id_question: selectedMyQuestion.id_Question });
  }, [selectedMyQuestion])

  useEffect(()=> {
    LogBox.ignoreLogs(['Warning']); 
      getMyQuestion()
  }, [])

  const getMyQuestion = async () => {
    setLoading(true)
    axios({
        method :'get',
        url :'https://askhomelab.com/api/my_unlock_question',
        headers :{
            "Authorization" : "Bearer "+token
        }
    }) .then(function (response) {
            if(response.data.message == "Data Not Enough"){
                setListMyQuestion(null)
            }else{
                setListMyQuestion(response.data.My_Unlock_Question)
            }
          
          
          
          console.log(response.data.My_Unlock_Question)
        
            setLoading(false)
    })
    .catch(function (err) {
        setListMyQuestion(null)
        setLoading(false)
    });  
  }
  const renderItemMyQuestion = ({item}) =>{
    
        return (
        <QuestionCard
             onPress={() => {
                setSelectedMyQuestion(item)
              }}
          name = {item.User_Question}
          category = {item.Sub_Category}
          time = {item.Date_Created}
          point = {item.Total_Point}
          isSolved={item.Solved_Status}
          answer = {item.Total_Answer}
          question={item.Content_Question}
        />
      )
      
  }

    return (
        <SafeAreaView style={styles.page}>
            <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
        <ScrollView  >
       
            
        
        { !isLoading &&
            <View style={styles.content}>
            
            
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
                          title={"Oppss??!!\nYou never unlock question"}
                          color={"#000"}
                          fontSize= {18}
                          fontStyle={"bold"}
                          textAlign= {"center"}
                      />
                      <PlainText
                          title={"Go to Home Page and find\n some question you want to know!"}
                          color={"#000"}
                          fontSize= {13}
                          textAlign= {"center"}
                          
                      />
                  </View>
                }
        </View>
        }
        
        { isLoading &&
        
        <View style={styles.content}>
            <LoadingIndicator/>
        </View>
        
        }
    
        
        </ScrollView>
       
        </SafeAreaView>
    )
}

export default MyUnlockQuestion


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
      flex : 1,
      height : windowHeight,

      backgroundColor : '#FAFAFA',
      borderTopLeftRadius : 30,
      borderTopRightRadius : 30,
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
  