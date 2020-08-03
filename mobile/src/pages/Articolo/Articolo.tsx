import React, { useState, useEffect } from 'react';
import { IonItem, IonPage, IonContent, IonTitle, IonHeader, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonImg, IonThumbnail } from "@ionic/react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Tag from '../../components/Tag/Tag';
import moment from 'moment';
import Info from '../../components/InfoArticolo/InfoArticolo';
import ActionBar from '../../components/ActionBar/ActionBar';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Comments from '../../components/Articolo/Comments/Comments';
import './Articolo.css';

const Articolo: React.FC<{
    onInitArticoli:()=>void
}> = (props)=>{
    const [articolo, setArticolo]:any = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState(false);
    const [render, setRender] = useState(false);
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


    const viewCommentsHandler = ()=> {
        setComments(true)
        setTimeout(() => {
            window.scrollTo(0, 9999)
        }, 1);
    }

    const handlerSendMessage = (props:any) => {
        console.log(props);
        let messaggio;
        const messaggi = [
            ...props.articolo.messaggi,
            messaggio = {
                username: localStorage.getItem("username"),
                testo: props
            }
        ]
        const anteprima = {
            ...props.articolo,
            messaggi: messaggi,
        }
        setArticolo(anteprima);
        const id = location;
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.put('http://localhost:4001/articolo/update/' + id, anteprima,config)
            .then(response => {
                props.onInitArticoli();
            })
            .catch(error => console.log(error));
    }

    const clickHeartHandler = () => {
        let length = articolo.like.length;
        let c = 0;
        let heartChange = articolo.like.map((object:any) => {
            if (object.username === localStorage.getItem("username")) {
                object.like = !object.like
            }
            else {
                c++;
            }
            return object
        })
        if (c === length) {
            heartChange.push({ like: true, username: localStorage.getItem("username") })
        }
        const anteprima = {
            ...articolo,
            like:heartChange
        }
        setArticolo(anteprima);
        const id = location;
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.put('http://localhost:4001/articolo/update/' + id, anteprima,config)
            .then(response => {
                props.onInitArticoli();
            })
            .catch(error => console.log(error));
    }

    const riRender = ()=>{
        setRender(!render);
    }


    let articoloVisualizzato;
    let colore = 'dark';
    let tags;
    console.log("ri-render");
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
                    colore = 'danger';
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
                <ActionBar color={colore} disableMore={true} viewComments={() => viewCommentsHandler()} onClick={() => clickHeartHandler()} id={""} showdropdown={false} modalDelete={() => {}} clickMenu={()=>{}} ricerca={false}/>
                </IonCardContent>
            </div>
        </IonCard>
    }
    return(
        <IonContent scrollEvents={true}>
            <br></br><br></br><br></br>
            {articoloVisualizzato}
            {comments && <Comments {...props} cmpDidMount={()=>riRender()} articolo={articolo} clickSendMessage={()=>{handlerSendMessage(props);console.log(props)}} />}
        </IonContent>
    );
}

const mapStateToProps = (state:any) => {
    return {
        error: state.articolo.error,
    };
};
const mapDispatchToProps = (dispatch:any) => {
    return {
        onInitArticoli: () => dispatch(actions.initArticoli()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Articolo);