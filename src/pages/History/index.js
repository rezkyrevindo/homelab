import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground, SafeAreaView, FlatList, 
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, DefaultProfile} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import { WARNA_UTAMA, WARNA_SUCCESS,WARNA_WARNING, OpenSans, BASE_URL_API} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { useSelector, useDispatch } from 'react-redux';

const History = () => {
  function hitungSelisihHari(tgl1){
    var miliday = 60 * 60 * 1000;
  
    var tanggal1 = new Date(tgl1);
    var tanggal2 = new Date();
    console.log(tgl1)
    var tglPertama = Date.parse(tanggal1);
    var tglKedua = Date.parse(tanggal2);
  
    var selisih = (tglKedua - tglPertama) / miliday;
    if (selisih >= 24){
      selisih = selisih/24
      return Math.floor(selisih) + " days ago"
    }else if (selisih < 24 && selisih > 1){
      return Math.floor(selisih) + " hours ago"
    }else{
      selisih = selisih * 60
      return Math.floor(selisih) + " minutes ago"
    }
  }

  
  const { token,data } = useSelector (state => state.authReducers);
  const [isLoading, setLoading] = useState(false)
  const [listRiwayat, setListRiwayat] = useState(false)

  useEffect(() => {
    getRiwayat()
  }, [])

  const getRiwayat = async () =>{
    setLoading(true)

    axios.get(BASE_URL_API+'transaction', {
        headers: {
            "Authorization" : "Bearer " + token 
        }
    }).then(function (response){
        let obj = response.data.Transaction
        obj.sort(function(a, b) {
            var dateA = new Date(a.Date), dateB = new Date(b.Date);
            return dateB- dateA;
        });
        setListRiwayat(obj)
       
        setLoading(false)
    }).catch(function (error){
        console.error(error)
        setLoading(false)
    })

}

  const renderItem = ({item}) =>{
    var date = hitungSelisihHari(item.Date)
    var color = null
    var point = null
    var price = null
    var status = null
    if(item.Status == "success"){
        status = WARNA_SUCCESS
    }else if(item.Status == "pending"){
      status = WARNA_UTAMA
    }else{
      status = WARNA_WARNING
    }
    if(item.Description == "top-up" || item.Description == "refund"){
      color = WARNA_SUCCESS
      point = "+"+item.Point
      price = item.Price
    }else{
      color = WARNA_WARNING
      price = item.Price
      point = "-"+item.Point
    }
    console.log(item)
    return (
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignContent:'center',
          alignItems:'center',
          borderBottomWidth: 1,
          borderColor:'#dadada',
          padding:10
        }}>
          <View style={{
            flex : 1,
          }}>
           
            <PlainText
                title={point}
                color={color}
                fontStyle={"bold"}
                fontSize = {18}
            />
          </View>
          <View style={{
            flex:2,
            marginLeft:20,

          }}>
            <View style={{flexDirection:'row',
            alignItems:'center', }}>
            {item.Description == 'top-up' &&
              <PlainText
                  title={"Top Up"}
                  color={"#000"}
                  fontSize = {16}
              />
            }
            {item.Description != 'top-up' &&
              <PlainText
                  title={item.Description.charAt(0).toUpperCase() + item.Description.slice(1)}
                  color={"#000"}
                  fontSize = {16}
              />
            }
              <View style={{backgroundColor : status, paddingHorizontal:5, borderRadius:5, marginLeft:5,}}>
              <PlainText
                  title={item.Status.charAt(0).toUpperCase() + item.Status.slice(1)}
                  color={"#000"}
                  fontSize = {8}
              />
              </View>
            </View>
            <PlainText
                  title={date}
                  color={"#000"}
                  fontSize = {13}
              />
            
            
            
          </View>
          <View style={{
            flex:2,
            alignItems:'flex-end'}}>
            <PlainText
                  title={price}
                  color={"#000"}
                  fontStyle={"bold"}
                  fontSize = {16}
              />
          </View>
         
        </View>
    )
  }

  return (
    
    <View style={styles.page}>
     <View>
          <StatusBar  
          backgroundColor={WARNA_UTAMA} 
          barStyle="dark-content" />
      </View>
      {!isLoading &&
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={{width : windowWidth * 0.9,flexDirection : 'row' , justifyContent : 'space-between'}}>
              <View >
                
                <HeaderText
                    marginTop = {windowHeight * 0.01}
                    fontSize  = {24}
                    title={"History Transaction"}
                />
           
               
              </View>
                
            </View>
          </View>
          
        </View>

        <View style={styles.content}>

         

          <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
              <FlatList
              data={listRiwayat}
              keyExtractor={(item) => item.Date.toString()}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              onRefresh={()=> getRiwayat()}
              refreshing = {isLoading}
              />
              
          </SafeAreaView>

          
          


        </View>
        
        
      </ScrollView>
      }
      {isLoading &&
        <LoadingIndicator/>
      }
      
    </View>
  );
};

export default History;


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
