import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonItem,   IonModal, IonTitle} from '@ionic/react';
import Login from "../../components/Login/Login";

import './MainPage.css';

const MainPage: React.FC = ()=>{
    const [showModal, setShowModal] = useState(false);


    const modalLoginRegistration = ()=>{
        setShowModal(true);
    }


    return(
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton >
                        <b>Blog</b>
                    </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={modalLoginRegistration}>
                        <b>Login</b>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <br></br><br></br><br></br><br></br>
        <IonContent class="ion-no-padding">
            <IonItem lines="none" >
                <IonTitle size="small" class="ion-text-center">Crea il tuo blog</IonTitle>
            </IonItem>
            <IonItem lines="none" >
                <IonTitle size="large" class="ion-text-center title-inizia-ora"><b>INIZIA ORA</b></IonTitle>
            </IonItem>
            <div className="Img">
           
            </div>    
            <IonItem lines="none">
                <IonModal isOpen={showModal} cssClass='modal'>
                    <Login hideModal={() => setShowModal(false)}></Login>
                </IonModal>
            </IonItem>       
        </IonContent>
    </IonPage>
    );
}

export default MainPage;