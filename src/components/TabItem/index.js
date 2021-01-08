import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {IconUnderline,IconMenu, IconExplore, IconHome, IconHomeActive, IconSearch, IconSearchActive, IconNotificationActive, IconNotification
,IconChat, IconChatActive, IconUser, IconUserActive } from '../../assets'

import { WARNA_UTAMA, WARNA_DISABLE } from '../../utils/constant'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const navHeight     = windowHeight * 0.07;

const TabItem = ({isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
      if(label === "Home") return isFocused ? <IconHome width={24} height={24} fill={WARNA_UTAMA} style={styles.iconStyle}/> : <IconHome width={24} height={24} fill={"#979797"}  style={styles.iconStyle}/>

      if(label === "Search") return isFocused ? <IconExplore width={24} height={24} fill={WARNA_UTAMA}  style={styles.iconStyle}/> : <IconExplore width={24} height={24} fill={"#979797"}  style={styles.iconStyle}/>

      if(label === "Notification") return isFocused ? <IconNotification width={24} height={24} fill={WARNA_UTAMA}  style={styles.iconStyle}/> : <IconNotification width={24} height={24} fill={"#979797"}  style={styles.iconStyle}  />

      if(label === "Profile") return isFocused ? <IconUserActive width={24} height={24} fill={WARNA_UTAMA}  style={styles.iconStyle}  /> : <IconUser width={24} height={24} fill={"#979797"}  style={styles.iconStyle} />

      return <IconHome />
  }
  const Underline = () => {
    if(label === "Home") return isFocused ? <IconUnderline style={styles.underline}/>  : <View></View> 

    if(label === "Search") return isFocused ? <IconUnderline style={styles.underline}/>   : <View></View> 

    if(label === "Notification") return isFocused ? <IconUnderline style={styles.underline}/>  : <View></View> 


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
