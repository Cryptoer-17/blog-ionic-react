import React, { useState } from 'react';
import { IonItem, IonCard, IonCardHeader, IonCardContent, IonTitle, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import Info from '../InfoArticolo/InfoArticolo';

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
    clickHeart:()=>void
}>= (props) => {

  const { autore, titolo, sottotitolo,categoria, img, descrizione, clickHeart, data, minuti, id /*showDropdown*/, like/*,ricerca*/} = props;
  const [showModalDelete, setShowModalDelete] = useState(false);
  
    
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
       <IonItem routerLink={'/articolo/'+id}>
        <IonCardContent >
            <IonItem lines="none" >
                    <IonTitle class="ion-text-center">{titolo}</IonTitle>
            </IonItem>
            {sottotitolo && <React.Fragment><IonItem class="ion-margin-bottom">
                        <IonCardSubtitle color="dark" ><b>{sottotitolo}</b></IonCardSubtitle>
                </IonItem></React.Fragment>}
                {descrizione && <IonItem lines="none">
                    <IonCardSubtitle color="dark" class="ion-margin-top">{descrizione}</IonCardSubtitle>
                </IonItem>}
        </IonCardContent>
       </IonItem>
       
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