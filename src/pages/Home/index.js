import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, DefaultProfile, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Home = ({navigation}) => {
  return (
    <View style={styles.page}>
    
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity style={styles.button}
                 onPress={() => {
                      navigation.navigate('CreateQuestion');
                  }}
              >
                  <Text style={styles.textBtn}>Create</Text>
              </TouchableOpacity>
              
              <View style={
                {flexDirection : 'row' , width :windowWidth * 0.58 ,alignItems : 'center'}
                }>
                <InputText 
                borderRadius = {30}
                placeholder = "Ask your question here!"                 
                secureTextEntry = {false} 
                width = {windowWidth * 0.58}
                marginTop = {0}
                paddingRight = {44}
                />

                <IconSearchActive style={styles.searchIcon}/>
              </View>
              
            </View>
              
          </View>
          
        </View>

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
        
        
      </ScrollView>
    </View>
  );
};

export default Home;


const styles = StyleSheet.create({
  page: {
    flex: 1,
   
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
    marginTop : -20,
    minHeight : windowHeight * 0.9,
    paddingHorizontal : windowWidth * 0.05,
    paddingVertical : 10,
    
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
