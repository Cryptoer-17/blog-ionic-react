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
         <IonItem className="Searchbar" lines="none">
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


/*<div className ={classes.Ricerca}>
            <input type="text" placeholder=" Cerca..." onChange={(event) => setCerca(event.target.value) } onKeyPress={ event => { if(event.key === 'Enter') clickHandler() }}/>
            <NavLink onClick = { clickHandler } to="/ricerca" exact className={classes.CercaButton} ><i className="material-icons">search</i></NavLink>
        </div>*/