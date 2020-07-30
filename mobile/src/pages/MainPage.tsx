import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonItem, IonThumbnail, IonImg, IonModal } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Login from "../components/Login/Login";

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
                        Blog
                    </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={modalLoginRegistration}>
                        Login
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem>
                <IonModal isOpen={showModal} cssClass='modal'>
                    <Login></Login>
                    <p>This is modal content</p>
                    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
                </IonModal>
                <IonThumbnail>
                   {/* <IonImg src={'src/assets/images/logoGoogle.png'}></IonImg>*/}
                </IonThumbnail>
            </IonItem>
      {/*      <IonHeader collapse="condense">
            <IonToolbar>
                <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <ExploreContainer />*/}
      </IonContent> 
    </IonPage>
    );
}

export default MainPage;