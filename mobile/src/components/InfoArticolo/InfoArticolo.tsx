import React from 'react';
import { IonItem,IonIcon, IonToolbar, IonTitle, IonCardTitle, IonCardSubtitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { timeOutline} from 'ionicons/icons';
import Autore from '../Autore/Autore';
import './InfoArticolo.css';
const InfoArticolo: React.FC<{
    categoria:string,
    data:any,
    tempoLettura:number,
    autore:string
}> = (props) => {
    const {categoria, data, tempoLettura,autore} = props;
  return (
   /* <div className ={'Info'}>
        <div className = {'Autore'}>
            <Autore name = {autore} />
        </div>
        
        <p className = {'Categoria'}>{categoria}</p>
  <p className = {'DateTime'}>{data} | <IonIcon slot="start" icon={timeOutline} className = {'Icon'} />{tempoLettura < 1 ? "< 1 min. read" :  tempoLettura+" min. read"} </p>
    </div>*/
    <IonToolbar>
      <IonGrid>
        <IonRow>
         <IonCol size="3">
            <Autore name = {autore} />
          </IonCol>
          <IonCol size="2">
            <IonCardSubtitle >{categoria}</IonCardSubtitle>
          </IonCol>
          <IonCol size="7">
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
/*
<Autore name = {autore} />
      <IonCardSubtitle slot="start" class="ion-margin-start ion-margin-end">{categoria}</IonCardSubtitle>
      <IonCardSubtitle slot="start" class="ion-margin-start">{data} |</IonCardSubtitle>
      <IonButton fill="clear" color="medium">
        <IonIcon  icon={timeOutline} ></IonIcon>
      </IonButton>
      <IonCardSubtitle >{tempoLettura < 1 ? "< 1 min. read" :  tempoLettura+" min. read"}</IonCardSubtitle>
       */