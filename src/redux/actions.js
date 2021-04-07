import axios from 'axios';

// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = "LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE"

import Snackbar from 'react-native-snackbar';

import {WARNA_UTAMA, WARNA_WARNING} from '../utils/constant';

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
                        // axios.get('https://askhomelab.com/api/view_setting', {
                        //     headers: {
                        //         "Authorization" : 'Bearer ' + response.data.token
                        //     }
                        // }).then(function (res){
                        //     dispatch({
                        //         type : UPDATE_PROFILE,
                        //         payload : res.data
                        //     })
                        //     console.log(res.data)
                            
                        // }).catch(function (err){
                        //     console.log(err)
                            
                        // });
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

