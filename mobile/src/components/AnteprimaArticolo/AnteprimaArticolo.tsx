import React, { useState } from 'react';
import { IonItem, IonCard, IonCardHeader, IonCardContent, IonTitle, IonCardSubtitle, IonImg} from '@ionic/react';
import ActionBar from '../ActionBar/ActionBar';
import Info from '../InfoArticolo/InfoArticolo';
import './AnteprimaArticolo.css';
import {  } from 'ionicons/icons';

const AnteprimaArticolo: React.FC<{
    id:string,
    autore:string,
    categoria:string,
    descrizione:string,
    img:string,
    like:any[],
    sottotitolo:string,
    titolo:string,
    data:any,
    minuti:number,
    clickHeart:()=>void,
    showDropdown:boolean,
    clickMenuHandler:()=>void,
    disableMore:boolean,
    ricerca:boolean
}>= (props) => {

  const { autore, titolo, sottotitolo,categoria, img, descrizione, clickHeart, data, minuti, id ,showDropdown, like,ricerca,clickMenuHandler,disableMore} = props;
  const [showModalDelete, setShowModalDelete] = useState(false);
  

  const viewMessageArticle = (id:string) => {
    document.getElementById(id)!.click()
    setTimeout(() => {
        console.log("entrato");
        document.getElementById("messageIcon")!.click();
    }, 1000);
}

    const clickModalDelete = () => {
        setShowModalDelete(true);
    }

    
  let showModalDeleteVar;
  let colore = 'dark';
  let variabile;
  
  like.map((object) => {
    if (object.username === localStorage.getItem("username")) {
        if (object.like) {
            colore = 'danger';
        }
    }
    return null;
  });
 
   variabile = <IonCard>
       <IonCardHeader>
        <Info autore={autore} categoria={categoria} data={data} tempoLettura={minuti} />
       </IonCardHeader>
       <IonItem routerLink={'/articolo/'+id} lines="none" >
        <div className="CardContent" id={id}>
            <IonCardContent >
                <IonItem lines="none" >
                        <IonTitle class="ion-text-center" className="Titolo"><b>{titolo}</b></IonTitle>
                </IonItem>
                {sottotitolo && <React.Fragment><IonItem class="ion-margin-bottom" >
                            <IonCardSubtitle color="dark"><b>{sottotitolo}</b></IonCardSubtitle>
                    </IonItem></React.Fragment>}
                {descrizione && <IonItem lines="none">
                    <IonCardSubtitle color="dark" class="ion-margin-top">{descrizione}</IonCardSubtitle>
                </IonItem>}
                <IonItem lines="none">
                    <IonImg src={img} slot="end"/>
                </IonItem>          
            </IonCardContent>
        </div>
       </IonItem>
       <ActionBar id={id} showdropdown={showDropdown}  viewComments={() => viewMessageArticle(id)} modalDelete={() => clickModalDelete()} clickMenu={clickMenuHandler} disableMore={disableMore} color={colore} onClick={clickHeart} ricerca={ricerca}></ActionBar>
      
   </IonCard>
      


    
  return (
    <div >
        {showModalDeleteVar ? showModalDeleteVar : null}
        {variabile}
    </div>
  );
};

export default AnteprimaArticolo;

