import React, { useState, useEffect } from 'react';
import { IonItem, IonPage, IonContent, IonTitle, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonImg, IonThumbnail } from "@ionic/react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Tag from '../../components/Tag/Tag';
import moment from 'moment';
import Info from '../../components/InfoArticolo/InfoArticolo';
import './Articolo.css';
const Articolo: React.FC = (props)=>{
    const [articolo, setArticolo]:any = useState(null);
    const [loading, setLoading] = useState(false);
    
    let location = useLocation().pathname.slice(10);

    useEffect(()=>{
        const id = location;
    
        setLoading(true);
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.get('http://localhost:4001/articolo/' + id,config)
        .then(response => {
            console.log(response);
            if (typeof response.data[0].tags === 'undefined') {  
                response.data[0].tags = [];
            }
            if (typeof response.data[0].messaggi === 'undefined') {
                response.data[0].messaggi = [];
            }
            setArticolo(response.data[0])
            setLoading(false)
        })
        .catch(error => {
            setLoading(false)
        });
    },[])


    let articoloVisualizzato;
    let colore = 'black';
    let tags;

    console.log(articolo);
    if(articolo != null){
        if (articolo?.tags.length) {
            const newtags = [...articolo.tags];
            tags = newtags.map((tag, index) => {
                return (
                    <div className={'Tag'} key={index}>
                        <Tag click={()=>{}}>{tag}</Tag>
                    </div>
                );
            })
        }
        articolo.like.map((object:any) => {
            if (object.username === localStorage.getItem("username")) {
                if (object.like) {
                    colore = 'red';
                }
            }
            return null;
        });
        let data = moment(articolo.data).toDate().toISOString().substr(0,10)
        articoloVisualizzato = <IonCard>
            <IonCardHeader>
                <Info  autore={articolo.autore} categoria={articolo.categoria} data={data} tempoLettura={articolo.minuti} />
            </IonCardHeader>
            <div className="CardContent">
                <IonCardContent>
                    <IonItem lines="none" >
                            <IonTitle class="ion-text-center ion-margin-bottom" className="Titolo"><b>{articolo.titolo}</b></IonTitle>
                    </IonItem>
                    {articolo.sottotitolo && 
                            <IonCardSubtitle color="dark" class="ion-margin-bottom ion-text-center ion-margin-top">{articolo.sottotitolo}</IonCardSubtitle>
                    }
                    <IonItem lines="none">
                            <IonImg src={articolo.img} className="center-image border-solid"/>
                    </IonItem>    
                    {articolo.testo && <IonItem lines="none">
                    <IonCardSubtitle color="dark" class="ion-margin-top">{articolo.testo}</IonCardSubtitle>
                    {tags}
                </IonItem>}
                </IonCardContent>
            </div>
        </IonCard>
    }
    return(
        <>
        <br></br><br></br><br></br>
        {articoloVisualizzato}
        </>
            
    );
}

export default Articolo;