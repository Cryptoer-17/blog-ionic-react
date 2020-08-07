import React, { useState } from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import axios from 'axios';
import {  IonItem, IonText, IonButton } from '@ionic/react';
import './EliminaArticolo.css';
const ExploreContainer: React.FC<{
    id:string,
    mount:()=>void,
    hideModal:()=>void
}> = (props) => {

    const {id, mount} = props;

    const [loading, setLoading] = useState<any>();

    const clickBtnSi = () => {
        setLoading(<Spinner />);
        let config = {
            headers: {
                authorization: 'Bearer '+ localStorage.getItem("token"),
            }
          }
        axios.delete('http://localhost:4001/articolo/delete/' + id, config)
            .then(response => {
                setLoading(null);
                setTimeout(() => {
                    mount();
                    window.location.reload();
                }, 500)
            })
            .catch(error => {
                //gestire errore
                setLoading(null)
            });
    }

  return (
    <>
        {loading}
        <IonItem lines="none">
            <IonText>SEI SICURO DI VOLER ELIMINARE IL POST?</IonText>
        </IonItem>
        <IonItem lines="none">
            <div className="BtnDiv">
                <IonButton 
                id="buttonDeleteArticle" 
                onClick={clickBtnSi} 
                size="large" 
                color="dark" 
                fill="outline" 
                class="btn-si" 
                onMouseEnter={()=>document.getElementById('buttonDeleteArticle')!.setAttribute("color","danger")} 
                onMouseLeave={()=>document.getElementById('buttonDeleteArticle')!.setAttribute("color","dark")}>SI</IonButton>
                <IonButton 
                id="buttonNoDeleteArticle"
                onClick={props.hideModal} 
                size="large" 
                color="dark" 
                fill="outline" 
                class="btn-no"
                onMouseEnter={()=>document.getElementById('buttonNoDeleteArticle')!.setAttribute("color","success")} 
                onMouseLeave={()=>document.getElementById('buttonNoDeleteArticle')!.setAttribute("color","dark")}>NO</IonButton>
            </div>
        </IonItem>
        
    </>
  );
};

/*
<div>
{loading}
<p>SEI SICURO DI VOLER ELIMINARE IL POST?</p>
<button className={classes.ButtonDelete} onClick={clickBtnSi}>SI</button>
<button className={classes.ButtonNoDelete} onClick={props.hideModal}>NO</button>
</div>*/

export default ExploreContainer;
