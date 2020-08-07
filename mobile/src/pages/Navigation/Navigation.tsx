import React, { useState } from 'react';
import {  IonHeader, IonToolbar, IonButtons,  IonButton, IonIcon, IonItem,  IonLabel } from "@ionic/react";
import { personCircleOutline} from 'ionicons/icons';
import Ricerca from '../../components/Ricerca/Ricerca';
import { connect } from 'react-redux';
import Logout from '../../components/Login/Logout';
const Navigation: React.FC<{
    idProfilo:string,
    error:any
}> = (props)=>{


    const {idProfilo} = props;

    const [show, setShow] = useState(false);
    const [, setShowMsg] = useState(false);

   
    const hideMessage = () => {
        setShowMsg(false);
    }

    const showModal = () => {
        hideMessage();
        setShow(true);
    }
    const hideModal = () => {
        setShow(false);
    }

   

    return(
        <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton routerLink="/home">
                    Blog
                </IonButton>
                <IonButton routerLink={"/profilo" + (idProfilo ? "/" + idProfilo : "")}>
                    <IonIcon  icon={personCircleOutline}/>
                    {localStorage.getItem("username") ? <IonLabel class="ion-text-lowercase">{localStorage.getItem("username")}</IonLabel> : null}
                </IonButton>
            </IonButtons>
            
            <IonItem lines="none" class="ion-text-center">
                <Ricerca />
            </IonItem>
            <IonButton slot="end" fill="clear" color="dark" onClick={showModal}>
                    Logout
            </IonButton>   
            {(show) ? <Logout hideModal={hideModal}></Logout>: null}
        </IonToolbar>
    </IonHeader>
    );
}

const mapStateToProps = (state:any) => {

    return {
        loading: state.auth.loading,
        error: state.auth.error,
        tokenId: state.auth.token,
        userId: state.auth.userId,
        loginRedirectPath: state.auth.loginRedirectPath
    };
};

export default connect (mapStateToProps)(Navigation);