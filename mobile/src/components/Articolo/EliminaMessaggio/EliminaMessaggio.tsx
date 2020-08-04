import React from 'react';
import { useLocation } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import { IonTitle, IonButton } from '@ionic/react';

const EliminaMessaggio: React.FC<{
    cmpDidMount:()=>void,
    indexmsg:number,
    articolo:any,
    loading:boolean
    hideModal:()=>void,
    onUpdateArticolo:(updateArticolo:any,id:string)=>void
}> = (props) => {

    const {articolo, indexmsg, loading} = props;    
    let location = useLocation().pathname.substr(10);

    const clickBtnSi = () => {
        const id = location;
        let messageUpdate=[...articolo.messaggi];
        messageUpdate.splice(indexmsg,1)

        let updateArticolo={
            ...articolo,
            messaggi:messageUpdate
        }
        props.onUpdateArticolo(updateArticolo,id);
        props.hideModal();
        setTimeout(() => {
            props.cmpDidMount();
        }, 300);
       
    }

  return (
    <>
            {loading ? <Spinner /> : null}
            <IonTitle>SEI SICURO DI VOLER </IonTitle>
            <IonTitle>ELIMINARE IL MESSAGGIO?</IonTitle>
            <IonButton class="btn-hover-delete ion-margin-start" onClick={clickBtnSi} >SI</IonButton>
            <IonButton class="btn-hover-nodelete" onClick={props.hideModal}>NO</IonButton>
    </>
  );
};


const mapStateToProps = (state:any) => {
    return {
        loading: state.articolo.loading,
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onUpdateArticolo: (articolo:any, idArticolo:string) => dispatch(actions.updateArticolo(articolo, idArticolo)),
        onInitArticoli: () => dispatch(actions.initArticoli()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EliminaMessaggio);
