import React, {useEffect, useState}  from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    ImageBackground,FlatList, SafeAreaView,
    TextInput,
    Dimensions, StatusBar, TouchableOpacity, 
    
  } from 'react-native';
  import FastImage from 'react-native-fast-image'
import {IconCaretDown,DefaultProfile, IconDerajat,IconPicture,IconFont} from '../../assets';
import {PlainText, HeaderText, InputText, LoadingIndicator, ButtonPrimary,CommentCard} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_DISABLE, OpenSansBold, OpenSans} from '../../utils/constant';
import { Modal, ModalContent, ModalPortal  } from 'react-native-modals';
import {ScrollView} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const Commentar = ({navigation, route}) => {
    const [isLoading, setLoading] = useState(false)
    const { token,data } = useSelector (state => state.authReducers);
    const {listCommentar, id_answer, isSolved, id_question} = route.params;
    const [reply, setReply] = useState("")
    const [listComment, setListComment] = useState(listCommentar)

    const addComment = async () => {
        setLoading(true)
        var form_data = new FormData()
        form_data.append('id_answer', id_answer)
        // data.append('img', img)
        form_data.append('comments', reply)

        axios.post ('https://askhomelab.com/api/create_answer_comments',
        form_data,
        {
            headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
        }).then(function(response) {
            let new_comment = {
                'comment':{
                    'First_Name_Comment':'Hallo',
                    'Last_Name_Comment': 'Hallo',
                    'Date_Comment': new Date(),
                    'Status_User_comment' : 'True',
                    'Comment' : reply,
                    'Photo_User_Comment' : data[2].picture
                }
            }
           
            setListComment([...listComment, new_comment])
            setLoading(false)
        }).catch(function(error){
            setLoading(false)
            let new_comment = {
                'comment':{
                    'First_Name_Comment':'Hallo',
                    'Last_Name_Comment': 'Hallo',
                    'Date_Comment': new Date(),
                    'Status_User_comment' : 'True',
                    'Comment' : reply,
                    'Photo_User_Comment' : data[2].picture
                }
            }
            setListComment([...listComment, new_comment])
            
        })
    }

    useEffect(() => {
        console.log("list : "+ JSON.stringify(listCommentar))
        console.log("id_answer : "+ id_answer)
    }, [])

    const renderComment = ({item}) => {
        if (checkComment () > 0) {
            return(
                <CommentCard
                    name= {item.comment.First_Name_Comment+" "+item.comment.Last_Name_Comment}
                    time = {item.comment.Date_Comment}
                    comment = {item.comment.Comment}
                    is_me = {item.comment.Status_User_comment}
                    picture = {item.comment.Photo_User_Comment}
                />
                
            )
        }
    }

    const checkComment = ()=>{
        console.log("jum_coment:"+listComment)
        var jum_commentar = 0; 
        listComment.map(data=>{
            if(data.comment == "comment_is_null"){
                jum_commentar = "No"
            }else{
                jum_commentar = listComment.length
            }
            
        })

        return jum_commentar
        
    }
    return (
        <View style={styles.container}>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading && 
                <View style={styles.body}>
                
                    <SafeAreaView style={{flex :1}}
                                    >
                    
                    
                    <FlatList
                            data={listComment}
                            keyExtractor={(item) => console.log(item)}
                            renderItem={renderComment}
                            showsVerticalScrollIndicator={false}
                            />
                    
                    
                    
                    </SafeAreaView>
               
            
            <View style={styles.footer}> 
                <InputText 
                    width       = {windowWidth * 0.7}
                    placeholder = "Reply ..." 
                    secureTextEntry = {false} 
                    onChangeText= {(text) => setReply(text)}
                    value={reply}
                    marginTop={0}
                    height = {40}
                    error="first"
                    />
                <ButtonPrimary 
                    title="Send"
                    width={windowWidth*0.18}
                    fontSize={13}
                    onPress= {() => addComment()}
                />
            </View>

                </View>
            }
        </View>
    )
}

export default Commentar

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor : '#FFF2D7',
    },
    body : {
        flex:1

    },
    footer :{
        height:56,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        bottom:0,
        elevation: 5,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal: windowWidth*0.05,
    }
})
