import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { ModalPortal } from 'react-native-modals';
import Router from './router';


const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <ModalPortal />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
