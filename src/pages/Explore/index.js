import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,SafeAreaView,
  View,
  ImageBackground, FlatList,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';
import {IconCaretDown, IconPoints, ImgNothingQuestion} from '../../assets';
import {PlainText, HeaderText, InputText, QuestionCard, LoadingIndicator} from '../../components/';
import { WARNA_UTAMA, WARNA_DISABLE, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals'
import FastImage from 'react-native-fast-image'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const headerHeight = windowHeight * 0.25;
const StatusBarHeight = 30;

const Explore = ({navigation}) => {
  const { token,data } = useSelector (state => state.authReducers);
  const [listCategory, setListCategory] = useState([]) 
  const [selectedMenu , setSelectedMenu] = useState("bounty")
  const [modalKategori, setModalKategori] = useState(false)
    const [modalPoint, setModalPoint] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [listQuestion, setListQuestion] = useState([])
  const [opacity_bounty, setOpacityBounty] = useState(1)
  const [selectedPoint, setSelectedPoint] = useState("25")
  const [isLoadingContent, setLoadingContent] = useState(false)
  const listPoints = [{id:'25', name:'25'}, {id:'15', name:'15'} , {id:'10', name:'10'},  {id:'5', name:'5'} ,  {id:'6', name:'All'}]
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  const [selectedKategoriName, setSelectedKategoriName] = useState('Pilih Tag')



  useEffect(() => {
    getCategory()
  }, [])


  useEffect(() => {
    getQuestionByTag()
    
  }, [selectedId, selectedPoint])

  

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


  
  const getQuestionByTag = async () =>{
    
    setLoadingContent(true)
    var data = new FormData();        
    
    if (selectedId != null){
      data.append('id_sub_category', selectedId)
    }

    if(selectedPoint != "6"){
      data.append('point', selectedPoint)
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
                
                setListQuestion(response.data.Data)
                
              }else{
                setListQuestion(null)
              }
              setLoadingContent(false)
          })
          .catch(function (error) {
              setLoadingContent(false)
          });
    
  
  }
  
  const renderItem = ({item}) =>{
      return (
        <QuestionCard
          onPress={() => {
                navigation.navigate('DetailQuestion', {isSolved: item.Solved_Status,id_question: item.id_Question });
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

  const RenderBounty = () => (
      <View style={styles.content}>
      { isLoading &&
          <LoadingIndicator/>
        }
      { !isLoading &&
        <View style={{flex:1}}>
    
        { isLoadingContent &&
          <View style={{marginTop:100}}>
          <LoadingIndicator/>
          </View>
          
        }
        { !isLoadingContent &&
          <View style={{flex:1}}>
          
            { listQuestion == null &&
              
              <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
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
            
          </View>
        }
          
          
        </View>
      }

      
    


  </View>
  );

  const KategoriModal = ()=>{
    return (
        <Modal
            visible={modalKategori}
            onTouchOutside={() => { setModalKategori(false)}}
        >
            <ModalContent>
                <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                    
                <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                    <FlatList
                    maxHeight={windowHeight * 0.4}
                    data={listCategory}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={RenderKategori}
                    showsHorizontalScrollIndicator={false}
                    extraData={selectedId}
                    />
                    
                </SafeAreaView>
                </View>
                
            </ModalContent>
        </Modal>
    )
}
  const PointModal = ()=>{
    return (
        <Modal
            visible={modalPoint}
            onTouchOutside={() => { setModalPoint(false)}}
        >
            <ModalContent>
                <View style={{ width:windowWidth*0.5, alignItems:'center'}}>
                <SafeAreaView style={{marginTop:10, flexDirection : 'row', paddingBottom : 5}}>
                    <FlatList
                    maxHeight={windowHeight * 0.4}
                    data={listPoints}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={RenderPoint}
                    showsHorizontalScrollIndicator={false}
                    extraData={selectedPoint}
                    />
                    
                </SafeAreaView>
                </View>
                
            </ModalContent>
        </Modal>
    )
  }
  const RenderPoint = ({item}) => {
    const isSelected = item.id == selectedPoint ? true: false;
    return (
        <View>
        {isSelected &&
            <TouchableOpacity style={{backgroundColor:WARNA_UTAMA,padding:10, alignItems:'center', borderRadius:15}}
                
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
        }
        {!isSelected &&
            <TouchableOpacity style={{padding:10, alignItems:'center'}}
                onPress={() => {
                    setSelectedPoint(item.id);
                    setModalPoint(false)
                }}
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
        }
        </View>
       
    )
}

const RenderKategori = ({item,index}) => {
    const isSelected = item.id == selectedId ? true: false;
    return (
        <View>
        {isSelected &&
            <TouchableOpacity style={{backgroundColor:WARNA_UTAMA,padding:10, alignItems:'center', borderRadius:15}}
                
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
        }
        {!isSelected &&
            <TouchableOpacity style={{padding:10, alignItems:'center'}}
                onPress={() => {
                    setSelectedId(item.id)
                    setSelectedIndexTag(index)
                    setSelectedKategoriName(item.name)
                    setModalKategori(false)
                }}
            >
                <PlainText
                    title={item.name}
                    color={"#000"}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
            </TouchableOpacity>
        }
        </View>
       
    )
}


  return (
    <View style={styles.page}>
      <PointModal/>
      <KategoriModal/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerWrap}>
            <View style={{width : windowWidth * 0.9,flexDirection : 'row' , justifyContent : 'space-between'}}>
              <View style={{flexDirection:'row'}}>
               
                
                <TouchableOpacity
                  onPress={() => setSelectedMenu("bounty")}
                >
                  <HeaderText
                      marginTop = {windowHeight * 0.01}
                      fontSize  = {21}
                      title={"Explore"}
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

        {selectedMenu == "bounty" &&
          <RenderBounty/>
        }
        
        
        
        
      </ScrollView>
      <View style={{
        paddingHorizontal:20,
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor : '#fff',
        
      }}>
            
            <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=> setModalPoint(true)}>
                <IconPoints/>
                {selectedPoint == "6" &&
                <PlainText
                    marginLeft= {10}
                    title={"All"}
                    color={WARNA_UTAMA}
                    fontSize= {14}
                    fontStyle={"bold"}
                />

                }
                {selectedPoint != "6" &&
                <PlainText
                    marginLeft= {10}
                    title={selectedPoint}
                    color={WARNA_UTAMA}
                    fontSize= {14}
                    fontStyle={"bold"}
                />

                }
               
                <PlainText
                    title={" poin"}
                    color={WARNA_UTAMA}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
                <IconCaretDown style={{marginLeft:10}} fill={WARNA_UTAMA} width={12} height={12} />
            </TouchableOpacity>
            
            <TouchableOpacity style={{flexDirection :'row', alignItems:'center'}} onPress={()=>setModalKategori(true)}>
                
            
                <PlainText
                    marginLeft= {10}
                    title={selectedKategoriName}
                    color={WARNA_UTAMA}
                    fontSize= {14}
                    fontStyle={"bold"}
                />
                <IconCaretDown style={{marginLeft:10}} fill={WARNA_UTAMA} width={12} height={12} />
            </TouchableOpacity>
            
            
        

        </View>
    </View>
  );
};

export default Explore;


const styles = StyleSheet.create({
  page: {
    flex: 1,
   
    backgroundColor : '#FAFAFA',
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
    flex:1,
    
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
