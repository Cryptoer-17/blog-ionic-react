import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import './Login.css';
import checkValidity from '../../utility/validation';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { closeOutline} from 'ionicons/icons';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';


const Login: React.FC<{
    onLogin: (textEmail:string,textPassword:string,isSignup:boolean)=> void; 
    hideModal:()=>void,
    error:any,
    loading:boolean
}> = props =>{  

    const {error, loading} = props;

    const [textEmail, setTextEmail] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [textPassword, setTextPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [showmsg, setShowMsg] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

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
        setShowMsg(true);
        setMessage("Login effettuato correttamente");
        setTimeout(()=>{
            window.location.reload();
        },1800)
    }

    const handlerClickRegistration = ()=>{
        props.onLogin(textEmail,textPassword,false);
        setShowMsg(true);
        setMessage("Registrazione effettuata correttamente");
        setTimeout(()=>{
            window.location.reload();
        },1800)
    }

    
    let form;
    let errorVar = null;
    let messageSuccess = null;

    form = (<IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar>
                <IonTitle class="ion-text-center">Login</IonTitle>
                <IonButton fill="clear" class="delete-icon" color="dark" onClick={props.hideModal}>
                    <IonIcon icon={closeOutline}></IonIcon>
                </IonButton>
            </IonToolbar>
       </IonHeader>
       <IonContent>
        <form>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem className={!emailValid  ? 'Invalid' : ''}>
                            <IonLabel position="floating"> Email</IonLabel>
                            <IonInput 
                            type="text" 
                            value={textEmail} 
                            onIonChange={e => changeTextEmail(e.detail.value!)}                        
                            ></IonInput>
                        </IonItem>
                        {!emailValid && <IonItem lines="none">
                            <IonLabel> Should be a valid email address.</IonLabel>
                        </IonItem>}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem className={!passwordValid ? 'Invalid' : ''}>
                            <IonLabel position="floating"> Password</IonLabel>
                            <IonInput 
                            type="password" 
                            value={textPassword}
                            onIonChange={e => changeTextPassword(e.detail.value!)}    
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
                        <IonButton expand="block" disabled={!validationText()} onClick={handlerClickRegistration}>Registrati</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
       </IonContent>
    </IonPage>)


    if (loading) {
        form = <Spinner />
    }

    if (error) {
        errorVar = (
            <Modal show={true} modalClosed={()=>{}}>{
                <React.Fragment>
                    <IonItem>
                    <IonTitle><b>Errore!!</b></IonTitle>
                </IonItem> 
               { error.map((err:string,index:number)=>{
                    return <IonItem key={index} lines="none">
                            <IonLabel >{err}</IonLabel>
                        </IonItem>
                    })}
                </React.Fragment>
                } </Modal>
        );
    }
    else if (error === null && localStorage.getItem('userId') !== null && showmsg) {
        messageSuccess = (<Modal show={showmsg} modalClosed={()=>{}} ><IonLabel color="dark">{message}</IonLabel></Modal>
        );
    }

    return (
        <React.Fragment>
            {form}
            {messageSuccess}
            {errorVar}
        </React.Fragment>
    );
  };

const mapDispatchToProps = (dispatch:any) => {
    return{
   onLogin : (email:string,password:string,isSignup:boolean) => dispatch(actions.login(email,password,isSignup)),
    };
  };
  
  export default connect(null,mapDispatchToProps)(Login);
