import React, { useState, useEffect } from 'react';
import NomePersona from '../Persona/NomePersona';
import Comment from '../Commento/Commento';
import Modal from '../../UI/Modal/Modal';
import EliminaMessaggio from '../EliminaMessaggio/EliminaMessaggio';
import Messaggio from '../Messaggio/Messaggio';
import './Comments.css';
import { IonCard, IonCardContent } from '@ionic/react';


const Comments: React.FC<{
    cmpDidMount:()=>void,
    articolo:any,
    clickSendMessage:()=>void
}> = (props) => {
    
    const [showModalDelete,setShowModalDelete] = useState(false);
    const [indexmsg,setIndexSmg] = useState(0);
    console.log(props);


    useEffect(()=>{
      if (props.articolo.messaggi !== undefined) {
        if (props.articolo.messaggi.length > 1) {
            document.getElementById("divCommts")!.style.height = '400px';
            document.getElementById("divCommts")!.style.overflow = 'scroll';
        }
    }
    },[]);

  const clickModalDelete = ()=> {
      setShowModalDelete(true);
  }
  const hideModalDelete = () => {
      setShowModalDelete(false);
  }

  const modalRemoveComment = (index:number)=>{
      setShowModalDelete(true);
      setIndexSmg(index);
  }


  const { clickSendMessage, articolo } = props;
  let showModalDeleteVar;
  let tempUserArray:any[] = [];
  let colorArray = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'dark', 'medium', 'light'];
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
                  <NomePersona userArray={tempUserArray}>{messaggio.username}</NomePersona>
                    <Comment>
                        {messaggio.testo}
                   </Comment> 
                     {messaggio.username === localStorage.getItem("username") ? <i className="material-icons" onClick = {()=>modalRemoveComment(index)}>close</i> : null}
                  </IonCardContent>
                </IonCard>
                )
            })
        } else commenti = null;

        if (showModalDelete) {
          showModalDeleteVar = <Modal show={showModalDelete}><EliminaMessaggio {...props} cmpDidMount={props.cmpDidMount} indexmsg={indexmsg} articolo={articolo} hideModal={() => hideModalDelete()} /*mount={this.props.mount}*/ /></Modal>
      }

  return (
    <>
    <IonCard>
    {showModalDeleteVar}
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