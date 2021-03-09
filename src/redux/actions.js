import axios from 'axios';

// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = "LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE"

export const login = (email,password) => {
    try {
         return async dispatch => {
        
            var data = new FormData();        
            data.append('email', email)
            data.append('password', password)

            axios.post('https://askhomelab.com/api/login',
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
                        axios.get('https://askhomelab.com/api/view_setting', {
                            headers: {
                                "Authorization" : 'Bearer ' + response.data.token
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
                        
                    }else{
                        console.info("Unable to fetch data from API")
                    }
                })
                .catch(function (error) {
                    console.error(error.response.status)
                });
        }
    }catch (error){
        console.log(error)
    }
};

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

export const logout = (token) =>{
    try{
        return async dispatch => {
        // axios.post('https://askhomelab.com/api/logout',
        // {
        //     headers : {
        //     Accept : '*/*',
        //     "content-type" :'multipart/form-data',
        //     "Authorization" : "Bearer "+token
        //     }  
        // })
        //     .then(function (response) {
        //         if (response.data.message != "No Associated Data"){
        //             navigation.replace("Landing")
        //         }else{
                  
        //         }
                
        //     })
        //     .catch(function (error) {
            
        //         console.error(error.response.data)
            // });

            dispatch({
                type : LOGOUT
            })
        }
    }catch (error){

    }
}

