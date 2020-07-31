import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCard } from '@ionic/react';
import React, { useRef } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import ScrollUpButton from '../../components/UI/ScrollUpButton/ScrollUpButton';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import AnteprimaArticolo from '../../components/AnteprimaArticolo/AnteprimaArticolo';
import moment from 'moment';


const Home: React.FC<{
articoli:any[],
spinner:boolean,
errore:string,
mount:()=>void,
error:string,
}> = (props) => {

const clickHeartHandler = (art:any)=>{

}
 /* clickHeartHandler(art){
    let length = art.articolo.like.length;
    let c = 0;
    let heartChange = art.articolo.like.map((object)=>{
       if(object.username === localStorage.getItem("username")){
          object.like = !object.like
       }
       else{
          c++;
       }
       return object
    })
    if(c === length){
       heartChange.push({like:true, username:localStorage.getItem("username")})
    }
    
    const anteprima = {
        ...art.articolo,
        like: heartChange
    } 
    const id = art.articolo._id;
    let config = {
       headers: {
           authorization: 'Bearer '+ localStorage.getItem("token"),
       }
     }
    axios.put('http://localhost:4001/articolo/update/'+ id,anteprima,config)
    .then(response => {
       this.props.mount();
    })
    .catch(error => console.log(error));
}*/


  /*let {spinner, articoli , errore,mount,error} = props;*/

  let {articoli,spinner,errore,mount,error} = props;
  const contentRef = useRef(null);
    
  const scrollTop = ()=>{
    if(contentRef){
      contentRef.current?.scrollToTop(1000);
    }
    
  }



  let errorMessage = null;
   if(typeof errore === 'undefined'){
     errorMessage =  <IonTitle class="ion-text-center">Errore nel caricamento dati.</IonTitle>;
   }
 
   let articoliVisualizzati;

  if(spinner){
    articoliVisualizzati = <Spinner />
  }else{
     
  articoliVisualizzati = articoli.map((art) =>{
   let data;
     if(art.articolo.data){
     data = moment(art.articolo.data).toDate().toISOString().substr(0,10);
     }
     return (<AnteprimaArticolo 
        id={art.articolo._id} 
        autore={art.articolo.autore}
        categoria = {art.articolo.categoria}
        descrizione = {art.articolo.descrizione}
        img = {art.articolo.img}
        like = {art.articolo.like}
        sottotitolo = {art.articolo.sottotitolo}
      /*  testo = {art.articolo.testo}*/
        titolo = {art.articolo.titolo}
        data = {data}
        minuti = {art.articolo.minuti}
       /* disableMore = {true}
        mount = {mount}*/
        clickHeart = {() => clickHeartHandler(art)} 
        key={art.articolo._id}/>);
  })
  }

  let errorVar;
   if(error === "Auth token is expired"){
     /* errorVar = document.getElementById("btnLoginLogout").click()  */ 
   }




  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} ref={contentRef}>
        
        <IonToolbar>
            <IonTitle class="ion-text-center">Blog</IonTitle>
        </IonToolbar> 
        {errorMessage ? errorMessage : null}
        {
         articoli ?
         articoliVisualizzati 
         : null
        }
         {errorVar }
        <div className="ScrollUpButton">
          <ScrollUpButton clicked={scrollTop}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state:any) =>{
  
  return{
     articoli : state.articolo.articoli,
     error:state.articolo.error
  }
}

export default connect(mapStateToProps,null)(Home);
