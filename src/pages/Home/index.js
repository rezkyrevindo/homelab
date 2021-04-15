import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,SafeAreaView, FlatList,
  TouchableHighlight,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, ImgNothingAsked,ImgNothingQuestion, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import FastImage from 'react-native-fast-image'
import {BASE_URL_API,WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
import { updateProfile } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height-56;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const updateProf = (token) => dispatch(updateProfile(token));
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const { token,data } = useSelector (state => state.authReducers);
  const [search, setSearch] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  const [listQuestionSearch , setListQuestionSearch] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [listMyQuestion, setListMyQuestion] = useState([])
  const [displayHome, setDisplayHome] = useState(0)
  const [selectedMyQuestion, setSelectedMyQuestion] = useState(null)


  useEffect(() => {
    if(selectedQuestion != null)
    navigation.navigate('DetailQuestion', {isSolved: selectedQuestion.Solved_Status,id_question: selectedQuestion.id_Question });
  }, [selectedQuestion])
  useEffect(() => {
    if(selectedMyQuestion != null)
    navigation.navigate('MyDetailQuestion', {isSolved: selectedMyQuestion.Solved_Status,id_question: selectedMyQuestion.id_Question });
  }, [selectedMyQuestion])

  useEffect(() => {
    updateProf(token)
    getMyQuestion()
    
  }, [])

  const filterQuestion = (question)=>{
    
      var i = 0
      var found = false
      question.map((data) =>{
        if( data.Solved_Status == 0  && i < 3){
          const newArray = listMyQuestion
          newArray.push(data)
          
          setListMyQuestion(newArray)
          i+=1
          found = true
          
        }
      })
      if(!found){
        setListMyQuestion(null)
      }
        
      
  }

  const getMyQuestion = async () => {
    setLoading(true)
    axios({
        method :'get',
        url : BASE_URL_API+'my_question',
        headers :{
            "Authorization" : "Bearer "+token
        }
    }) .then(function (response) {
        if (response.data.My_Question.length > 0){
          setListMyQuestion([])
          filterQuestion(response.data.My_Question)
        }else{
          setListMyQuestion(null)
          
        }
        console.info(response.data)
        setLoading(false)
    })
    .catch(function (err) {
        setLoading(false)
        setListMyQuestion(null)
          
    });  
  }

  const getSearchingQuestion = async () =>{
      if(search == ""){
        setIsSearch(false)
      }else{
        setIsSearch(true)
        setLoading(true)
        var data = new FormData();        
        data.append('searching', search)
        data.append('is_solved', "2")
        axios.post(BASE_URL_API+'all_data',
          data,
          {
              headers : {
              Accept : '*/*',
              "content-type" :'multipart/form-data',
              "Authorization" : "Bearer "+token
              }  
          })
              .then(function (response) {
                  if (response.data.message != "No Associated Data"){
                    setListQuestionSearch(response.data.Data)
                    
                    console.log(response.data.Data)
                  }else{
                    setListQuestionSearch(null)
                    console.info("Unable to fetch data from API")
                  }
                  setLoading(false)
              })
              .catch(function (error) {
                setLoading(false)
                  console.error(error.response.status)
              });
      }
     
  }
  const renderItem = ({item}) =>{
    
    return (
      <QuestionCard
        onPress={() => {
              setSelectedQuestion(item)
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

  const renderItemMyQuestion = ({item}) =>{
    
    if(displayHome == 0 && item.Solved_Status == "0" && displayHome <= 3){
      
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
  }


  const RenderContent = () => (
        
        <View style={styles.content}>
        
            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
              <PlainText
                    title={"Your Last Questions "}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
              />
              <TouchableOpacity style={styles.buttonSeeAll}
                onPress= {()=> navigation.navigate("MyQuestion")}
              >
                <PlainText
                      title={"More"}
                      color={'#000'}
                      fontSize = {11}
                />
              </TouchableOpacity>
            </View>
              { listMyQuestion != null &&
                  <FlatList
                data={listMyQuestion}
                keyExtractor={(item) => item.id_Question.toString()}
                renderItem={renderItemMyQuestion}
                showsVerticalScrollIndicator={false}
                
                />
              }
              { listMyQuestion == null &&
                <View style={{flexDirection :'row', alignItems:'center',alignContent:'center',
                justifyContent:'center', flex:1}}>
                  <FastImage
                      style={{  width: 250, height: 250 }}
                      source={ImgNothingAsked}
                      resizeMode={FastImage.resizeMode.contain}
                  />
               </View>
              }

            

           

            
        </View>
        
  );
  
  const SearchContent = () => (
        
        <SafeAreaView style={styles.content}>

        
            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop : 20}}>
              <PlainText
                    title={"Result "}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
              />
              
            </View>


            <SafeAreaView style={{flex :1}}
            >
              { listQuestionSearch != null &&
                <FlatList
              data={listQuestionSearch}
              keyExtractor={(item) => item.id_Question.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              />
              }
              { listQuestionSearch == null &&
                <View style={{flexDirection :'row', alignItems:'center',alignContent:'center',
                justifyContent:'center', marginTop:50}}>
                <FastImage
                    style={{  width: 300, height: 300 }}
                    source={ImgNothingQuestion}
                    resizeMode={FastImage.resizeMode.contain}
                />
                </View>
              } 
            </SafeAreaView>
            
        </SafeAreaView>
        
    
  );

  const sheetRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.page}>
      <View>
          <StatusBar  
          backgroundColor={WARNA_UTAMA} 
          barStyle="dark-content" />
      </View>
      <ScrollView  >
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={{width : windowWidth * 0.9,flexDirection : 'row' , justifyContent : 'space-between'}}>
              <View >
                <View style={{flexDirection : 'row'}}>
                  <PlainText
                        title={"Hello, "}
                        color={"#000"}
                        fontSize = {13}
                  />
                  <PlainText
                      title={data[2].first_name +" " + data[2].last_name}
                      color={"#000"}
                      fontStyle={"bold"}
                      fontSize = {13}
                  />
                </View>
                <HeaderText
                    marginTop = {windowHeight * 0.01}
                    fontSize  = {24}
                    title={"Ask Question ?"}
                />
              </View>
              <View style={{
                height:40,
                backgroundColor:"#fff",
                borderRadius :20, alignItems:'center', 
                alignContent:'center', justifyContent:'center', 
                paddingHorizontal:20,
              }}>
          

                <View style={{alignItems:'center', alignContent:'center', flexDirection:'row',  }}>
                    <IconPoints/>
                    <PlainText
                      title={data[2].point}
                      color={"#000"}
                      fontStyle={"bold"}
                      fontSize = {18}
                      marginLeft= {5}
                  />
                </View>
              </View>   
            </View>
            
            <View style={styles.searchWrap}>
              
              
              <View style={
                {flexDirection : 'row' , width :windowWidth * 0.90 ,alignItems : 'center'}
                }>
                <InputText 
                borderRadius = {30}
                placeholder = "Ask your question here!"                 
                secureTextEntry = {false} 
                width = {windowWidth * 0.90}
                marginTop = {0}
                paddingRight = {44}
                onChangeText = {(text) => setSearch(text)}
                value= {search}
                onBlur={ ()=> getSearchingQuestion()}
                error={"first"}
                />

                <IconSearchActive style={styles.searchIcon}/>
              </View>
              
            </View>
              
          </View>
          
        </View>
        { isSearch && !isLoading &&
          <SearchContent/>
        }
        { !isSearch && !isLoading &&
          <RenderContent/>
        }
        { isLoading &&
        
          <View style={styles.content}>
            <LoadingIndicator/>
          </View>
          
        }
      
        
        </ScrollView>
        { search != "" && isSearch &&
        <TouchableHighlight
            style={{
                height:50,
                width:windowWidth,
                backgroundColor:WARNA_UTAMA,
                justifyContent:'center',
                alignItems:'center',
                borderTopStartRadius:20,
                borderTopRightRadius:20,
                paddingVertical:10
              }}
              onPress={()=> navigation.navigate("CreateQuestion")}
            > 
            <View>
              <PlainText
                  title={"Tidak menemukan pertanyaan?"}
                  color={"#000"}
                  fontSize = {13}
                  textAlign="center"
              />
              <PlainText
                  title={"Buat Pertanyaan"}
                  color={"#000"}
                  fontSize = {13}
                  fontStyle={"bold"}
                  textAlign="center"
              />
            </View>
             
            </TouchableHighlight>
        }
    </SafeAreaView>
  );
};

export default Home;


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
    minHeight: windowHeight * 0.65,
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
