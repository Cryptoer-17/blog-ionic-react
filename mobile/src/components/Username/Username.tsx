import React, { useState } from 'react';
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { IonText, IonInput, IonList, IonItem, IonButton, IonModal } from '@ionic/react';
import Modal from '../UI/Modal/Modal';

const Username: React.FC<{
    show:boolean,
    modalClosed:()=>void,
    loading:boolean,
    onSetUsername:(props:any)=>void
}>= (props) => {

    const {show, modalClosed,loading} = props;

    const [username, setUsername] = useState("");
    const [isFormValid,setIsFormValid] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const changeUsername = (event:any)=>{
        setUsername(event.target.value)
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

        contenutoModale = <React.Fragment><IonText>
            Prima di poter pubblicare degli articoli o scrivere un commento, devi scegliere un username.
        </IonText>
        <IonInput value={username} type="text" onIonChange={changeUsername} placeholder="Username" onClick={()=>handlerClickConfirm()}></IonInput>
        {errorMsg}
        <IonList>
            <IonItem>
                <IonButton slot="start">
                    START
                </IonButton>
                <IonButton slot="end">
                    END
                </IonButton>
            </IonItem>
        </IonList>
        <IonButton onClick={modalClosed}>Annulla</IonButton><IonButton disabled={!isFormValid} onClick ={()=>handlerClickConfirm()}>Conferma</IonButton>
        </React.Fragment>

    }


  return (
   <>
   <Modal show={show} modalClosed={modalClosed} >
    {contenutoModale}
   </Modal>
   </>
  );
};

const mapStateToProps = (state:any) =>{
    return{
         user: state.login.user,
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

