import axios from 'axios';

// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = "LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE"
export const NOTIF = "NOTIF"
export const TOPUP = "TOPUP"
export const SNAP = "SNAP"


import Snackbar from 'react-native-snackbar';

import {WARNA_UTAMA, WARNA_WARNING,BASE_URL_API} from '../utils/constant';

export const refresh = () =>{
    try {
        return async dispatch =>{
            dispatch ({
                type:"REFRESH"
            })
        }
    }catch(error){
        console.log(error)
    }
}

export const updateProfile = (token) => {
    try {
         return async dispatch => {
        
           
            axios.get('https://askhomelab.com/api/view_setting', {
                headers: {
                    "Authorization" : 'Bearer ' + token
                }
            }).then(function (res){
                dispatch({
                    type : UPDATE_PROFILE,
                    payload : res.data
                })
                console.log(res.data)
            }).catch(function (err){

                console.log(err)
            });
            
        }
    }catch (error){
        console.log(error)
    }
};

export const update_notification = (notif) =>{
    try {
        return async dispatch => {
            dispatch({
                type : NOTIF,
                payload : notif
            })
        }
    }catch (error){
        console.log(error)
    }
}

export const login =  (email,password) => {
    try {
        
         return async dispatch => {
            
            var data = new FormData();        
            data.append('email', email)
            data.append('password', password)

            axios.post('https://askhomelab.com/api/login_app',
            data,
            {
                headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data'
                }  
            })
                .then(function (response) {
                    if (response.data){
                         dispatch({
                            type : LOGIN,
                            payload : response.data
                        })
                        Snackbar.show({
                            text: "Login berhasil",
                            duration: Snackbar.LENGTH_INDEFINITE,
                            action: {
                                text: 'Ok',
                                textColor: WARNA_UTAMA,
                                onPress: () => { /* Do something. */ },
                            },  
                            });
                        
                    }else{
                        Snackbar.show({
                            text: "Username atau password salah",
                            duration: Snackbar.LENGTH_INDEFINITE,
                            action: {
                                text: 'Ok',
                                textColor: WARNA_UTAMA,
                                onPress: () => { /* Do something. */ },
                            },  
                            });
                            dispatch({
                                type : LOGIN,
                                payload : {token:'false'}
                            })
                    }
                })
                .catch(function (error) {
                    Snackbar.show({
                        text: "Username atau password salah",
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                            text: 'Ok',
                            textColor: WARNA_UTAMA,
                            onPress: () => { /* Do something. */ },
                        },  
                        });
                        dispatch({
                            type : LOGIN,
                            payload : {token:'false'}
                        })
                });
        }
    }catch (error){
        console.log(error)
    }
};



export const topup =  (token, point, acum_price, description, status ) => {
    try {
        
         return async dispatch => {
            
            var data = new FormData();        
            data.append('point', point)
            data.append('acum_price', acum_price)
            data.append('description', description)
            data.append('status', status)

            axios.post('https://askhomelab.com/api/order',
            data,
            {
                headers : {
                Accept : '*/*',
                "content-type" :'multipart/form-data',
                "Authorization" : "Bearer "+token
                }  
               
            })
                .then(function (response) {
                    if (response.data.message == "successful"){
                        
                        dispatch({
                            type : TOPUP,
                            payload :  ''
                        })
                    
                        
                    }else{
                    
                    }
                })
                .catch(function (error) {
            
                        dispatch({
                            type : TOPUP,
                        })
                });
        }
    }catch (error){
        console.log(error)
    }
};

export const snap = (snap, client, production) =>{
    try {
        return async dispatch =>{
           let data = {
               snap, client, production
           }
           dispatch({
            type : SNAP,
            payload : data
        })
        }
    }catch(error){
        console.log(error)
    }
};
export const addLogin = (email,password) => (dispatch) => {
    return new Promise( (resolve, reject) => {
        var successful= false
        var data = new FormData();        
        data.append('email', email)
        data.append('password', password)

        axios.post('https://askhomelab.com/api/login_app',
        data,
        {
            headers : {
            Accept : '*/*',
            "content-type" :'multipart/form-data'
            }  
        })
            .then(function (response) {
                if (response.data){
                     dispatch({
                        type : LOGIN,
                        payload : response.data
                    })
                    successful = true
                    
                    axios.get('https://askhomelab.com/api/view_setting', {
                        headers: {
                            "Authorization" : 'Bearer ' + response.data.token
                        }
                    }).then(function (res){
                        dispatch({
                            type : UPDATE_PROFILE,
                            payload : res.data
                        })
                        
                        resolve()
                        
                    }).catch(function (err){
                        console.log(err)
                        reject()
                        
                    });
                }else{
                        
                        dispatch({
                            type : LOGIN,
                            payload : {token:'false'}
                        })
                        reject()
                }
            })
            .catch(function (error) {
                    
                    dispatch({
                        type : LOGIN,
                        payload : {token:'false'}
                    })
                    reject()
            });

            
        // make an api call here to save data in server
        // then, if it was successful do this
        // then do something else
        // do another thing
        // lets do that thing as well
        // and this takes around a minute, you could and should show a loading indicator while all this is going on
        // and finally
        
    });
};


export const logout = (token) =>{
    try{
        return async dispatch => {
            axios({
                method :'post',
                url :'https://askhomelab.com/api/logout',
                headers :{
                    "Authorization" : "Bearer "+token
                }
            }) .then(function (response) {
                console.log(response.data)
                dispatch({
                    type : LOGOUT
                })
            })
            .catch(function (err) {
            
                console.error(err.response)
            });   
        }
    }catch (error){
        console.log(error)
    }
}

