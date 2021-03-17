import axios from 'axios';

// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = "LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE"


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

export const login = (email,password) => {
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

