import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../utility/updateObject';

const initialState = {
    token: null,
    userId: null,
    error:null,
    loading:false,
    user:null,
    loginRedirectPath: '/',
    esitoCaricamento:"" 
}


const loginStart = (state) =>{
    return updateObject( state, {error: null,  loading : true} );
}


const loginFail= (state, action) =>{
    return updateObject( state, { error : action.error, loading:false } );
    
}

const loginSuccess = (state,action) =>{
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



        default: return state;
    }
};

export default reducer;