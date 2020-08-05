import React, { useState } from 'react';
import { IonContent, IonHeader, IonToolbar,  IonTitle, IonPage, IonItem, IonButtons, IonButton, IonRouterLink, IonInput, IonIcon, IonLabel, IonText, IonCard, IonCardContent, IonImg, IonRadio, IonRadioGroup, IonSelect, IonSelectOption } from "@ionic/react";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { paperPlane,mail} from 'ionicons/icons';
import checkValidity from '../../utility/validation';
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

    console.log(profilo);

    const [anteprimaImg,setAnteprimaImg]=useState(null);
    const [presentazione,setPresentazione]=useState(false);
    const [presentazioneInput, setPresentazioneInput] = useState(false);
    const [modificaDati,setModificaDati]=useState(false);
    const [showDropdown,setShowDropdown]=useState(null);
    const [messageModalPassord,setMessageModalPassord]=useState(null);
    const [modalPassword,setModalPassword]=useState(null);
    const [descrizione,setDescrizione]=useState(null);
    const [email,setEmail]=useState(null);
    const [emailIsValid,setEmailIsValid]=useState(null);
    const [password,setPassword]=useState(null);
    const [profileForm,setProfileForm]:any=useState({
        nome:{ elementType: 'input',
                elementConfig: {
                type: 'text',
                placeholder: 'Tuo nome'
                },
                value: '' + profilo.nome + '',
                valid: true,
                touched: false
            },
            cognome: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tuo cognome'
                },
                value: '' + profilo.cognome + '',
                valid: true,
                touched: false
            },
            dataNascita: {
                elementType: 'input',
                elementConfig: {
                    type: 'date'
                },
                validation: {
                    isDate: true
                },
                value: '' + profilo.dataNascita + '',
                valid: true,
                touched: false
            },
            sesso: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                    options: [
                        { value: 'f', displayValue: 'F' },
                        { value: 'm', displayValue: 'M' }
                    ]
                },
                value: '' + profilo.sesso + '',
                valid: true,
                touched: false

            },
            numeroTelefono: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Tuo numero  telefono'
                },
                value: '' + profilo.numeroTelefono + '',
                validation: {
                    minLength: 10,
                    maxLength: 10
                },
                valid: true,
                touched: false
            },
            nazionalita: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'italia', displayValue: 'Italia' },
                        { value: 'irlanda', displayValue: 'Irlanda' },
                        { value: 'svezia', displayValue: 'Svezia' },
                        { value: 'finlandia', displayValue: 'Finlandia' },
                        { value: 'grecia', displayValue: 'Grecia' },
                        { value: 'spagna', displayValue: 'Spagna' },
                        { value: 'inghilterra', displayValue: 'Inghilterra' }
                    ]
                },
                value: '' + profilo.nazionalità + '',
                valid: true
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '' + profilo.username + '',
                validation: {
                    isUsername: true
                },
                valid: true,
                touched: false
            }
    });
    const [passwordIsValid,setPasswordIsValid]=useState(null);
    const [formIsValid,setFormIsValid]=useState(false);
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

    const handlerModificaDati = ()=> {
        setModificaDati( !modificaDati)
        setTimeout(() => {
            window.scrollTo(0, 609)
        }, 40);
    }

    const inputChangedHandler = (event:any, inputIdentifier:any) => {
        const updatedprofileForm = {
            ...profileForm
        }
        const updatedFormElement = {
            ...updatedprofileForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedprofileForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedprofileForm) {
            formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
        }
        setProfileForm(updatedprofileForm);
        setFormIsValid(formIsValid);

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
        (btnInviaInfo = <IonButton class="ion-float-right" onClick={orderHandler} fill="outline" color="dark"><IonIcon icon={paperPlane} slot="start"></IonIcon><IonLabel>Invia breve presentazione</IonLabel></IonButton>))
    }


    const formElemetsArray = [];
        for (let key in profileForm) {
            formElemetsArray.push({
                id: key,
                config: profileForm[key],

            })
        }
    console.log(formElemetsArray);
    let form = (
        formElemetsArray.map(formElement=>{
            console.log(formElement);
            return formElement.id !== 'sesso' && formElement.id !== 'nazionalita' ?(<IonItem  key={formElement.id}>
                 <IonInput 
                type={formElement.config.elementConfig.type} 
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.value} 
                onIonChange={(event) => inputChangedHandler(event, formElement.id)}
               /* className={!emailValid  ? 'Invalid' : ''}*/
                /></IonItem>):formElement.id === 'sesso' ? <IonItem key={formElement.id}><IonRadioGroup  value={formElement.config.value} onIonChange={(event) => inputChangedHandler(event, formElement.id)}>
                    <IonLabel>Sesso:</IonLabel>
                    <IonItem lines="none">
                        <IonLabel>F</IonLabel>
                        <IonRadio slot="start" value={formElement.config.elementConfig.options[0].value} />
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>M</IonLabel>
                        <IonRadio slot="start" value={formElement.config.elementConfig.options[1].value} />
                    </IonItem>
                </IonRadioGroup></IonItem> : <IonItem key={formElement.id}>
                    <IonLabel>Nazionalità:</IonLabel>
                    <IonSelect value={formElement.config.value} onIonChange={(event) => inputChangedHandler(event, formElement.id)}>
                        <IonSelectOption value={formElement.config.elementConfig.options[0].value}>Italia</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[1].value}>Irlanda</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[2].value}>Svezia</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[3].value}>Finlandia</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[4].value}>Grecia</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[5].value}>Spagna</IonSelectOption>
                        <IonSelectOption value={formElement.config.elementConfig.options[6].value}>Inghilterra</IonSelectOption>
                    </IonSelect>
                    </IonItem>
        })
    );

    let pageModificaDati = (
        <IonCard>
            <IonCardContent>
                {/* modificaEmail */}
                {/* modificaPassword */}
                <IonItem lines="none">
                    <IonText><b>MODIFICA I TUOI DATI</b></IonText>
                </IonItem>
                {form}
            </IonCardContent>
        </IonCard>
    );

    /*let pageModificaDati = (<div className={classes.ModificaDati}>
        /*{modificaEmail}
        {modificaPassword}
       <h3>MODIFICA I TUOI DATI</h3>
       {form}
       <h3>MODIFICA LA TUA FOTO PROFILO</h3>
       <div className={classes.DivFoto} >
           <button className={classes.CaricaImgButton} onClick={() => document.getElementById("inputFile").click()}> <i className="material-icons" style={{ verticalAlign: 'middle' }}>photo_camera</i> Carica foto profilo</button>

           {anteprimaImg ? anteprimaImg : null}</div>
       <input id="inputFile" type="file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={event => this.convertFile(event.target.files[0])} style={{ width: '0px' }}/* style = {{display:'none', visibility:'hidden',zIndex:'-200'}}*//* />
       <button className={classes.ButtonSend} onClick={this.orderHandler} disabled={!formIsValid} style={{ position: 'absolute', right: '0px', bottom: '0px' }}><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Invia dati</button>
   </div>);*/
  

    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonTitle class="ion-text-center text-profilo-persona ion-margin-top" size="large">Profilo Persona</IonTitle>
                <IonCard class="ion-margin-bottom">
                    <IonCardContent>
                        <IonItem lines="none">
                            <IonText ><b>INFORMAZIONI</b></IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonText >BREVE PRESENTAZIONE:</IonText>
                            {presentazioneVisualizzata}
                        </IonItem>
                        {btnInviaInfo}
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonItem>
                            <IonText><b>DATI PERSONALI</b></IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonText >Email:</IonText>
                            <IonText> {emailVar}</IonText>
                        </IonItem>
                        <IonItem>
                            <IonText >Username:</IonText>
                            {profilo.username !== "" ? <IonText>{profilo.username}</IonText> : <IonText><b>non ancora inserito</b></IonText>}
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Nome:</IonText>
                            {profilo.nome !== "" ? <IonText>{profilo.nome}</IonText> : <IonText><b>non ancora inserito</b></IonText>}
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Cognome:</IonText>
                            {profilo.cognome !== "" ? <IonText>{profilo.cognome}</IonText> : <IonText><b>non ancora inserito</b></IonText>}      
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Data di nascita:</IonText>
                            {profilo.dataNascita !== "" ? <IonText>{profilo.dataNascita}</IonText> : <IonText><b>non ancora inserita</b></IonText>}
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Sesso:</IonText>
                            {profilo.sesso !== "" ? <IonText>{profilo.sesso}</IonText> : <IonText><b>non ancora inserito</b></IonText>}
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Numero di telefono:</IonText>
                            {profilo.numeroTelefono !== "" ? <IonText>{profilo.numeroTelefono}</IonText> : <IonText><b>non ancora inserito</b></IonText>}
                        </IonItem>
                        <IonItem>
                            <IonText>Nazionalità:</IonText>
                            {profilo.nazionalità !== "" ? <IonText>{profilo.nazionalità}</IonText> : <IonText><b>non ancora inserita</b></IonText>}
                        </IonItem>
                        <IonItem lines="none">
                            <IonText>Foto profilo:</IonText>
                            {profilo.img !== undefined && profilo.img !== ''? <IonImg src={profilo.img} alt=""></IonImg>: <IonText><b>Non ancora inserita</b></IonText>}
                        </IonItem>
                        <IonButton class="ion-float-right" fill="outline" color="dark" onClick={() => handlerModificaDati()}><IonIcon icon={mail} slot="start"></IonIcon><IonLabel>Mostra dati da modificare</IonLabel></IonButton>
                    </IonCardContent>
                </IonCard>

                {(modificaDati) ? pageModificaDati : null}

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