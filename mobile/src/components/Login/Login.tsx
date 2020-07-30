import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './Login.css';
import checkValidity from '../../utility/validation';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


const Login: React.FC<{
    onLogin: (textEmail:string,textPassword:string,isSignup:boolean)=> void; 
}> = props =>{  
    const [textEmail, setTextEmail] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [textPassword, setTextPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(true);

    const validationText = ()=>{
        return emailValid && passwordValid && textEmail!== '' && textPassword !== '';
    }

    const changeTextEmail = (text:string)=>{
        setTextEmail(text);
        setEmailValid(checkValidity(text,{isEmail:true,required:true}));   
    }

    const changeTextPassword = (text:string)=>{
        setTextPassword(text);
        setPasswordValid(checkValidity(text,{minLength:8,maxLength:15,required:true,isPassword:true}));   
    }

    const handlerClickLogin = () =>{
        props.onLogin(textEmail,textPassword,true);
        setTimeout(()=>{
            window.location.reload();
        },1000)
    }

    const handlerClickRegistration = ()=>{
        props.onLogin(textEmail,textPassword,false);
        setTimeout(()=>{
            window.location.reload();
        },1000)
        
    }

    return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar>
                <IonTitle class="ion-text-center">Login</IonTitle>
            </IonToolbar>
       </IonHeader>
       <IonContent>
        <form>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput 
                            type="text" 
                            value={textEmail} 
                            onIonChange={e => changeTextEmail(e.detail.value!)} 
                            className={!emailValid  ? 'Invalid' : ''}
                            ></IonInput>
                        </IonItem>
                        {!emailValid && <IonItem lines="none">
                            <IonLabel> Should be a valid email address.</IonLabel>
                        </IonItem>}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput 
                            type="password" 
                            value={textPassword}
                            onIonChange={e => changeTextPassword(e.detail.value!)}
                            className={!passwordValid ? 'Invalid' : ''}
                            ></IonInput>
                        </IonItem>
                        {!passwordValid && <IonItem lines="none">
                            <IonLabel> must be between 8 and 15 characters long,</IonLabel>
                        </IonItem>}
                        {!passwordValid && <IonItem lines="none">
                            <IonLabel> a uppercase letter,a lowercase letter,</IonLabel>
                        </IonItem>}
                        {!passwordValid && <IonItem lines="none">
                            <IonLabel> a number, a special character.</IonLabel>
                        </IonItem>}
                    </IonCol>
                </IonRow>
                <br></br>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" disabled={!validationText()} onClick={handlerClickLogin}>Accedi</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" disabled={!validationText()} onClick={handlerClickRegistration}>Refistrati</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
       </IonContent>
    </IonPage>
    );
  };

  
const mapStateToProps = (state:any) =>{
    return{
        error : state.auth.error
    };
};

const mapDispatchToProps = (dispatch:any) => {
    return{
   onLogin : (email:string,password:string,isSignup:boolean) => dispatch(actions.login(email,password,isSignup)),
    };
  };
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
