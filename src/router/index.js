import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Splash, Akun, CreateQuestion, Login,RegisterSuccess, Register,DetailQuestion ,Verification, ConfirmationSuccess, 
  Landing,Explore, MyDetailQuestion ,Notification , KonfirmasiTopUp,ForgotPassword, ForgotPasswordSuccess, Interest, Commentar, TopUp,
PembayaranTopUp, WaitingTopUp, Withdraw, PilihBank, AddAccountBank, WithdrawDetail, WithdrawKonfirmasi, Setting, MyQuestion, MyAnswer,
VerifikatorLogin, MyUnlockQuestion} from '../pages';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Explore} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={Akun} />
      </Tab.Navigator>
  );
};


const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
      <Stack.Screen name="CreateQuestion" component={CreateQuestion} options={{headerTitle: 'Create Question'}}/>
      <Stack.Screen name="MyDetailQuestion" component={MyDetailQuestion} options={{headerTitle: 'My Question'}}/>
      <Stack.Screen name="MyUnlockQuestion" component={MyUnlockQuestion} options={{headerTitle: 'My Unlock Question'}}/>
      <Stack.Screen name="DetailQuestion" component={DetailQuestion} options={{headerTitle: 'Question'}}/>
      <Stack.Screen name="Login" component={Login} 
      options={
        {
          headerTitle : 'Masuk',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
        <Stack.Screen name="VerifikatorLogin" component={VerifikatorLogin}
         options={{ headerShown: false }}

      />
        <Stack.Screen name="Setting" component={Setting} 
      options={
        {
          headerTitle : 'Pengaturan',
          
        }} />
      <Stack.Screen name="TopUp" component={TopUp} 
      options={
        {
          headerTitle : 'Top Up',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
        <Stack.Screen name="MyQuestion" component={MyQuestion} 
      options={
        {
          headerTitle : 'Pertanyaan Saya',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
        <Stack.Screen name="MyAnswer" component={MyAnswer} 
      options={
        {
          headerTitle : 'Jawaban Saya',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="AddAccountBank" component={AddAccountBank} 
      options={
        {
          headerTitle : 'Gopay',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="WithdrawDetail" component={WithdrawDetail} 
      options={
        {
          headerTitle : 'Detail',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="Withdraw" component={Withdraw} 
      options={
        {
          headerTitle : 'Withdraw',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="PembayaranTopUp" component={PembayaranTopUp} 
      options={
        {
          headerTitle : 'Pembayaran',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="WaitingTopUp" component={WaitingTopUp} 
      options={
        {
          headerTitle : 'Menunggu Pembayaran',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="KonfirmasiTopUp" component={KonfirmasiTopUp} 
      options={
        {
          headerTitle : 'Konfirmasi',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="WithdrawKonfirmasi" component={WithdrawKonfirmasi} 
      options={
        {
          headerTitle : 'Konfirmasi',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="PilihBank" component={PilihBank} 
      options={
        {
          headerTitle : 'Pilih Bank',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }} />
      <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }}/>
      <Stack.Screen name="ConfirmationSuccess" component={ConfirmationSuccess} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} 
         options={
        {
          headerTitle : 'Buat Akun',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }}
      />
      <Stack.Screen name="Interest" component={Interest} 
         options={
        {
          headerTitle : 'Pilih Minatmu',
          headerTitleStyle:{
            alignSelf : 'center',
            
          },
        }}
      />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} 
         options={
        {
          headerTitle : 'Buat Akun',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
          headerShown:false
        }}
      />
      <Stack.Screen name="ForgotPasswordSuccess" component={ForgotPasswordSuccess} 
         options={
        {
          headerTitle : 'Buat Akun',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
          headerShown:false
        }}
      />
       <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
         options={
        {
          headerTitle : 'Lupa Password',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }}
      />
       <Stack.Screen name="Commentar" component={Commentar} 
         options={
        {
          headerTitle : 'Commentar',
          headerTitleStyle:{
            alignSelf : 'center',
            marginLeft : -60,
            
          },
        }}
      />
      
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
