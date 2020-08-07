import React from 'react';
import { IonGrid, IonRow, IonCol, IonButtons, IonButton,IonIcon} from '@ionic/react';
import { heart, chatbubbleEllipsesOutline, ellipsisHorizontalOutline} from 'ionicons/icons';
import './ActionBar.css';

const ActionBar: React.FC<{
    id:string,
    showdropdown:boolean,
    viewComments:()=>void,
    modalDelete:()=>void,
    clickMenu:(props:any)=>void,
    disableMore:boolean,
    color:string,
    onClick:()=>void,
    ricerca:boolean
}> = (props) => {
    const { disableMore,showdropdown, id, ricerca,color } = props;
  return (
    <IonGrid>
        <IonRow>
            <IonCol sizeSm="7" size="7">
               {ricerca ? null : <IonButtons >
                    <IonButton  onClick={props.onClick} color={color}>
                        <IonIcon  icon={heart}></IonIcon>
                    </IonButton>
                    <IonButton id="messageIcon" onClick={props.viewComments} color="dark">
                        <IonIcon  icon={chatbubbleEllipsesOutline} ></IonIcon>
                    </IonButton>
                </IonButtons>}
            </IonCol>
            <IonCol sizeSm="2" size="2">
               {disableMore || ricerca ? null : <IonButton fill="clear" color="dark" onClick={()=>props.clickMenu(props.id)}>
                    <IonIcon icon={ellipsisHorizontalOutline} size="large"></IonIcon>
                </IonButton> }
                <div className={showdropdown ? 'DropdownContentBlock' : 'DropdownContent'}>
                    <IonButton onClick={() => props.modalDelete()} fill="clear"  color="dark">Elimina</IonButton>
                    <IonButton routerLink={'/modifica/'+id} fill="clear" color="dark">
                        Modifica
                    </IonButton>
                </div>
            </IonCol>
        </IonRow>
    </IonGrid>
  );
};

export default ActionBar;

