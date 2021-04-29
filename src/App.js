import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { StyleSheet, Text, View ,Alert , LogBox} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from 'react-native-modals';
import Router from './router';
import { Provider } from 'react-redux';// Add
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';


const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
    //  console.log(fcmToken);
    //  console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken()
      console.log('Authorization status:', authStatus);
    }
  }
  return (
    <Provider store= {store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Router />
          <ModalPortal />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
  )
}

export default App

const styles = StyleSheet.create({})
