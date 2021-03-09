import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,SafeAreaView,
  View,
  ImageBackground, FlatList,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconSearchActive, IconPoints, ImgNothingQuestion} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import { WARNA_UTAMA, WARNA_DISABLE, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import FastImage from 'react-native-fast-image'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Explore = ({navigation}) => {
  const { token,data } = useSelector (state => state.authReducers);
  const [listCategory, setListCategory] = useState([]) 
  const [selectedMenu , setSelectedMenu] = useState("explore")
  const [isLoading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [listQuestion, setListQuestion] = useState([])
  const [opacity_bounty, setOpacityBounty] = useState(0.5)
  const [opacity_explore, setOpacityExplore] = useState(1)
  const [selectedPoint, setSelectedPoint] = useState("25")
  const [isLoadingContent, setLoadingContent] = useState(false)
  const listPoints = [{id:'25', name:'25'}, {id:'15', name:'15'} , {id:'10', name:'10'}]
  const [selectedQuestion, setSelectedQuestion] = useState(null)


  useEffect(() => {
    if(selectedQuestion != null)
    navigation.navigate('DetailQuestion', {isSolved: selectedQuestion.Solved_Status,id_question: selectedQuestion.id_Question });
  }, [selectedQuestion])

  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    getQuestionByTag()
    
  }, [selectedId, selectedPoint])

  useEffect(() => {
    if (selectedMenu == "explore"){
      setOpacityBounty(0.5)
      setOpacityExplore(1)
      setSelectedPoint(null)
      setSelectedId(null)
    }else{
      setOpacityBounty(1)
      setOpacityExplore(0.5)
      setSelectedId(null)
      setSelectedPoint('25')
    }
    
  }, [selectedMenu])
  

  const getCategory = async () =>{
        setLoading(true)

        axios.get('https://askhomelab.com/api/sub_category', {
            headers: {
                "Authorization" : "Bearer " + token 
            }
        }).then(function (response){
            setListCategory(response.data.Sub_Kategori)
           
            setLoading(false)
        }).catch(function (error){
            console.error(error)
            setLoading(false)
        })

  }

  const renderTag = ({item}) =>{
    
    return (
      <View>
      {item.id === selectedId &&
        <TouchableOpacity style={styles.buttonActive}
        >
        <PlainText
            title={item.name}
            color={'#000'}
            fontSize = {11}
        />
      </TouchableOpacity>
      }
      {item.id !== selectedId && 
        <TouchableOpacity style={styles.button}
         onPress={()=> setSelectedId(item.id)
        }>
        <PlainText
            title={item.name}
            color={'#000'}
            fontSize = {11}
        />
      </TouchableOpacity>
      }
      </View>
     
    )
  }

  const renderPoints = ({item}) =>{
    
    return (
      <View>
      {item.id === selectedPoint &&
        <TouchableOpacity style={styles.buttonActive}
        >
        <PlainText
            title={item.name}
            color={'#000'}
            fontSize = {11}
        />
      </TouchableOpacity>
      }
      {item.id !== selectedPoint && 
        <TouchableOpacity style={styles.button}
         onPress={()=> setSelectedPoint(item.id)
        }>
        <PlainText
            title={item.name}
            color={'#000'}
            fontSize = {11}
        />
      </TouchableOpacity>
      }
      </View>
     
    )
  }

  
  const getQuestionByTag = async () =>{
    
    setLoadingContent(true)
    var data = new FormData();        
    
    if (selectedId != null){
      data.append('id_sub_category', selectedId)
    }
    if(selectedPoint != null){
      data.append('point', selectedPoint)
    }else{
      data.append('point', '5')
    }
    data.append('is_solved', "0")
    axios.post('https://askhomelab.com/api/all_data',
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
                console.log(listQuestion)
                setListQuestion(response.data.Data)
                console.log(listQuestion)
              }else{
                setListQuestion(null)
                console.info("Unable to fetch data from API")
                console.log(listQuestion)
              }
              setLoadingContent(false)
          })
          .catch(function (error) {
            setLoadingContent(false)
              console.error(error.response.status)
          });
    
  
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
          answer = '2'
          question={item.Content_Question}
        />
      )
    }

  const RenderBounty = () => (
      <View style={styles.content}>
      { isLoading &&
          <LoadingIndicator/>
        }
      { !isLoading &&
        <View>
        <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
            <PlainText
                title={"Tag "}
                color={"#000"}
                fontStyle={"bold"}
                fontSize = {14}
            />
            {/* <TouchableOpacity style={styles.buttonSeeAll}>
            <PlainText
                    title={"More"}
                    color={'#000'}
                    fontSize = {11}
            />
            </TouchableOpacity> */}
        </View>
       
          <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
              
              
              <FlatList
              horizontal
              data={listCategory}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTag}
              showsHorizontalScrollIndicator={false}
              extraData={selectedId}
              />
              
          </SafeAreaView>
        <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
            <PlainText
                title={"Points "}
                color={"#000"}
                fontStyle={"bold"}
                fontSize = {14}
            />
            {/* <TouchableOpacity style={styles.buttonSeeAll}>
            <PlainText
                    title={"More"}
                    color={'#000'}
                    fontSize = {11}
            />
            </TouchableOpacity> */}
        </View>
       
        <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
              
              
              <FlatList
              horizontal
              data={listPoints}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderPoints}
              showsHorizontalScrollIndicator={false}
              extraData={selectedPoint}
              />
              
          </SafeAreaView>

      <View style={{flexDirection : 'column', marginTop:20}}>
          
          <PlainText
              title={"Questions"}
              color={"#000"}
              fontStyle={"bold"}
              fontSize = {14}
          />
      
      
      </View>
        { isLoadingContent &&
          <View style={{marginTop:100}}>
          <LoadingIndicator/>
          </View>
          
        }
          { !isLoadingContent &&
            <SafeAreaView style={{flex :1}}
            >
              { listQuestion == null &&
                
                <View style={{flexDirection :'row', alignItems:'center',alignContent:'center',
                justifyContent:'center', marginTop:50}}>
                <FastImage
                    style={{  width: 300, height: 300 }}
                    source={ImgNothingQuestion}
                    resizeMode={FastImage.resizeMode.contain}
                />
                </View>
              }
              { listQuestion != null &&
                <FlatList
                data={listQuestion}
                keyExtractor={(item) => item.id_Question.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                />
              }
              
           </SafeAreaView>
          }
          
          
        </View>
      }

      
    


  </View>
  );

  const RenderExplore = () => (
      <View style={styles.content}>
      { isLoading &&
          <LoadingIndicator/>
        }
      { !isLoading &&
        <View>
        <View style={{flexDirection : 'row', justifyContent :'space-between', alignItems:'center', marginTop:20}}>
          <PlainText
              title={"Tag "}
              color={"#000"}
              fontStyle={"bold"}
              fontSize = {14}
          />
          {/* <TouchableOpacity style={styles.buttonSeeAll}>
          <PlainText
                  title={"More"}
                  color={'#000'}
                  fontSize = {11}
          />
          </TouchableOpacity> */}
      </View>
          <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
              
              
              <FlatList
              horizontal
              data={listCategory}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTag}
              showsHorizontalScrollIndicator={false}
              extraData={selectedId}
              />
              
          </SafeAreaView>

      <View style={{flexDirection : 'column', marginTop:20}}>
          
          <PlainText
              title={"Questions"}
              color={"#000"}
              fontStyle={"bold"}
              fontSize = {14}
          />
      
      
      </View>
          
      { isLoadingContent &&
          <View style={{marginTop:100}}>
          <LoadingIndicator/>
          </View>
          
        }
          { !isLoadingContent &&
            <SafeAreaView style={{flex :1}}
            >
              { listQuestion == null &&
                
                <View style={{flexDirection :'row', alignItems:'center',alignContent:'center',
                justifyContent:'center', marginTop:50}}>
                <FastImage
                    style={{  width: 300, height: 300 }}
                    source={ImgNothingQuestion}
                    resizeMode={FastImage.resizeMode.contain}
                />
                </View>
              }
              { listQuestion != null &&
                <FlatList
                data={listQuestion}
                keyExtractor={(item) => item.id_Question.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                />
              }
              
           </SafeAreaView>
          }
          
        </View>
      }

      
    


  </View>
  );
  

  return (
    <View style={styles.page}>
    
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={{width : windowWidth * 0.9,flexDirection : 'row' , justifyContent : 'space-between'}}>
              <View style={{flexDirection:'row'}}>
               
                <TouchableOpacity
                  onPress={() => setSelectedMenu("explore")}
                >
                  <HeaderText
                      marginTop = {windowHeight * 0.01}
                      fontSize  = {21}
                      title={"Explore"}
                      color = {"#3F3D56"}
                      opacity={opacity_explore}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedMenu("bounty")}
                >
                  <HeaderText
                      marginTop = {windowHeight * 0.01}
                      fontSize  = {21}
                      marginLeft= {20}
                      title={"Bounty"}
                      color = {"#3F3D56"}
                      opacity={opacity_bounty}
                  />
                </TouchableOpacity>
               
           
               
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
          </View>
          
        </View>

        {selectedMenu == "explore" &&
          <RenderExplore/>
        }

        {selectedMenu == "bounty" &&
          <RenderBounty/>
        }
        
        
        
        
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
    height: windowHeight * 0.12,
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
    minHeight : windowHeight * 0.80,
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
    height :40,
    paddingHorizontal : 15,
    backgroundColor : WARNA_UTAMA,
    borderRadius    : 50,
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
    marginVertical:5,
      
  }, 
  button : {
    marginVertical:5,
    height :40,
    paddingHorizontal : 15,
    backgroundColor : '#fff',
    borderRadius    : 50,
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
