import React from 'react';
import { IonContent, IonHeader, IonToolbar,  IonTitle, IonPage } from "@ionic/react";


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