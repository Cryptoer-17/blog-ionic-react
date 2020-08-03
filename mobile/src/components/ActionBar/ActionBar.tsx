import React from 'react';
import { IonItem, IonGrid, IonRow, IonCol, IonButtons, IonButton,IonIcon, IonFab, IonFabButton, IonFabList, IonLabel } from '@ionic/react';
import { heart, chatbubbleEllipsesOutline, ellipsisHorizontalOutline} from 'ionicons/icons';
import './ActionBar.css';


const ActionBar: React.FC<{
    id:string,
    showdropdown:boolean,
    viewComments:()=>void,
    modalDelete:()=>void,
    clickMenu:()=>void,
    disableMore:boolean,
    color:string,
    onClick:()=>void,
    ricerca:boolean
}> = (props) => {
    const { disableMore,showdropdown, id, ricerca,viewComments,modalDelete, clickMenu,color, onClick } = props;

  return (
    <IonGrid>
        <IonRow>
            <IonCol sizeSm="7" size="7">
                <IonButtons>
                    <IonButton color="dark">
                        <IonIcon  icon={heart} ></IonIcon>
                    </IonButton>
                    <IonButton color="dark">
                        <IonIcon  icon={chatbubbleEllipsesOutline} ></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonCol>
            <IonCol sizeSm="2" size="2">
               {disableMore || ricerca ? null : <IonButton fill="clear" color="dark">
                    <IonIcon icon={ellipsisHorizontalOutline} size="large"></IonIcon>
                </IonButton> }
                <div className={showdropdown ? 'DropdownContentBlock' : 'DropdownContent'}>
                    <IonButton onClick={() => props.modalDelete()}>Elimina</IonButton>
                    <IonButton routerLink={'/modifica/'+id} >
                        Modifica
                    </IonButton>
                </div>
            </IonCol>
        </IonRow>
    </IonGrid>
  );
};

export default ActionBar;

