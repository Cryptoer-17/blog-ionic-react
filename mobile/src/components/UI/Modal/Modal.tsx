import React from 'react';
import BackDrop from '../Backdrop/Backdrop';
import './Modal.css';
import {  IonModal, IonCard, IonCardContent, IonTitle, IonText } from '@ionic/react';

const Modal: React.FC<{
    show:boolean,
    modalClosed:()=>void,
}> = (props) => {

    const {show} = props;
    

  return (
   <>
    <IonModal isOpen={show}>
      <IonCard>
        <IonCardContent>
         {props.children}
        </IonCardContent>
      </IonCard>
    </IonModal>
    {/*<BackDrop show ={show}  clicked = { props.modalClosed }/>*/}
   </>
  );
};

export default Modal;

/*  {show ? <div className= {'Modal'}>
        {props.children}
    </div> : null}
    <BackDrop show ={show}  clicked = { props.modalClosed }/> */


/*<div> 
      <div className= {classes.Modal}  style = {{ transfrom: show ? 'translateY(0)' : 'translateY(-100)',
        opacity: show ? '1':'0', visibility: show ? 'visible' : 'hidden'}}>
        {props.children}
      </div>   
      <Backdrop show ={show}  clicked = { props.modalClosed }/>
    </div> */