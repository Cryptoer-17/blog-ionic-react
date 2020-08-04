import React from 'react';
import { IonIcon, IonCardSubtitle } from '@ionic/react';
import { personCircleOutline} from 'ionicons/icons';
import './Autore.css';
const Autore: React.FC<{
    name:string,
}> = (props) => {
    const { name} = props;
  return (

    <React.Fragment>
        <IonIcon icon={personCircleOutline} class="ion-float-left"></IonIcon>
      <IonCardSubtitle >{name}</IonCardSubtitle>
    </React.Fragment>
  );
};

export default Autore;

