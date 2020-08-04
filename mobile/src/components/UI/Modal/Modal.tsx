import React from 'react';
import BackDrop from '../Backdrop/Backdrop';
import './Modal.css';
import {  IonModal, IonCard, IonCardContent, IonTitle, IonText, IonBackdrop } from '@ionic/react';

const Modal: React.FC<{
    show:boolean,
    modalClosed:()=>void,
}> = (props) => {

    const {show} = props;
    
  
  return (
   <>
   <IonBackdrop visible={show}  class="backdrop"></IonBackdrop>
    <IonModal isOpen={show} onDidDismiss={props.modalClosed}>
      <IonCard>
        <IonCardContent>
         {props.children}
        </IonCardContent>
      </IonCard>
    </IonModal>
   </>
  );
};

export default Modal;
