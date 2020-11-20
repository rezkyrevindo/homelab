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

const Notification = () => {
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
                    title={"Notification"}
                />
           
               
              </View>
                
            </View>
          </View>
          
        </View>

        <View style={styles.content}>

         <View style={{flexDirection : 'column', marginTop:20, marginBottom : 10}}>
                
                <PlainText
                    title={"Recent"}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
                />
            
            
          </View>

          <View style={{flexDirection : 'row' , alignItems:'center', borderBottomWidth : 1, borderColor : WARNA_DISABLE, marginTop : 10, paddingBottom:10}}>
            <Image source={DefaultProfile} style={{width : 50, height: 50}} /> 
            <View style={{flexDirection:'column', marginLeft : 20, justifyContent:'space-around'}}>
              <View style={{flexDirection : 'row', alignItems: 'flex-start'}}>
              <PlainText
                    title={"Samantha"}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {13}
                />
               

              </View>
              <PlainText
                    title={"Answered your question "}
                    color={"#000"}
                    fontSize = {13}
                />
             
              <PlainText
                    marginTop = {10}
                    title={"Yesterday at 1.30 PM"}
                    color={"#000"}
                    fontSize = {11}
                />
              
              
            </View>
          </View>

          
          


        </View>
        
        
      </ScrollView>
    </View>
  );
};

export default Notification;


const styles = StyleSheet.create({
  page: {
    flex: 1,
   
  },
  header: {
    backgroundColor : WARNA_UTAMA,
    width: windowWidth,
    height: windowHeight * 0.15,
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
