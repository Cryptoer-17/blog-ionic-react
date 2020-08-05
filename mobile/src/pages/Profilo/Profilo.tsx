import React, { useState } from 'react';
import { IonContent, IonHeader, IonToolbar,  IonTitle, IonPage, IonItem, IonButtons, IonButton, IonRouterLink, IonInput, IonIcon, IonLabel, IonText, IonCard, IonCardContent } from "@ionic/react";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { paperPlane} from 'ionicons/icons';

import './Profilo.css';

const Profilo: React.FC<{
    loading:boolean,
    mount:()=>void,
    loadingLogin:boolean,
    esito:string,
    esitoLogin:string,
    profilo:any,
    articoli:any
}> = (props)=>{

    const { loading, mount, loadingLogin, esito, esitoLogin, profilo, articoli } = props;

    const [anteprimaImg,setAnteprimaImg]=useState(null);
    const [presentazione,setPresentazione]=useState(false);
    const [presentazioneInput, setPresentazioneInput] = useState(false);
    const [modificaDati,setModificaDati]=useState(null);
    const [showDropdown,setShowDropdown]=useState(null);
    const [messageModalPassord,setMessageModalPassord]=useState(null);
    const [modalPassword,setModalPassword]=useState(null);
    const [descrizione,setDescrizione]=useState(null);
    const [email,setEmail]=useState(null);
    const [emailIsValid,setEmailIsValid]=useState(null);
    const [password,setPassword]=useState(null);
    const [profileForm,setProfileForm]=useState();
    const [passwordIsValid,setPasswordIsValid]=useState(null);
    const [formIsValid,setFormIsValid]=useState(null);
    const [idArticoloCambiamenti,setIdArticoloCambiamenti]=useState(null);
    const [show,setShow]=useState(false);
    const [errorMessage,seterrorMessage]=useState(null);
    const [img,setImg]= useState(null);

    const handlerClickPresentazioneInput = ()=> {
        
        setPresentazioneInput(true);
    }

    const descrizioneChangeHandler = (event:any) => {
        setDescrizione(event.target.value);
    }

    const showModal = () => {
        setShow(true);
    }

    const orderHandler = () => {
    /* showModal();
        const formData = {};
        for (let formElementIdentifier in profileForm) {
            formData[formElementIdentifier] = profileForm[formElementIdentifier].value;
        }
        const profile = {
            _id:this.state.idProfilo,
            nome: formData.nome,
            cognome: formData.cognome,
            dataNascita: formData.dataNascita.trim(),
            sesso: formData.sesso.trim(),
            numeroTelefono: formData.numeroTelefono.trim(),
            nazionalità: (formData.nazionalita.trim() === '' ? 'italia' : formData.nazionalita.trim()),
            img: this.state.img,
            username: formData.username.trim(),
            userId: localStorage.getItem('userId').trim(),
            descrizione: this.state.descrizione
        }

*/
        //faccio il controllo che l'username scelto se inserito, non sià già in uso
   /* COMMENTATO     let c = 0;
        if(formData.username.trim() !== ''){
            let profili = this.props.profili;
            for(let x in profili){
                if(profili[x].username ===  formData.username.trim()){
                    c++;
                }
            }
        }

        if(c<2){*/
            //se il profilo è già in firebase allora faccio un update del profilo e poi se è cambiato anche l'username glielo cambio in tutta l'app
        //altrimenti mando il nuovo profilo.
/* COMMENTATO       if (this.props.profiloReducer.length) {
            this.props.onUpdateData(profile, this.props.profiloReducer[0].profilo._id);
            this.props.articoli.map((articolo) => {
                */
                //faccio il map per ogni articolo per cambiare l'autore e l'username nei messaggi
                //se non è il proprietario dell'articolo faccio solo il controllo sui messaggi e cambi l'username
            /* COMMENTATO    if (articolo.articolo.userId === localStorage.getItem("userId")) {
                    let messaggioUpdate;
                    if (articolo.articolo.messaggi !== undefined) {
                        messaggioUpdate = articolo.articolo.messaggi.map((messaggio) => {
                            if (messaggio.username === localStorage.getItem("username")) {
                                messaggio.username = profile.username
                            }
                            return messaggio;
                        })
                    }
                    let updateArticolo = {
                        ...articolo.articolo,
                        autore: profile.username,
                        messaggi: (messaggioUpdate === undefined ? [] : messaggioUpdate),
                    }
                    this.props.onUpdateArticolo(updateArticolo, articolo.articolo._id);
                }
                else if (articolo.articolo.userId !== localStorage.getItem("userId")) {
                    let messaggioUpdate;
                    if (articolo.articolo.messaggi !== undefined) {
                        messaggioUpdate = articolo.articolo.messaggi.map((messaggio) => {
                            if (messaggio.username === localStorage.getItem("username")) {
                                messaggio.username = profile.username
                            }
                            return messaggio;
                        })
                    }
                    let updateArticolo = {
                        ...articolo.articolo,
                        messaggi: (messaggioUpdate === undefined ? [] : messaggioUpdate),
                    }
                    this.props.onUpdateArticolo(updateArticolo, articolo.articolo._id);
                }
                return null;
            })
        }
        else {
            this.props.onSendData(profile);
        }
        setTimeout(() => {
            if (this.props.esito === "I dati sono stati inviati/modificati con successo.") {
                window.location.reload();
            }
        }, 1000);
        }else {
            this.setState({
                errorMessage:'Errore nell\'aggiornare il profilo. L\'username scelto è già in uso'
            })
        }

        */
    }

    let emailVar;
    let modificaEmail;
    let modificaPassword;
    emailVar = localStorage.getItem('email');

    let presentazioneVisualizzata;
    let btnInviaInfo = null;

    console.log(presentazione);
    {presentazione === false && presentazioneInput === false? 
        presentazioneVisualizzata = <IonButton onClick={() => handlerClickPresentazioneInput()} fill="clear"><IonLabel class="ion-text-lowercase label-breve-presentazione" color="primary">Aggiungi una breve presentazione</IonLabel></IonButton>
        :presentazioneInput === true && ((presentazioneVisualizzata=<IonItem><IonInput type="text" placeholder="breve presentazione di te" onIonChange={descrizioneChangeHandler} value={descrizione}></IonInput></IonItem>) &&
        (btnInviaInfo = <IonButton onClick={orderHandler} color="dark"><IonIcon icon={paperPlane}></IonIcon><IonLabel>Invia breve presentazione</IonLabel></IonButton>))
    }

   /* {
        presentazione === null ?
            presentazioneVisualizzata = <button className={classes.BtnPresentazione} onClick={() => this.handlerClickPresentazione()}><i>Aggiungi una breve presentazione</i></button>
            : presentazione === false && ((presentazioneVisualizzata = <div style={{ marginTop: '-27px', height: '49%' }}><blockquote></blockquote><Input type="text" config={{ placeholder: 'breve presentazione di te' }} changed={this.descrizioneChangeHandler} 
            value={descrizione} click = {this.doNothing}/></div>) && (btnInviaInfo = <button onClick={this.orderHandler} className={classes.ButtonSend}  ><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Invia breve presentazione</button>))
    }*/

    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonTitle class="ion-text-center text-profilo-persona ion-margin-top" size="large">Profilo Persona</IonTitle>
                <IonCard>
                    <IonCardContent>
                        <IonItem lines="none">
                            <IonText ><b>INFORMAZIONI</b></IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonText >BREVE PRESENTAZIONE:</IonText>
                            {presentazioneVisualizzata}
                        </IonItem>
                    </IonCardContent>
                </IonCard>
                
            </IonContent>
        </IonPage>
    );
}


const mapStateToProps = (state:any) => {
    return {
        articoli: state.articolo.articoli,
        loading: state.profilo.loading,
        esito: state.profilo.esitoCaricamento,
        profiloReducer: state.profilo.profilo,
        loadingLogin: state.auth.loading,
        esitoLogin:state.auth.esitoCaricamento,
        profili:state.profilo.profili
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        // onGoogleAuth: () => dispatch(actions.googleAuth()),
        // onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
        // onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))
        onSendData: (data:any) => dispatch(actions.sendData(data)),
        onUpdateData: (data:any, idProfilo:string) => dispatch(actions.updateData(data, idProfilo)),
        onUpdateArticolo: (articolo:any, idArticolo:string) => dispatch(actions.updateArticolo(articolo, idArticolo)),
      /*  onChangeEmail : (email:string) => dispatch(actions.updateEmail(email)),
        onChangePassword:(password:string) => dispatch(actions.updatePassword(password))*/
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profilo);