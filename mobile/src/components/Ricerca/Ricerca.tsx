import React, { useState } from 'react';
import {  IonItem, IonInput, IonButton, IonIcon, IonNav } from '@ionic/react';
import { searchOutline} from 'ionicons/icons';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import history from '../../utility/history';

import './Ricerca.css';


const Ricerca: React.FC<{
    onStartRicerca:(props:any)=>void,
}> = (props) => {

    const {onStartRicerca} = props;

    const [textRicerca, setTextRicerca] = useState<string>('');

    const changeTextRicerca = (text:string)=>{
        setTextRicerca(text);
    }

    const clickHandler = () =>{
        console.log(props);
        if(textRicerca !== ""){
            onStartRicerca(textRicerca);
            // history.push("/ricerca");
        }
    }

  

  return (
         <IonItem  lines="none" >
            <IonInput 
            type="text" 
            value={textRicerca} 
            placeholder="Cerca..."
            onIonChange={e => changeTextRicerca(e.detail.value!)} 
            ></IonInput>
            <IonButton fill="clear" color="dark" onClick = {clickHandler} routerLink="/ricerca">
                <IonIcon slot="start" icon={searchOutline}></IonIcon>
            </IonButton>
        </IonItem>
  );
};

const mapDispatchToProps = (dispatch:any) => {
    return{
    onStartRicerca: (cerca:string) => dispatch(actions.startRicerca(cerca))
    };
  };

export default connect(null,mapDispatchToProps)(Ricerca);

