import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as moment from 'moment';
//login
export const loginStart = () =>{

    return{
        type:actionTypes.LOGIN_START
    };
}

export const loginFail= (error) =>{
    return{
        type:actionTypes.LOGIN_FAIL,
        error:error
    };
}

export const loginSuccess = (token,userId) =>{
    return{
        type:actionTypes.LOGIN_SUCCESS,
          idToken: token,
          userId: userId
        };  
}




export const login = (email, password,isSignup) =>{
    return dispatch =>{
        dispatch(loginStart());
        const authData = {
          username : email,
          password : password,
          email:email
        }
        //login
        let url = 'http://localhost:4001/login';
        if(!isSignup){
            //registrazione
            console.log("isSignup")
            url = 'http://localhost:4001/register';
        }
        axios.post(url,authData )
        .then(response =>{
            const express = response.data.expiresIn;
            const expiresIn = moment(express).toDate().getTime();
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('email', response.data.email);
            dispatch(loginSuccess(response.data.idToken, response.data.localId));
            // dispatch(checkLoginTimeout(response.data.expiresIn));
        })
        .catch( err =>{
            console.log(err);
            dispatch(loginFail(err)); 
            setTimeout(() =>{
            dispatch(logout());
            },  3000);
        });
    }; 
}

export const logout = () =>{
    return{
        type: actionTypes.LOGOUT
    }; 
}
