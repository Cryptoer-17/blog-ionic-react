import React from 'react';
import { IonItem,IonIcon, IonCardSubtitle, IonButton } from '@ionic/react';
import { personCircleOutline} from 'ionicons/icons';
import './Autore.css';
const Autore: React.FC<{
    name:string,
}> = (props) => {
    const { name} = props;
  return (

    <React.Fragment>
      <div className="Icona">
        <IonIcon icon={personCircleOutline} ></IonIcon>
      </div>
      <IonCardSubtitle >{name}</IonCardSubtitle>
    </React.Fragment>
  );
};

export default Autore;

