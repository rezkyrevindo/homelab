import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from 'react-native-modals';
import Router from './router';
import { Provider } from 'react-redux';// Add
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const App = () => {
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
