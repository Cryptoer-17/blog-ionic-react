import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonButton, IonItem,   IonModal, IonTitle} from '@ionic/react';
import Login from "../../components/Login/Login";
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';
import './MainPage.css';

const MainPage: React.FC<{
    error:string,
    loading:boolean
}> = (props)=>{

    const{error,loading} = props;

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
                    <Login hideModal={() => setShowModal(false)} error={error} loading={loading}></Login>
                </IonModal>
            </IonItem>       
        </IonContent>
    </IonPage>
    );
}

  
const mapStateToProps = (state:any) =>{
    return{
        error : state.auth.error,
        loading:state.auth.loading
    };
};

export default connect(mapStateToProps)(MainPage);