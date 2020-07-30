import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonApp, IonPage, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './Login.css';
const Login: React.FC = () => {
    const [textEmail, setTextEmail] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [textPassword, setTextPassword] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(true);

    const validationText = ()=>{
        return emailValid && passwordValid && textEmail!= '' && textPassword != '';
    }

    const changeTextEmail = (text:string)=>{
        setTextEmail(text);
        setEmailValid(checkValidity(text,{isEmail:true,required:true}));   
    }

    const changeTextPassword = (text:string)=>{
        setTextPassword(text);
        setPasswordValid(checkValidity(text,{minLength:8,maxLength:15,required:true,isPassword:true}));   
    }

    const checkValidity = (value:any, rules:any) => {
        let isValid = true;
        if (!rules) {
            return true;
        }  
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isUsername) {
            const pattern = /^[A-Za-z0-9_]{4,15}$/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isPassword) {
            const pattern = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,15}$/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        } 
    
        if (rules.isDate) {
            const pattern =/^(19|20)\d{2}[./-]\d{2}[./-]\d{2}$/;
            isValid = pattern.test(value) && isValid
        } 
        return isValid;
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
                        <IonButton expand="block" disabled={!validationText()}>Accedi</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" disabled={!validationText()}>Refistrati</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
       </IonContent>
    </IonPage>
        
        
    );
  };
  
  export default Login;