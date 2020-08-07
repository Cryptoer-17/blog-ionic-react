import React, { useState, useEffect } from 'react';
import NomePersona from '../Persona/NomePersona';
import Comment from '../Commento/Commento';
import Modal from '../../UI/Modal/Modal';
import EliminaMessaggio from '../EliminaMessaggio/EliminaMessaggio';
import Messaggio from '../Messaggio/Messaggio';
import './Comments.css';
import { IonCard, IonCardContent, IonIcon, IonButton } from '@ionic/react';
import { closeOutline} from 'ionicons/icons';


const Comments: React.FC<{
    cmpDidMount:()=>void,
    articolo:any,
    clickSendMessage:(props:any)=>void
}> = (props) => {
  const { clickSendMessage, articolo } = props;
  
  const [showModalDelete,setShowModalDelete] = useState(false);
  const [indexmsg,setIndexSmg] = useState(0);

  useEffect(()=>{
    if (props.articolo.messaggi !== undefined) {
      if (props.articolo.messaggi.length > 1) {
          document.getElementById("divCommts")!.style.height = '400px';
          document.getElementById("divCommts")!.style.overflow = 'scroll';
      }
  }
  },[props.articolo.messaggi]);

  
  const hideModalDelete = () => {
      setShowModalDelete(false);
  }

  const modalRemoveComment = (index:number)=>{
      setShowModalDelete(true);
      setIndexSmg(index);
  }



  let showModalDeleteVar;
  let tempUserArray:any[] = [];
  let colorArray = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'dark', 'medium'];
  articolo.messaggi.map((messaggio:any) => {
    if (!tempUserArray.includes(messaggio.username)) {
        let colore;
        colore = Math.floor(Math.random() * colorArray.length - 1 + 1)
        tempUserArray.push({ username: messaggio.username, colore: colorArray[colore] })
    }
    return null;
  });
  let commenti
        if (articolo.messaggi !== undefined) {
            commenti = articolo.messaggi.map((messaggio:any, index:number) => {
                return (<IonCard key={index}>
                  <IonCardContent>
                  {messaggio.username === localStorage.getItem("username") ? <IonButton fill="clear" class="ion-float-right top-right"  onClick = {()=>modalRemoveComment(index)}>
                        <IonIcon  icon={closeOutline}></IonIcon>
                    </IonButton>: null}
                  <NomePersona userArray={tempUserArray}>{messaggio.username}</NomePersona>
                    <Comment>
                        {messaggio.testo}
                   </Comment> 
                  
                  </IonCardContent>
                </IonCard>
                )
            })
        } else commenti = null;

        if (showModalDelete) {
          showModalDeleteVar = <Modal show={showModalDelete} modalClosed={hideModalDelete}><EliminaMessaggio {...props} cmpDidMount={props.cmpDidMount} indexmsg={indexmsg} articolo={articolo} hideModal={() => hideModalDelete()} /*mount={this.props.mount}*/ /></Modal>
      }

  return (
    <>
    {showModalDeleteVar}
    <IonCard>
      <IonCardContent>
        <div id="divCommts" className={'Commenti'} >
                      {commenti}
                  </div>
          <Messaggio clickSendMessage={clickSendMessage} />
      </IonCardContent>    
    </IonCard>
    </>
  );
};

export default Comments;