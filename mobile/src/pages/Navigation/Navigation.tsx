import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonIcon } from "@ionic/react";
import { NavLink } from 'react-router-dom';
import { personCircleOutline} from 'ionicons/icons';
import Ricerca from '../../components/Ricerca/Ricerca';

const Navigation: React.FC = ()=>{


    return(
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton >
                    Blog
                </IonButton>
                <IonButton>
                <IonIcon slot="start" icon={personCircleOutline}/>
                </IonButton>
            </IonButtons>
            <Ricerca />
            <IonButton slot="end" fill="clear" color="dark">
                    Logout
            </IonButton>   
           
        </IonToolbar>
    </IonHeader>
    );
}

export default Navigation;