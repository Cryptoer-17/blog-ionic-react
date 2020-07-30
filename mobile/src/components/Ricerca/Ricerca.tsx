import React, { useState } from 'react';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/react';
import { searchOutline} from 'ionicons/icons';
import './Ricerca.css';


const Ricerca: React.FC = () => {
    const [textRicerca, setTextRicerca] = useState<string>('');

    const changeTextRicerca = (text:string)=>{
        setTextRicerca(text);
    }

  return (
         <IonItem  lines="none">
            <IonInput 
            type="text" 
            value={textRicerca} 
            placeholder="Cerca..."
            onIonChange={e => changeTextRicerca(e.detail.value!)} 
            ></IonInput>
            <IonButton fill="clear" color="dark">
                <IonIcon slot="start" icon={searchOutline}></IonIcon>
            </IonButton>
        </IonItem>
  );
};

export default Ricerca;

