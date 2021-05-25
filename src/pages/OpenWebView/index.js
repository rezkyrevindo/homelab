import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
const OpenWebView = ({navigation, route}) => {
    const [webViewRef, setWebViewRef] = useState("")
    const {url, title} = route.params
    useEffect(() => {
        navigation.setOptions({ title: title })
    }, [])
    return (
        
        <WebView 
        source={{ uri: url }}
       
        ref={ref => setWebViewRef(ref) }
    />
        
    )
}

export default OpenWebView

const styles = StyleSheet.create({})
