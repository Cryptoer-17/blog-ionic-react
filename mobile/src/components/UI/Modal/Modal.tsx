import React from 'react';
import BackDrop from '../Backdrop/Backdrop';
import './Modal.css';
import { IonBackdrop } from '@ionic/react';

const Modal: React.FC<{
    show:boolean,
    modalClosed:()=>void
}> = (props) => {

    const {show} = props;

  return (
   <>
    {show ? <div className= {'Modal'}>
        {props.children}
    </div> : null}
    <BackDrop show ={show}  clicked = { props.modalClosed }/>
   </>
  );
};

export default Modal;


/*<div> 
      <div className= {classes.Modal}  style = {{ transfrom: show ? 'translateY(0)' : 'translateY(-100)',
        opacity: show ? '1':'0', visibility: show ? 'visible' : 'hidden'}}>
        {props.children}
      </div>   
      <Backdrop show ={show}  clicked = { props.modalClosed }/>
    </div> */