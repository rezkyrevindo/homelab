import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard} from '../../components/';
import { WARNA_UTAMA, WARNA_DISABLE, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Explore = () => {
  return (
    <View style={styles.page}>
     <View>
          <StatusBar  
          backgroundColor={WARNA_UTAMA} 
          barStyle="dark-content" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={{width : windowWidth * 0.9,flexDirection : 'row' , justifyContent : 'space-between'}}>
              <View >
                
                <HeaderText
                    marginTop = {windowHeight * 0.01}
                    fontSize  = {24}
                    title={"Explore"}
                />
           
                <PlainText
                    title={"Bantu jawab pertanyaan teman kamu sekarang juga, kumpulkan point dan dapatkan hadiahnya!"}
                    color={"#000"}
                    fontSize = {12}
                    marginTop = {10}
                />
              </View>
                
            </View>
          </View>
          
        </View>

        <View style={styles.content}>


            <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
                <PlainText
                    title={"Category "}
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

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                <View style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                    <TouchableOpacity style={styles.buttonActive}>
                        <PlainText
                            title={"Matematika"}
                            color={'#000'}
                            fontSize = {11}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <PlainText
                            title={"Matematika"}
                            color={'#000'}
                            fontSize = {11}
                            
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <PlainText
                            title={"Matematika"}
                            color={'#000'}
                            fontSize = {11}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <PlainText
                            title={"Matematika"}
                            color={'#000'}
                            fontSize = {11}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <PlainText
                            title={"Matematika"}
                            color={'#000'}
                            fontSize = {11}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={{flexDirection : 'column', marginTop:20}}>
                
                <PlainText
                    title={"Questions"}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
                />
            
            
            </View>


            <QuestionCard
                name = 'Rezky Revindo'
                category = 'Matematika'
                time = '1 d ago'
                point = '+50'
                isSolved={false}
                answer = '0'
                question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
                name = 'Rezky Revindo'
                category = 'Matematika'
                time = '1 d ago'
                point = '+20'
                isSolved={false}
                answer = '0'
                question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
            <QuestionCard
                name = 'Rezky Revindo'
                category = 'Matematika'
                time = '1 d ago'
                point = '+50'
                isSolved={false}
                answer = '1'
                question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
            />
          


        </View>
        
        
      </ScrollView>
    </View>
  );
};

export default Explore;


const styles = StyleSheet.create({
  page: {
    flex: 1,
   
  },
  header: {
    backgroundColor : WARNA_UTAMA,
    width: windowWidth,
    height: windowHeight * 0.25,
    marginTop : 10,
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
    minHeight : windowHeight,
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
  buttonActive : {
      padding : 15,
      backgroundColor : WARNA_UTAMA,
      borderRadius    : 10,
      justifyContent  : 'center',
      marginRight : 10,
      shadowColor     : "#000",
      shadowOffset    : {
          width: 0,
          height: 1,
      },
      shadowOpacity   : 0.22,
      shadowRadius    : 2.22,
      elevation       : 3,  
      
  }, 
  button : {
    padding : 15,
    backgroundColor : '#fff',
    borderRadius    : 10,
    justifyContent  : 'center',
    marginRight : 10,
    shadowColor     : "#000",
    shadowOffset    : {
        width: 0,
        height: 1,
    },
    shadowOpacity   : 0.22,
    shadowRadius    : 2.22,
    elevation       : 3,  
    
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
