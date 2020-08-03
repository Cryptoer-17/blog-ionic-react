import React from 'react';
import './Backdrop.css';
import { IonBackdrop } from '@ionic/react';



const Backdrop: React.FC<{
    show:boolean,
    clicked:()=>void
}> = (props) => {
    console.log(props.show);
  return (
      /*props.show ? <div className={'Backdrop'} onClick={props.clicked}></div> : null*/
      props.show ? <IonBackdrop color="dark" class="opacity"/> : null
  );
};

export default Backdrop;