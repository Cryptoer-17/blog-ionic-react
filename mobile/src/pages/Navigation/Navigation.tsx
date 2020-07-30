import React from 'react';
import { IonContent, IonNav } from "@ionic/react";

const Navigation: React.FC = ()=>{


    return(
        <IonContent>
            {localStorage.getItem("userId") && <IonNav root="nav-home"></IonNav>}
        </IonContent>
    );
}

export default Navigation;