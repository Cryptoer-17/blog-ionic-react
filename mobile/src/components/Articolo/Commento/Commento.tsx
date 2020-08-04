import React from 'react';
import { IonTitle } from '@ionic/react';

const Commento: React.FC = (props) => {
  return (
    <>
     <IonTitle size="small" class="ion-margin-top" color="dark">{props.children}</IonTitle>
    </>
  );
};

export default Commento;