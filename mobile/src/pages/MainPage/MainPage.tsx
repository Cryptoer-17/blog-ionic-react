import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonItem, IonThumbnail,  IonModal, IonTitle, IonImg, IonCard } from '@ionic/react';
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
            <IonItem>
                <IonModal isOpen={showModal} cssClass='modal'>
                    <Login hideModal={() => setShowModal(false)}></Login>
                </IonModal>
                <IonThumbnail>
                   {/* <IonImg src={'src/assets/images/logoGoogle.png'}></IonImg>*/}
                </IonThumbnail>
            </IonItem>       
        </IonContent>
        {/*<IonContent>
            <IonItem>
                <IonModal isOpen={showModal} cssClass='modal'>
                    <Login></Login>
                    <p>This is modal content</p>
                    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                </IonModal>
                <IonThumbnail>
                   {/* <IonImg src={'src/assets/images/logoGoogle.png'}></IonImg>*//*}
                </IonThumbnail>
            </IonItem>
        </IonContent> */}
    </IonPage>
    );
}

export default MainPage;