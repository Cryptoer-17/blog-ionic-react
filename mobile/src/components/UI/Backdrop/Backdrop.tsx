import React from 'react';
import './Backdrop.css';
import { IonBackdrop } from '@ionic/react';

const Backdrop: React.FC<{
    show:boolean,
    clicked:()=>void
}> = (props) => {
  return (
      props.show ? <IonBackdrop color="dark" class="opacity"/> : null
  );
};

export default Backdrop;