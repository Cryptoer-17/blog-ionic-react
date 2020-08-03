import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonItem } from "@ionic/react";
import { NavLink } from 'react-router-dom';
import { personCircleOutline} from 'ionicons/icons';
import Ricerca from '../../components/Ricerca/Ricerca';

const Navigation: React.FC<{
    idProfilo:string
}> = (props)=>{

    const {idProfilo} = props;

    return(
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton routerLink="/home">
                    Blog
                </IonButton>
                <IonButton routerLink={"/profilo" + (idProfilo ? "/"+idProfilo+"" : null)}>
                <IonIcon slot="start" icon={personCircleOutline}/>
                </IonButton>
            </IonButtons>
            <IonItem lines="none" class="ion-text-center">
                <Ricerca />
            </IonItem>
            <IonButton slot="end" fill="clear" color="dark">
                    Logout
            </IonButton>   
           
        </IonToolbar>
    </IonHeader>
    );
}

export default Navigation;