import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { NavLink } from 'react-router-dom';


const Profilo: React.FC = ()=>{


    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonToolbar>
                <IonTitle class="ion-text-center">Blog</IonTitle>
            </IonToolbar> 
            </IonContent>
        </IonPage>
    );
}

export default Profilo;