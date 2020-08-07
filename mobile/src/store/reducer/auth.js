import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';
import history from '../../utility/history';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:false,
    user:null,
    loginRedirectPath: '/',
    esitoCaricamento:"" 
}



const updateEmailStart = (state) =>{
    return updateObject( state, {error: null,  loading : true} );
}

const updateEmailFail = (state) =>{
    return updateObject ( state, {error:null, loading:false, esitoCaricamento: "La procedure di cambio mail non è stata completata.\n L'email potrebbe esse già in uso.\n Si prega di riprovare più tardi"});
}

const updateEmailSuccess = (state)=>{
    return updateObject (state , {error : null, loading : false, esitoCaricamento: "Il cambio e-mail è stato completato"} );
}

const updatePasswordStart = (state)=>{
    return updateObject (state, {error:null, loading:true});
} 

const updatePasswordSuccess = (state) =>{
    return updateObject (state, {error:null, loading:false, esitoCaricamento: "Il cambio password è stato completato"} );
}

const updatePasswordFail = (state) =>{
    return updateObject (state, {error:null, loading:false, esitoCaricamento: "La procedure di cambio password non è stata completata. Si prega di riprovare più tardi"})
}



const loginStart = (state) =>{
    return updateObject( state, {error: null,  loading : true} );
}


const loginFail= (state, action) =>{
    return updateObject( state, { error : action.error, loading:false } );
    
}

const loginSuccess = (state,action) =>{
    console.log("entrato");
    return updateObject (state , {
        token : action.idToken,
        userId: action.userId,
        error : null,
        loading : false
    } );
}

const logout = (state,action) =>{
    /*auth.signOut();*/ 
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expirationDate");
    history.push('/home');
    window.location.reload();
    return updateObject( state, initialState );
}

const setLoginRedirectPath = (state, action) =>{
    return updateObject(state , {loginRedirectPath : action.path})
}


const reducer = (state = initialState,action) => {

    switch(action.type){
        case actionTypes.LOGIN_START: return loginStart(state,action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state,action);   
        case actionTypes.LOGIN_FAIL: return loginFail(state,action);  
        case actionTypes.LOGOUT: return logout(state,action);   
        case actionTypes.SET_LOGIN_REDIRECT_PATH : return setLoginRedirectPath(state,action);

        case actionTypes.UPDATE_EMAIL_START:return updateEmailStart(state,action);
        case actionTypes.UPDATE_EMAIL_FAIL:return updateEmailFail(state, action);
        case actionTypes.UPDATE_EMAIL_SUCCESS : return updateEmailSuccess(state,action);
        
        case actionTypes.UPDATE_PASSWORD_START: return updatePasswordStart(state,action);
        case actionTypes.UPDATE_PASSWORD_SUCCESS: return updatePasswordSuccess(state,action);
        case actionTypes.UPDATE_PASSWORD_FAIL : return updatePasswordFail(state,action);

        default: return state;
    }
};

export default reducer;