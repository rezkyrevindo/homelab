import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {IconUnderline,IconMenu, IconMenuActive, IconHome, IconHomeActive, IconSearch, IconSearchActive, IconNotificationActive, IconNotification
,IconChat, IconChatActive, IconUser, IconUserActive } from '../../assets'

import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const navHeight     = windowHeight * 0.07;

const TabItem = ({isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
      if(label === "Home") return isFocused ? <IconHomeActive style={styles.iconStyle}/> : <IconHome style={styles.iconStyle} />

      if(label === "Search") return isFocused ? <IconSearchActive style={styles.iconStyle}/> : <IconSearch style={styles.iconStyle} />

      if(label === "Notification") return isFocused ? <IconNotificationActive style={styles.iconStyle}/> : <IconNotification style={styles.iconStyle} />

      if(label === "Chat") return isFocused ? <IconChatActive style={styles.iconStyle}/> : <IconChat style={styles.iconStyle} />

      if(label === "Profile") return isFocused ? <IconUserActive style={styles.iconStyle}/> : <IconUser style={styles.iconStyle} />

      return <IconHome />
  }
  const Underline = () => {
    if(label === "Home") return isFocused ? <IconUnderline style={styles.underline}/>  : <View></View> 

    if(label === "Search") return isFocused ? <IconUnderline style={styles.underline}/>   : <View></View> 

    if(label === "Notification") return isFocused ? <IconUnderline style={styles.underline}/>  : <View></View> 

    if(label === "Chat") return isFocused ? <IconUnderline style={styles.underline}/>  : <View></View> 

    if(label === "Profile") return isFocused ? <IconUnderline style={styles.underline}/> : <View></View> 

    return <IconHome />
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <View style={styles.wrap}>
        <Icon />
        <Underline/>
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
      flexDirection : 'row',
    },
    iconStyle : {
      marginTop : navHeight * 0.2,
      height   : navHeight * 0.5,
      width     : navHeight * 0.5,
    },
    wrap  : {
      flexDirection : 'column',
      alignItems : 'center',
    },
    underline :{
      
      height   : navHeight * 0.2,
      width     : navHeight * 0.5,
    }
   
});
