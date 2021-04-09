import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSetting, DefaultProfile, IconPoints, IconPointsWhite, IconTopUp, IconWithdraw} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard} from '../../components/';
import { WARNA_UTAMA, WARNA_DISABLE, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';
import FastImage from 'react-native-fast-image'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Akun = ({navigation}) => {
    const { token,data } = useSelector (state => state.authReducers);
    const dispatch = useDispatch();

    const requestLogout = (token) => dispatch(logout(token));
    
   

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
                    title={"Profile"}
                />
           
               
              </View>
                
            </View>
          </View>
          
        </View>

        <View style={styles.content}>
            <View style={styles.wrapCardProfile}>
                <View style={{alignItems : 'center'}}>
                    {data[2].picture != null &&
                        <FastImage source={{uri: "http://askhomelab.com/storage"+data[2].picture}} style={{width : 100, height: 100, marginTop : -50, borderRadius:100}}  />
                    }
                    {data[2].picture == null &&
                        <FastImage source={DefaultProfile} style={{width : 100, height: 100, marginTop : -50}}  />
                    }
                    
                </View>
                
               
                <View style={{alignItems : 'center'}}>
                    <PlainText
                        title={data[2].first_name + " "+ data[2].last_name}
                        color={"#000"}
                        fontStyle={"bold"}
                        fontSize = {16}
                    /> 
                    <PlainText
                        title={data[2].email}
                        color={'#111111'}
                        fontSize = {11}
                    /> 

                    <PlainText
                        title={"Telkom University"}
                        color={'#111111'}
                        fontSize = {11}
                        marginBottom = {10}
                        marginTop = {10}
                    />
                    
                </View>
            </View>
            
            <View style={styles.wrapCardPoin}>
               
                <View style={{
                    flex: 1, backgroundColor : WARNA_UTAMA, borderRadius : 20, flexDirection : 'row', padding: 10, 
                    paddingHorizontal : 20, justifyContent:'space-between', 
                    alignItems:'center'}}>
                   <IconPointsWhite />
                    <View style={{ alignItems:'flex-end'}}>
                        <PlainText
                            title={data[2].point}
                            color={'#111111'}
                            fontSize = {24}
                            fontStyle={'bold'}
                        />
                        <PlainText
                            title={"Points"}
                            color={'#fff'}
                            fontSize = {13}
                        />
                    </View>
                </View>
                <View style={{flex: 1, flexDirection : 'row', padding: 10, justifyContent:'space-around', 
                alignItems:'center'}}>
                   
                    <View style={{alignItems:'center', }}>
                        <PlainText
                            title={data[0].total_question}
                            color={WARNA_UTAMA}
                            fontSize = {13}
                            fontStyle={'bold'}
                        />
                        <PlainText
                            title={"Questions"}
                            color={'#111111'}
                            fontSize = {11}
                        />
                    </View>
                    <View style={{alignItems:'center', }}>
                        <PlainText
                            title={data[1].total_answer}
                            color={WARNA_UTAMA}
                            fontSize = {13}
                            fontStyle={'bold'}
                        />
                        <PlainText
                            title={"Answers"}
                            color={'#111111'}
                            fontSize = {11}
                        />
                    </View>
                </View>
            </View>
                    

            <View style={{flexDirection : 'column', marginTop:20, marginBottom : 10}}>
                
                <PlainText
                    title={"Menus"}
                    color={"#000"}
                    fontStyle={"bold"}
                    fontSize = {14}
                />
            
            
            </View>
            

            <View style={{flexDirection : 'row'}}>
                <TouchableOpacity style={styles.buttonIcon}
                    onPress = { () => navigation.navigate('Setting') }
                >
                    <View style={styles.buttonIconHeader}>
                        <IconSetting/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Setting"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon} onPress={()=> navigation.navigate("TopUp")}>
                    <View style={styles.buttonIconHeader}>
                        <IconTopUp/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Buy Points"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon} onPress={() => navigation.navigate("Withdraw")}>
                    <View style={styles.buttonIconHeader}>
                        <IconWithdraw/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Withdraw"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
               
            </View>
            <View style={{flexDirection : 'row'}}>
                <TouchableOpacity style={styles.buttonIcon}
                onPress= {() => navigation.navigate("MyQuestion")}>
                    <View style={styles.buttonIconHeader}>
                        <IconSetting/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Questions"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon}
                onPress= {() => navigation.navigate("MyAnswer")}>
                    <View style={styles.buttonIconHeader}>
                        <IconSetting/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Answers"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonIcon}>
                    <View style={styles.buttonIconHeader}>
                        <IconSetting/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"History"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon}
                    onPress = { () =>  requestLogout(token).then(()=> navigation.replace("Landing"))} 
                >
                    <View style={styles.buttonIconHeader}>
                        <IconSetting/>
                    </View>
                    <View style={styles.buttonIconText}>
                        <PlainText
                            title={"Logout"}
                            color={"#000"}
                            fontSize = {12}
                        />
                    </View>
                </TouchableOpacity>
            </View>

          
          


        </View>
        
        
      </ScrollView>
    </View>
  );
};

export default Akun;


const styles = StyleSheet.create({
  page: {
    flex: 1,
   
  },
  header: {
    backgroundColor : WARNA_UTAMA,
    width: windowWidth,
    height: windowHeight * 0.15,
    flexDirection : 'row',
    alignItems : 'center'
  },

    buttonIcon :{
        flex : 1,
        padding : 5,
        marginTop: 10,
    },
    
    buttonIconHeader:{
        alignItems:'center',
        padding:20,
        backgroundColor : '#fff',
        borderRadius    : 10,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation       : 3,
    },
    buttonIconText:{
        marginTop : 10,
        alignItems:'center',
        justifyContent : 'center'
    },

  headerWrap : {
    
    paddingHorizontal : windowWidth * 0.05,
  },

    wrapCardProfile : {
        backgroundColor : '#fff',
        borderRadius    : 20,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation       : 3, 
        width : windowWidth * 0.9,
        marginTop : 50,
    },
    wrapCardPoin : {
        flexDirection : 'row',
        justifyContent : 'space-between',   
        backgroundColor : '#fff',
        borderRadius    : 20,
        shadowColor     : "#000",
        shadowOffset    : {
            width: 0,
            height: 1,
        },
        shadowOpacity   : 0.22,
        shadowRadius    : 2.22,
        elevation       : 3, 
        width : windowWidth * 0.9,
        marginTop : 20,
    },
  
  content: {
    backgroundColor : '#FAFAFA',
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    marginTop : -20,
    minHeight : windowHeight* 0.85,
    paddingHorizontal : windowWidth * 0.05,
    paddingVertical : 10,
    
  },
  
  searchIcon :{
    width : 24,
    height : 24,
    marginLeft : -windowWidth *0.1,
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
