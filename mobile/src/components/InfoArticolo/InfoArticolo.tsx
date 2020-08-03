import React from 'react';
import { IonIcon, IonToolbar, IonCardSubtitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import { timeOutline} from 'ionicons/icons';
import Autore from './Autore/Autore';
import './InfoArticolo.css';
const InfoArticolo: React.FC<{
    categoria:string,
    data:any,
    tempoLettura:number,
    autore:string
}> = (props) => {
    const {categoria, data, tempoLettura,autore} = props;
  return (
    <IonToolbar>
      <IonGrid>
        <IonRow>
         <IonCol sizeSm="5" size="3">
            <Autore name = {autore} />
          </IonCol>
          <IonCol sizeSm="4" size="2">
            <IonCardSubtitle >{categoria}</IonCardSubtitle>
          </IonCol>
          <IonCol sizeSm="3" size="7">
              <IonCardSubtitle class="ion-float-left">{data} |</IonCardSubtitle>
              <IonIcon  icon={timeOutline} class="ion-float-left"></IonIcon>
            <IonCardSubtitle >{tempoLettura < 1 ? "< 1 min. read" :  tempoLettura+" min. read"}</IonCardSubtitle>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonToolbar>
  );
};

export default InfoArticolo;
