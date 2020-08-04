import React, { useState } from 'react';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { IonInput, IonList, IonItem, IonButton,  IonTitle, IonIcon, IonLabel } from '@ionic/react';
import Modal from '../UI/Modal/Modal';
import { thumbsUp, thumbsDown} from 'ionicons/icons';
import checkValidity from '../../utility/validation';

const Username: React.FC<{
    show:boolean,
    modalClosed:()=>void,
    loading:boolean,
    onSetUsername:(props:any)=>void,
    profili:any
}>= (props) => {

    const {show, modalClosed,loading} = props;

    const [username, setUsername] = useState("");
    const [isFormValid,setIsFormValid] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const checkValidityOfUsername = (event:any)=>{
        setUsername(event.target.value);
        let validUsername = checkValidity(event.target.value, {required:true,minLength:4,maxLength:15,isUsername:true});
        let formIsValid = validUsername;
        let error = '';
        for (let key in props.profili){ //controllo unicità dell'username
            if(props.profili[key].username === event.target.value){
                error = "L'username non è disponibile";
                formIsValid = false;
            }
        }
        setErrorMsg(error);
        setIsFormValid(formIsValid);  
    }

    const handlerClickConfirm = ()=>{
        
            if(isFormValid){
              props.onSetUsername(username); 
            setTimeout(()=>{
              window.location.reload();
            },2000)
            setTimeout(modalClosed,1000);
            }
          
    }

    let contenutoModale = <Spinner/>
    
    if(!loading){

        contenutoModale = <React.Fragment><br></br><br></br><br></br><IonTitle size="small" color="dark">
             Prima di poter pubblicare degli articoli o scrivere un commento, devi scegliere un username.
        </IonTitle>
        <br></br>
        <IonItem >
            <IonInput value={username} type="text" onIonChange={checkValidityOfUsername} placeholder="Username" onClick={()=>handlerClickConfirm()}></IonInput>
        </IonItem>
        <br></br>
        {errorMsg}
        <IonList>
            <IonItem lines="none">
                <IonButton slot="start" fill="clear" color="dark">
                    <IonIcon slot="icon-only" icon={thumbsUp}></IonIcon>
                </IonButton>
                <IonButton slot="end" fill="clear" color="dark">
                    <IonIcon slot="icon-only" icon={thumbsDown}></IonIcon>
                </IonButton>  
            </IonItem>
            <IonItem lines="none">
                <IonTitle slot="start" size="small">- Lettere</IonTitle>
                <IonTitle slot="end" size="small">- Spazi</IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle slot="start" size="small">- Numeri</IonTitle>
                <IonTitle slot="end" size="small">- Altri caratteri speciali</IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle slot="start" size="small">- Underscore ( _ )</IonTitle>
                <IonTitle slot="end" size="small">- Meno di 4 caratteri</IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle slot="start" size="small"></IonTitle>
                <IonTitle slot="end" size="small">- Piu di 15 caratteri</IonTitle>
            </IonItem>
        </IonList>
        <IonButton onClick={modalClosed} fill="clear" color="dark">Annulla</IonButton><IonButton color={!isFormValid ? "medium" : "light"} disabled={!isFormValid} onClick ={()=>handlerClickConfirm()}><IonLabel color="dark">Conferma</IonLabel></IonButton>
        </React.Fragment>
    }


  return (
   <>
   <Modal show={show} modalClosed={()=>{}} >
    {contenutoModale}
   </Modal>
   </>
  );
};

const mapStateToProps = (state:any) =>{
    return{
         user: state.auth.user,
         loadingUsername:state.profilo.loading,
         profiloReducer:state.profilo.profilo,
         profili: state.profilo.profili

    };
};

const mapDispatchToProps = (dispatch:any) => {
    return{
        onSetUsername: (username:string) => dispatch(actions.setUsername(username)),
        onUpdateData:(data:any,idProfilo:string) =>dispatch(actions.updateData(data,idProfilo))
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(Username);

