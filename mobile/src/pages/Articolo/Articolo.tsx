import React from 'react';
import { IonItem, IonPage, IonContent, IonTitle, IonHeader, IonToolbar } from "@ionic/react";



const Articolo: React.FC = ()=>{


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

export default Articolo;