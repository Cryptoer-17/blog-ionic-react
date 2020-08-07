import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, IonButtons, IonLabel, IonText, IonList } from '@ionic/react';
import AnteprimaArticolo from '../../components/AnteprimaArticolo/AnteprimaArticolo';
import moment from 'moment';
import './RisultatiRicerca.css';

const RisultatiRicerca: React.FC<{
    risultati:any,
    cerca:string,
    onRicercaArticoli:(props:any)=>void,
}>= (props) => {
    const {risultati,onRicercaArticoli} = props;


    const [classeCat,setClasseCat] = useState('');
    const [classeTag,setClasseTag] = useState('');
    const [,setCerca] = useState('');
    useEffect(()=>{
        setCerca(props.cerca);
        document.getElementById("filtroCategoria")!.click();
    },[props.cerca])


    const displayCategoryResultsHandler = () =>{
        setClasseCat('OpzioneSelezionata');
        setClasseTag('');
        onRicercaArticoli("categoria");
     }

    const displayTagResultsHandler = () =>{
        setClasseTag('OpzioneSelezionata');
        setClasseCat('');
        onRicercaArticoli( "tag");
    }

  return (
    <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonTitle class="ion-text-center ion-margin-top title-filtra-per">Filtra per</IonTitle> 
                <IonItem lines="full">
                    <IonButtons class="buttons">
                        <IonButton id = "filtroCategoria"  onClick = {displayCategoryResultsHandler}><IonLabel className={classeCat}>Categoria</IonLabel></IonButton>|
                        <IonButton id = "filtroTag" onClick = {displayTagResultsHandler}><IonLabel className={classeTag}>Tag</IonLabel></IonButton>
                    </IonButtons>
                </IonItem>
                <IonList>
                {risultati.length > 0  ?       
                    risultati.map( (art:any) =>
                    <AnteprimaArticolo 
                    id={art.articolo._id} 
                    autore={art.articolo.autore}
                    categoria = {art.articolo.categoria}
                    descrizione = {art.articolo.descrizione}
                    img = {art.articolo.img}
                    like = {art.articolo.like}
                    sottotitolo = {art.articolo.sottotitolo}
                    testo = {art.articolo.testo}
                    titolo = {art.articolo.titolo}
                    data = {moment(art.articolo.data).toDate().toISOString().substr(0,10)}
                    minuti = {art.articolo.minuti}
                    ricerca = {true}
                    key={art.articolo._id}
                    clickHeart={()=>{}}
                    showDropdown={false}
                    clickMenuHandler={()=>{}}
                    disableMore={true}/>          
                    )
                :  <IonItem lines="none" class="ion-margin-top"><IonText class="text-nothing-result">Nessun risultato.</IonText></IonItem>}   
                </IonList>
            </IonContent>
        </IonPage>
  );
};

const mapStateToProps = (state:any) =>{
    return{
    risultati: state.articolo.risultatiRicerca,
    cerca: state.articolo.cerca
    };
};

const mapDispatchToProps = (dispatch:any) => {
    return{
    onRicercaArticoli: (filtro:string) => dispatch(actions.ricercaArticoli(filtro))
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(RisultatiRicerca);
