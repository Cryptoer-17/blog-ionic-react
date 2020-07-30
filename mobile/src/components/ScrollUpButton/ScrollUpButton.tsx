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






/*const scrollTopButton = () => (
    <button title = "Torna in cima" className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">arrow_upward</i> </button>
    );
*/