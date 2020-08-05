import React from 'react';
import Modal from '../UI/Modal/Modal';
import { IonTitle, IonButton, IonIcon, IonItem } from '@ionic/react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { closeOutline} from 'ionicons/icons';

import './Logout.css';

const Logout: React.FC<{
    hideModal:()=>void,
    error:string,
    onLogout:()=>void
}> = (props) => {
    
const {onLogout, hideModal} = props;

let error;
if(props.error === "Auth token is expired"){
   error = (
    setTimeout(()=>{
      document.getElementById("btnLogout")!.style.display = 'none'
    },10),
    setTimeout(()=>{
    if(props.error === "Auth token is expired"){
      document.getElementById("btnLogout")!.click();
    }
   },4500),
   <Modal  show = {true} modalClosed = {hideModal}>
     E' scaduto il tempo di sessione, riaccedi per continuare ad usare il blog
   </Modal>);
}

  return (
    <>
    <Modal show = {true}  modalClosed = {  hideModal }>  
        <IonButton class="close-modal" fill="clear" color="dark" onClick={hideModal}>
          <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
        </IonButton>
        <br></br><br></br><br></br><br></br><br></br>
        <IonTitle color="dark" class="ion-text-center"><b>Logout</b></IonTitle>
        <br></br><br></br>
        <IonItem lines="none">
          <IonButton id="btnLogout" size="large"  color="dark" fill="outline" class="button-logout" onClick = {() => {onLogout(); hideModal();  } }>Esci</IonButton>
        </IonItem>
        {error}
    </Modal>
    </>
  );
};

const mapStateToProps = (state:any) =>{
    return{
       error:state.articolo.error
    }
  }
  
  const mapDispatchToProps = (dispatch:any) => {
      return{
      onLogout: () => dispatch(actions.logout())
      };
    };

export default connect(mapStateToProps,mapDispatchToProps)(Logout);
