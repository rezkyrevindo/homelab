import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,ScrollView,Button,Alert,
    Dimensions,StatusBar, TouchableHighlight, Text
  } from 'react-native';
import {ImgPayment, IconWallet, IconCaretDown, IconCaretLeft, IconCaretUp} from '../../assets';
import {WARNA_UTAMA, WARNA_WARNING, BASE_URL_API} from '../../utils/constant';
import {ButtonPrimary, InputText, HeaderText, PlainText, ButtonWithIcon, LoadingIndicator} from '../../components'
import FastImage from 'react-native-fast-image'
import BottomSheet from 'reanimated-bottom-sheet';
import HTML from "react-native-render-html";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height - 56;
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import { snap, topup } from '../../redux/actions';

const PembayaranTopUp = ({navigation, route}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() =>{
                        Alert.alert(
                        "Batal Beli Point?",
                        "Yakin membatalkan pembelian point?",
                        [
                            {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                            },
                            { text: "OK", onPress: () => {
                            setSnap("","","")
                            navigation.replace("MainApp")
                            } }
                        ]
                        );
                     }}
                    title="Batal"
                     color="#000"
                />
                ),
        });
      }, [navigation]);
    const {_acum_price, _point} = route.params;
    const { token,data, snapToken,clientKey, production, acum_price, point } = useSelector (state => state.authReducers);
    const dispatch = useDispatch();
    
    const topUp = (token,point,acum_price,description, status) => dispatch(topup(token,point, acum_price, description, status))
    const setSnap = (snap1, client, production, acum_price, point) => dispatch(snap(snap1, client, production, acum_price, point))
    const [isLoading, setLoading] = useState(false)
    const acum_price__ = _acum_price
    const point__ = _point
    const [snapToken_, setSnapToken] = useState(snapToken)
    const [webViewRef, setWebViewRef] = useState("")
    const [serverKey, setServerKey] = useState("")
    const [clientKey_, setClientKey] = useState(clientKey)
    const [production_, setProduction] = useState(production)
    
    

    useEffect(() => {

        if(snapToken !=''){
            
        }else{
            getData();
        }
        
    }, [])


    const getData = async () =>{
        setLoading(true)
        
        var data = new FormData()
        data.append('acum_price' , acum_price__)
        axios.post(BASE_URL_API+'order_topup',
        data,
        {
            headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data',
            "Authorization" : "Bearer "+token
            }  
        })
            .then(function (response) {
                let data = response.data
                setSnapToken(data.Snap_Token)
                setClientKey(data.Midtrans_Client_Key)
                setProduction(data.Midtrans_Production)
                setSnap(data.Snap_Token, data.Midtrans_Client_Key, data.Midtrans_Production)
                
                
                
                console.log(response.data)
                setLoading(false)
            })
            .catch(function (error) {
                setLoading(false)
                console.error(error)
            });
    }


    return (
        <View style={styles.container}>
        {!isLoading &&
        <WebView 
            source={{ uri: 'http://askhomelab.com/binance/index.php?snap="'+snapToken_+'"&clientKey="'+clientKey_+'"&production="'+production_+'"' }}
            onMessage={ (event) => {
                    console.log(event.nativeEvent.data.status_code)
                    var result = JSON.parse(event.nativeEvent.data);
                    if(result.status_code == "409"){
                        let description = "top-up"
                        let status = 'success'
                        topUp(token, point__, acum_price__, description, status)
                        navigation.replace("ConfirmationSuccess")
                       
                    }else{
                        webViewRef.reload()
                    }
                    
                }}
            ref={ref => setWebViewRef(ref) }
        />
        }
        {isLoading &&
            <LoadingIndicator/>
        }
        </View>
        
    )
}

export default PembayaranTopUp

const styles = StyleSheet.create({
    container:{
        height:windowHeight,
        backgroundColor:'white' 
    },
    header: {
        padding : 20,
        alignItems : 'center',
        backgroundColor:"#FFF2D7",
    },
    logo : {
        width : "80%", 
        height: windowHeight * 0.20
    },
    body:{
        flex: 1,
        paddingVertical :20,
        alignItems:'center'
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
