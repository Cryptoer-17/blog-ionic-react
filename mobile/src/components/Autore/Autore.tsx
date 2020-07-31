import React from 'react';
import { IonItem,IonIcon, IonCardSubtitle, IonButton } from '@ionic/react';
import { personCircleOutline} from 'ionicons/icons';

const Autore: React.FC<{
    name:string,
}> = (props) => {
    const { name} = props;
  return (

    /*<IonItem lines="none">*/
    <React.Fragment>
        <IonIcon icon={personCircleOutline} ></IonIcon>
      <IonCardSubtitle >{name}</IonCardSubtitle>
    </React.Fragment>
      
    /*</IonItem>*/
  
  );
};

export default Autore;

/*<div className={'Autore'}>
    <i className="material-icons" >account_circle</i>
    {name}
</div>*/