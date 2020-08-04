import React from 'react';
import './Modal.css';
import {  IonModal, IonCard, IonCardContent,  IonBackdrop } from '@ionic/react';

const Modal: React.FC<{
    show:boolean,
    modalClosed:()=>void,
}> = (props) => {

    const {show} = props;
    
  
  return (
   <>
   {/*<IonBackdrop visible={show}  class="backdrop"></IonBackdrop>*/}
    <IonModal isOpen={show} animated={true} onDidDismiss={props.modalClosed} cssClass="classe-prova">
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
