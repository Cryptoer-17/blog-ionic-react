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
        document.getElementById("messageIcon")!.click();
    }, 1000);
}

    const clickModalDelete = () => {
        setShowModalDelete(true);
    }

    
  let showModalDeleteVar;
  let colore = 'black';
  let variabile;
  
  like.map((object) => {
    if (object.username === localStorage.getItem("username")) {
        if (object.like) {
            colore = 'red';
        }
    }
    return null;
  });
 
   variabile = <IonCard>
       <IonCardHeader>
        <Info autore={autore} categoria={categoria} data={data} tempoLettura={minuti} />
       </IonCardHeader>
       <IonItem routerLink={'/articolo/'+id} lines="none">
        <div className="CardContent">
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
      
    
  {/*<NavLink to={"/articolo/" + id} style={{
       textDecoration: 'none',
       color: 'black'
   }}>
       <div id={id} className={classes.Titolo}>
           <h1>{titolo}</h1>
       </div>{sottotitolo ? <div id="divSottotitolo" className={classes.Sottotitolo}>
           <h5>{sottotitolo} </h5>
       </div> : null}
       {img ? <div className={classes.Imgdiv}>
           <img className={classes.Img} src={img} alt="" />
       </div> : null}
       {descrizione ?
           <div className={classes.Testo}>
               <p>{descrizione}</p>
           </div>
       : null}  </NavLink>
  <ActionBar id={id} showdropdown={showDropdown} viewComments={() => this.viewMessageArticle(id)} modalDelete={() => this.clickModalDelete()} clickMenu={this.props.clickMenuHandler} disableMore={this.props.disableMore} className={classes.Actions} color={colore} onClick={clickHeart} ricerca={ricerca} />*/}
    

    
  return (
    <div >
        {showModalDeleteVar ? showModalDeleteVar : null}
        {variabile}
    </div>
  );
};

export default AnteprimaArticolo;

//mettere il tag routerLink dopo aver inserito IonItem o qualcosa del genere. Per ora senza link