import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as moment from 'moment';
import { body } from 'ionicons/icons';
import { resolve } from 'dns';

/*
export const updateEmailStart = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_START
    };
}

export const updateEmailFail = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_FAIL
    };
}

export const updateEmailSuccess = () =>{
    return{
        type:actionTypes.UPDATE_EMAIL_SUCCESS
    };
}

export const updateEmail = (email) =>{
    return dispatch =>{
        dispatch(updateEmailStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        let url = 'http://localhost:4001/email/update/'+ localStorage.getItem("userId");
        const authData ={
            _id:localStorage.getItem("userId"),
            email : email,
            username : email,
          }
        axios.put(url,authData,config)
        .then(response=>{
            localStorage.removeItem("email");
            localStorage.setItem('email', response.data.data.email);
            dispatch(updateEmailSuccess());
        })
        .catch(error =>{
            dispatch(updateEmailFail());
        })
    }
}

export const updatePasswordStart = ()=>{
    return {
        type:actionTypes.UPDATE_PASSWORD_START
    }
}

export const updatePasswordSuccess = () =>{
    return{
        type:actionTypes.UPDATE_PASSWORD_SUCCESS
    }
}

export const updatePasswordFail = () =>{
    return{
        type:actionTypes.UPDATE_PASSWORD_FAIL
    }
}

export const updatePassword = (props)=>{
    return dispatch=>{
        dispatch(updatePasswordStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
         const email = localStorage.getItem("email");
        let url= 'http://localhost:4001/password/update/' + localStorage.getItem("userId");
        const authData ={
            _id:localStorage.getItem("userId"),
            email:email,
            username: email,
            password : props,
        }
        axios.put(url,authData,config)
        .then((response)=>{
            dispatch(updatePasswordSuccess())
        })
        .catch((error)=>{
            console.log(error)
            dispatch(updatePasswordFail())
        })
    }
}*/



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

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept':'*/*'
            }
          }
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
        axios.post(url,authData,config )
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
            dispatch(loginFail(err.response.data)); 
            setTimeout(() =>{
            dispatch(logout());
            },  2000);
        });
    }; 
}

export const logout = () =>{
    return{
        type: actionTypes.LOGOUT
    }; 
}
