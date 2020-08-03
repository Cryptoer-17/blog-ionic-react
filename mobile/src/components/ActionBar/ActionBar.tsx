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
         
                <IonButton fill="clear" >
                    <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
                </IonButton>
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


/*<div className={classes.ActionBar}>
{ricerca ? null : <div className={classes.Actions}>
    <FaHeart className={classes.Like} style={{ color: color }} onClick={props.onClick} />
    <div id="messageIcon" onClick={props.viewComments}><FaRegCommentDots className={classes.Comments} /></div>
</div>}
{disableMore || ricerca ? null :
    <div className={classes.MoreDiv} >
        <FaEllipsisH className={classes.More} onClick={()=>props.clickMenu(props.id)} />
        <div className={classes.DropdownContent} style={showdropdown ? { display: 'block' } : null} >
            <button type="button"  onClick={() => props.modalDelete()} style={{ cursor: 'pointer',background:'none',border:'none',fontSize:'1.1rem', fontFamily:'none' }}>Elimina</button>
            <NavLink to={"/modifica/" + id}/*className={classes.Link} activeClassName={classes.LinkAttivo}*//*>Modifica</NavLink>
        </div>
    </div>}
</div>*/