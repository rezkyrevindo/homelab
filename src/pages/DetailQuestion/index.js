import React,  { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  TouchableHighlight, TextInput, Alert,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import {IconCaretDown, IconDerajat,IconPicture,IconFont, IconPoints} from '../../assets';
import {PlainText, HeaderText, InputText,AnswerCard,  QuestionCard} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailQuestion = ({route, navigation}) => {
    const [solved, setSolved] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const {isSolved} = route.params;


    const renderContent = () => (
        <View
          style={{
            
            backgroundColor: WARNA_UTAMA,
            padding: 16,
            height: "100%",
            borderRadius:20,
          }}
        >
          <Text>Swipe down to close</Text>
        </View>
      );
    
    const sheetRef = React.useRef(null);
    
    return (
        <View style={styles.container}>
        
            { JSON.stringify(isSolved) == "true" &&
                <View style={{height: 80, backgroundColor:WARNA_SUCCESS, alignItems:'center', justifyContent:'center'}}>
                    <PlainText
                        title={"Question Solved"}
                        color={"#fff"}
                        fontStyle={"bold"}
                        fontSize = {14}
                    />
                    <PlainText
                        title={"Jawaban relevan "}
                        color={"#fff"}
                        fontSize = {11}
                    />
                    <PlainText
                        title={"adalah jawaban yang ada tanda centang"}
                        color={"#fff"}
                        fontSize = {11}
                    />
                </View>
            }
            <View style={{height:'93%'}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal : windowWidth * 0.05}}>
                    <QuestionCard
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
                            title={"Answer"}
                            color={"#000"}
                            fontStyle={"bold"}
                            fontSize = {14}
                        />
                        
                    </View>

                    <AnswerCard
                        name = 'Rezky Revindo'
                        time = '1 d ago'
                        isRelevant={false}
                        like = '5'
                        question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
                    />
                    <AnswerCard
                        name = 'Rezky Revindo'
                        time = '1 d ago'
                        isRelevant={false}
                        like = '2'
                        question={"I have a question, I hope you can explain it to me. What is the Big Bang theory? How does the Big Bang theory explain the origin of the universe?"}
                    />
                    <View style={{padding:10}}></View>
                </ScrollView>
            </View>
            { !JSON.stringify(isSolved) != "true" &&
                <TouchableOpacity
                    onPress={() => sheetRef.current.snapTo(1)}
                    style={{height: "7%", backgroundColor:WARNA_UTAMA, alignItems:'center', justifyContent:'center'}}>
                    <PlainText
                        title={"Answer"}
                        color={"#000"}
                        fontStyle={"bold"}
                        fontSize = {14}
                    />
                   
                </TouchableOpacity>
            }
            
            <BottomSheet
                ref={sheetRef}
                snapPoints={['80%', "40%", 0]}
                initialSnap={2}
                borderRadius={10}
                renderContent={renderContent}
            />
           
        </View>
        
    )
}

export default DetailQuestion

const styles = StyleSheet.create({
    
    centeredView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-end',
      },
    content : {
       backgroundColor:'#ffffff',
       
        flexDirection : 'column',
        margin : windowWidth * 0.05

    },
    container: {
        flex: 1,
        backgroundColor : '#FAFAFA',
    },
    headerContent : {
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : windowWidth * 0.9,
        padding : windowWidth * 0.05,
        borderRadius    : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    bodyContent :{
        marginTop : 20,
        backgroundColor : '#fff',
        flexDirection : 'column',
        justifyContent : 'space-between',
        width : windowWidth * 0.9,
        borderRadius    : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginBottom : 10
    },
    footerContent :{
        marginTop : 20,
        
        backgroundColor : '#fff',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems:'center',
        width : windowWidth * 0.9,
        borderRadius    : 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginBottom : 10,
        paddingHorizontal: 20,
        paddingVertical : 10,
    },
    inputContainer: {
        flexDirection: "row",
        width: "100%",
        
        borderRadius: 10,
        backgroundColor: "transparent",
        textAlignVertical: 'top',
        padding: 20
    },
    btn :{
        backgroundColor: WARNA_UTAMA,
        borderRadius : 10,
        padding : 10,
        width : '40%',
        alignItems:'center'
    }
    
})
