import React from 'react';
import { IonButton,IonIcon, IonItem } from '@ionic/react';
import { arrowUpOutline} from 'ionicons/icons';


const ScrollUpButton: React.FC<{
    clicked:()=>void
}> = props => {

  return (
        <IonButton title="torna in cima" color="medium" onClick={props.clicked} >
            <IonIcon color="dark" icon={arrowUpOutline}></IonIcon>
        </IonButton>   
  );
};

export default ScrollUpButton;

