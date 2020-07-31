import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProfiloSuccess = (profilo)=>{
    return{
        type: actionTypes.GET_PROFILO_SUCCESS,
        profilo: profilo
    }
} 

export const getProfiloStart = () =>{
    return {
        type : actionTypes.GET_PROFILO_START
    };
}

export const getProfiloFail = (error) =>{
    
    return{
        type : actionTypes.GET_PROFILO_FAIL,
        error : error
    }
}

export const getAllProfiliSuccess = (profili)=>{
    return{
        type: actionTypes.GET_ALLPROFILI_SUCCESS,
        profili: profili
    }
} 


export const getProfilo = () =>{
    return dispatch =>{
        let temparray=[];
        dispatch(getProfiloStart());
        const token = localStorage.getItem('token');
        let config = {
            headers: {
                authorization: 'Bearer '+ token,
            }
          }
        axios.get('http://localhost:4001/profili',config)
        .then(response =>{   
            dispatch(getAllProfiliSuccess(response.data))
          for(let key in response.data){
            if(localStorage.getItem("userId") === response.data[key].userId){
            temparray.push({profilo: response.data[key], key: key })
            localStorage.setItem("username",response.data[key].username)
            }
         
        };         
          dispatch(getProfiloSuccess(temparray) );
        })
        .catch(err => { 
            dispatch(getProfiloFail(err.response.data.error));      
        });
    };
};

export const setUsername = (username) =>{
    const token = localStorage.getItem('token');
       let profilo = null;
       let id = "";
    return dispatch =>{
        let config = {
            headers: {
                authorization: 'Bearer '+ token,
            }
          }
       dispatch(sendDataStart())
        axios.get('http://localhost:4001/profili',config)
        .then(response =>{   
            for(let key in response.data){
                if(response.data[key].userId === localStorage.getItem("userId")){
                    profilo ={
                        ...response.data[key],
                        username:username
                    }
                    id = response.data[key]._id;
            }}; 
        
          localStorage.setItem("username",username);
            if(profilo!==null){
            axios.put('http://localhost:4001/profilo/update/'+ id,profilo,config).then(res =>  
                dispatch(sendDataSuccess(profilo))
                ).catch( err => dispatch(sendDataFail(err), console.log(err)) );
            }  
            else{
                profilo = {
                    nome: '',
                    cognome:'',
                    dataNascita:'',
                    sesso: '',
                    numeroTelefono:'',
                    nazionalità:'',
                    img:'',
                    username:username,
                    userId:localStorage.getItem('userId').trim(),
                    descrizione:''
                }
                axios.post('http://localhost:4001/profilo/save',profilo,config).then(res=>dispatch(sendDataSuccess(profilo))
                ).catch(err => dispatch(sendDataFail(err), console.log(err)) );
            }   
        });                          
    } 
}

export const sendDataSuccess = (dati) =>{
    return{
        type: actionTypes.SEND_DATA_SUCCESS,
        dati: dati
    }
} 

export const sendDataStart = () =>{
    return {
        type : actionTypes.SEND_DATA_START
    };
}

export const sendDataFail = (error) =>{
    return{
        type : actionTypes.SEND_DATA_FAIL,
        error : error
    }
}

 export const sendData = (dati) =>{
   return dispatch => {
    dispatch(sendDataStart());
    let config = {
        headers: {
            authorization: 'Bearer '+ localStorage.getItem("token"),
        }
      }
    axios.post('http://localhost:4001/profilo/save', dati,config)
    .then(res =>{ 
        dispatch(sendDataSuccess(dati))
      })
    .catch(error => { 
        dispatch(sendDataFail(error));
    });
    }
};

export const updateDataSuccess = (dati) =>{
    return{
        type: actionTypes.UPDATE_DATA_SUCCESS,
        dati: dati
    }
} 

export const updateDataStart = () =>{
    return {
        type : actionTypes.UPDATE_DATA_START
    };
}

export const updateDataFail = (error) =>{
    
    return{
        type : actionTypes.UPDATE_DATA_FAIL,
        error : error
    }
}

export const updateData = (dato,idProfilo) =>{
    return dispatch => {
        dispatch(updateDataStart());
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.put('http://localhost:4001/profilo/update/' + idProfilo , dato,config)
        .then(res =>{ 
            dispatch(updateDataSuccess(dato))
          })
        .catch(error => { 
            dispatch(updateDataFail(error));
        });
    }
}