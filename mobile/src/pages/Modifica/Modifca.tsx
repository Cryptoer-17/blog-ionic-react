import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const Modifica: React.FC = ()=>{

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

export default Modifica;