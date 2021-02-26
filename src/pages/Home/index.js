import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, DefaultProfile, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height-56;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Home = ({navigation}) => {
  const [search, setSearch] = useState("")
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    if(search == ""){
      setIsSearch(false)
    }
  }, [search])

  const RenderContent = () => (
        
        <View style={styles.content}>
        
            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
              <PlainText
                    title={"Your Last Questions "}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
              />
              <TouchableOpacity style={styles.buttonSeeAll}>
                <PlainText
                      title={"More"}
                      color={'#000'}
                      fontSize = {11}
                />
              </TouchableOpacity>
            </View>


            <QuestionCard
              onPress={() => {
                      navigation.navigate('MyDetailQuestion');
                  }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+5'
              isSolved={false}
              answer = '2'
              like = '1'
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            
            

            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
              <PlainText
                    title={"Top Question"}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
              />
              
            </View>

            <QuestionCard
              onPress={() => {
                  navigation.navigate('DetailQuestion',{
                    isSolved: true 
                  });
              }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+50'
              answer = '0'
              like = '1'
              isSolved={true}
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
              onPress={() => {
                      navigation.navigate('MyDetailQuestion');
                  }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+5'
              isSolved={false}
              answer = '2'
              like = '1'
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
              onPress={() => {
                      navigation.navigate('MyDetailQuestion');
                  }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+5'
              isSolved={false}
              answer = '2'
              like = '1'
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
           
        </View>
        
  );
  const SearchContent = () => (
        
        <View style={styles.content}>

        
            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop : 20}}>
              <PlainText
                    title={"Result "}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
              />
              
            </View>


            <QuestionCard
              onPress={() => {
                      navigation.navigate('MyDetailQuestion');
                  }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+5'
              isSolved={false}
              answer = '2'
              like = '1'
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            
            

            <QuestionCard
              onPress={() => {
                  navigation.navigate('DetailQuestion',{
                    isSolved: true 
                  });
              }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+50'
              answer = '0'
              like = '1'
              isSolved={true}
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
              onPress={() => {
                  navigation.navigate('DetailQuestion',{
                    isSolved: true 
                  });
              }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+50'
              answer = '0'
              like = '1'
              isSolved={true}
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
              onPress={() => {
                  navigation.navigate('DetailQuestion',{
                    isSolved: true 
                  });
              }}
              name = 'Rezky Revindo'
              category = 'Matematika'
              time = '1 d ago'
              point = '+50'
              answer = '0'
              like = '1'
              isSolved={true}
              question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />

           
         
          
        </View>
        
       
  );
 
  const sheetRef = React.useRef(null);

  return (
    <View style={styles.page}>
    <View>
                <StatusBar  
                backgroundColor={WARNA_UTAMA} 
                barStyle="dark-content" />
            </View>
    <ScrollView  showsVerticalScrollIndicator={false}>
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
                      title={"Sean Roland"}
                      color={"#000"}
                      fontStyle={"bold"}
                      fontSize = {13}
                  />
                </View>
                <HeaderText
                    marginTop = {windowHeight * 0.01}
                    fontSize  = {24}
                    title={"Ask Question?"}
                />
              </View>
              <View>
                <Image source={DefaultProfile}/>
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
                onBlur={ ()=>setIsSearch(true)}
                />

                <IconSearchActive style={styles.searchIcon}/>
              </View>
              
            </View>
              
          </View>
          
        </View>
        { search != ""  && isSearch &&
          <SearchContent/>
           
          
        }
        { search == "" &&
          <RenderContent/>
        }
        { search != "" && !isSearch &&
        <LoadingIndicator/>
        
          
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
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  page: {
    height:windowHeight,
   
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
    
    minHeight : windowHeight * 0.9,
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
