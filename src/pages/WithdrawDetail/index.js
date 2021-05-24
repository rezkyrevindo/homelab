import React, {useState, useEffect} from 'react'
import {
    StyleSheet,Alert,
    View,
    Dimensions,StatusBar, TouchableOpacity, Text
  } from 'react-native';
import {ImgWithdraw, IconPoints, IconRiwayat, IconWallet} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING, BASE_URL_API} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;

const WithdrawDetail = ({navigation}) => {
    const { token,data } = useSelector (state => state.authReducers);
    const [amount, setAmount] = useState(0)
    const [afterWithdraw, setAfterWithdraw] = useState(0)
    const [canWithdraw, setCanWithdraw] = useState(false)
    const [receive, setReceive] = useState(0)
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        if(parseInt(amount) > parseInt(data[2].point)){
            setAmount(data[2].point)
            
        }
        let sisa = 0
        sisa = parseInt(data[2].point) - parseInt(amount)
        setAfterWithdraw(sisa)

        if(parseInt(amount) >= 1000){
            setCanWithdraw(true)
            let _receive = 0
            let fee = 0
            _receive = (parseInt(amount) * 27)
            fee = _receive * 0.05
            if(fee < 5000){
                fee = 5000
            }
            setReceive(Math.trunc(_receive - fee))
        }else{
            setReceive(0)
            setCanWithdraw(false)
        }
        
        
    }, [amount])

    const withdraw = async () =>{
        setLoading(true)
        var data = new FormData();        
        data.append('point', amount)
        data.append('acum_price', receive)
        data.append('description', "withdraw")
        data.append('status', "pending")

        axios.post(BASE_URL_API+'order',
        data,
        {
            headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : "Bearer "+token   
            }  
           
        })
            .then(function (response) {
                console.log(response.data.message)
                if (response.data.message == "successful"){
                    
                    setLoading(false)
                    Alert.alert(
                        "Withdraw Berhasil",
                        "Penarikan telah berhasil dilakukan, penarikan akan diproses oleh Admin.",
                        [
                          
                            { text: "OK", onPress: () => {
                            
                            navigation.replace("MainApp")
                            } }
                        ]
                        );
                
                    
                }else{
                
                }
            })
            .catch(function (error) {
                console.log(error)
                    setLoading(false)
            });
    }
    return (
        <View style={styles.container}>
            {isLoading &&
                <LoadingIndicator/>
            }
            {!isLoading &&
                <View style={styles.container}>
                    <PlainText
                    fontSize={18}
                    title="Rekening Penerima"
                    fontStyle="bold"
                    color={"#000"}  
                />
                <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
                    <IconWallet/>
                    <View style={{marginLeft:20}}>
                        <PlainText
                            fontSize={14}
                            title={data[2].first_name + " "+ data[2].last_name}
                            fontStyle="bold"
                            color={"#000"}  
                        />
                        <PlainText
                            fontSize={14}
                            title={data[2].bank+" - "+data[2].account_number}
                            color={"#000"}  
                        />
                    </View>
                    
                </View>
                <View style={styles.header}>
                    <PlainText
                        fontSize={24}
                        title="Enter Amount"
                        fontStyle="bold"
                        color={"#000"}  
                    />
                    <PlainText
                        fontSize={14}
                        title="Enter your amount and continue"
                        color={"#000"}  
                        marginTop={10}
                    />
                    <InputText 
                        width       = {windowWidth * 0.8}
                        placeholder = "Jumlah" 
                        secureTextEntry = {false} 
                        onChangeText= {(text) => setAmount(text)}
                        value={amount}
                        error={"first"}
                        keyboardType={"numeric"}
                        />
                    <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <PlainText
                            fontSize={14}
                            title="Minimum Withdraw"
                            color={"#000"}
                        />
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <PlainText
                                fontSize={14}
                                title={"1000"}
                                color={"#000"}  
                            />
                            <IconPoints width={24} height={24} style={{marginLeft:10}}/>
                        </View>
                    </View>    
                    <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <PlainText
                            fontSize={14}
                            title="Current Point"
                            color={"#000"}
                        />
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <PlainText
                                fontSize={14}
                                title={data[2].point}
                                color={"#000"}  
                            />
                            <IconPoints width={24} height={24} style={{marginLeft:10}}/>
                        </View>
                    </View>
                    <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <PlainText
                            fontSize={14}
                            title="After Withdraw"
                            color={"#000"}
                        />
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <PlainText
                                fontSize={14}
                                title={afterWithdraw}
                                color={"#000"}  
                            />
                            <IconPoints width={24} height={24} style={{marginLeft:10}}/>
                        </View>
                    </View>
                    <View style={{width : windowWidth * 0.8, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <PlainText
                            fontSize={14}
                            title="You Will Receive"
                            color={"#000"}
                        />
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <PlainText
                                fontSize={14}
                                title={"Rp."+receive}
                                color={"#000"}  
                            />
                        </View>
                    </View>
                </View>
                {canWithdraw &&
                    <ButtonPrimary  
                        onPress={() => {
                            withdraw()
                        }}
                        title="Lanjutkan"
                        width={windowWidth*0.9}
                        marginTop   = {windowHeight * 0.05}
                    /> 
                }
                </View>
            }
           
            
        </View>
    )
}

export default WithdrawDetail

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'white' ,
        padding:20,
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#ffff",
        marginTop:20,
    },
    logo : {
        width : "80%", 
        height: windowHeight * 0.20
    },
    body:{
        flex: 1,
        paddingVertical :20
    },
    otherLogin : {
        flexDirection   : 'row',
        width           : windowWidth * 0.30,
        textAlign       : 'center',
        justifyContent  : 'space-between',
        marginLeft      : windowWidth * 0.35,
        marginRight     : windowWidth * 0.35,
        marginTop       : windowHeight * 0.02,
    }, 
})
