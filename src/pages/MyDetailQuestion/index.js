import React,  { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  Dimensions, StatusBar, TouchableOpacity, 
} from 'react-native';

import {PlainText, HeaderText, InputText,AnswerCard,  QuestionCard} from '../../components/';
import {WARNA_ABU_ABU, WARNA_UTAMA, WARNA_SUCCESS, OpenSansBold, OpenSans} from '../../utils/constant';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyDetailQuestion = (props) => {
    const [solved, setSolved] = useState(false);
    return (
        <View style={styles.container}>
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
            { !solved &&
                <TouchableOpacity style={{height: 60, backgroundColor:WARNA_SUCCESS, alignItems:'center', justifyContent:'center'}}>
                    <PlainText
                        title={"Close This Answer"}
                        color={"#fff"}
                        fontStyle={"bold"}
                        fontSize = {14}
                    />
                    <PlainText
                        title={"Means question is already answered"}
                        color={"#fff"}
                        fontSize = {11}
                    />
                </TouchableOpacity>
            }
           
        </View>
    )
}

export default MyDetailQuestion

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fafafa',
        
    }
    
})
