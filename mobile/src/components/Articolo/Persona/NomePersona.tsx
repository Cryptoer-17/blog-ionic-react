import React from 'react';
import { IonTitle } from '@ionic/react';

const NomePersona: React.FC<{
    userArray:any
}>= (props) => {

    let colore;
    props.userArray.map((userPropriety:any)=>{
        if(userPropriety.username === props.children){
            colore = userPropriety.colore
        }
        return null;
    });

  return (
    <>
    <IonTitle size="small" class="ion-margin-bottom" color={colore}>{props.children}</IonTitle>
    </>
  );
};

export default NomePersona;
