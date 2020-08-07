import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonToolbar,  IonTitle, IonPage, IonItem, IonButtons, IonButton, IonRouterLink, IonInput, IonIcon, IonLabel, IonText, IonCard, IonCardContent, IonImg, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonThumbnail } from "@ionic/react";
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { paperPlane,mail, camera, closeOutline} from 'ionicons/icons';
import checkValidity from '../../utility/validation';
import history from '../../utility/history';
import './Profilo.css';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';

const Profilo: React.FC<{
    loading:boolean,
    mount:()=>void,
    loadingLogin:boolean,
    esito:string,
    esitoLogin:string,
    profilo:any,
    articoli:any,
    profili:any,
    profiloReducer:any,
    onUpdateData:(profile:any, profiloReducer:any)=>void,
    onUpdateArticolo:(updateArticolo:any, idArticolo:string)=>void,
    onSendData:(profile:any)=>void,
    onChangeEmail:(email:string)=>void,
    onChangePassword:(password:string)=>void
}> = (props)=>{

    const { loading, mount, loadingLogin,esito,  esitoLogin, profilo, articoli,profili, profiloReducer, onUpdateData, onUpdateArticolo, onSendData, onChangeEmail,
        onChangePassword } = props;

    

    const [anteprimaImg,setAnteprimaImg]:any=useState();
    const [presentazione,setPresentazione]=useState(false);
    const [presentazioneInput, setPresentazioneInput] = useState(false);
    const [modificaDati,setModificaDati]=useState(false);
    const [showDropdown,setShowDropdown]=useState(null);
    const [messageModalPassord,setMessageModalPassord]=useState<any>();
    const [modalPassword,setModalPassword]=useState<boolean>(false);
    const [descrizione,setDescrizione]=useState<string>();
    const [email,setEmail]=useState<any>({
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'email'
        },
        value: '' + localStorage.getItem("email") + '',
        validation: {
            isEmail: true
        },
        valid: true,
        touched: false
    },);
    const [emailIsValid,setEmailIsValid]=useState<boolean>();
    const [password,setPassword]=useState<any>({
        oldpassword:{
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Vecchia password'
            },
            validation: {
                minLength: 6,
                required:true
            },
            value: '',
            valid: false,
            touched: false
        },
        newpassword1:{
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Nuova password'
            },
            validation: {
                minLength: 6,
                required:true
            },
            value: '',
            valid: false,
            touched: false
        },
        newpassword2:{
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Nuova password'
            },
            validation: {
                minLength: 6,
                required:true
            },
            value: '',
            valid: false,
            touched: false
        }
    });
    const [profileForm,setProfileForm]:any=useState();
    const [passwordIsValid,setPasswordIsValid]=useState<boolean>(false);
    const [formIsValid,setFormIsValid]=useState(true);
    const [idArticoloCambiamenti,setIdArticoloCambiamenti]=useState(null);
    const [show,setShow]=useState(false);
    const [errorMessage,seterrorMessage]=useState<string>('');
    const [img,setImg]= useState<any>();


    useEffect(()=>{
        setDescrizione('' + profilo.descrizione + '');
        if(profilo.descrizione.length>0){
            setPresentazioneInput(true);
        }
        setImg(profilo.img === undefined ? null : profilo.img);
        setProfileForm({
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
                        maxLength: 10,
                        isNumeric:true
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
        })
    },[profilo])


    const handlerClickPresentazioneInput = ()=> {
        
        setPresentazioneInput(true);
    }

    const descrizioneChangeHandler = (event:any) => {
        setDescrizione(event.target.value);
    }

    const hideModalPassword = () => {
        setModalPassword(false);
    }
    const showModalPassword = () => {
        setModalPassword(true);
    }

    const showModal = () => {
        setShow(true);
    }


    const orderHandler = () => {

     showModal();
        const formData:any = {};
        for (let formElementIdentifier in profileForm) {
            formData[formElementIdentifier] = profileForm[formElementIdentifier].value;
        }
        const profile = {
           _id:profilo._id,
            nome: formData.nome,
            cognome: formData.cognome,
            dataNascita: formData.dataNascita.trim(),
            sesso: formData.sesso.trim(),
            numeroTelefono: formData.numeroTelefono.trim(),
            nazionalità: (formData.nazionalita.trim() === '' ? 'italia' : formData.nazionalita.trim()),
            img: img,
            username: formData.username.trim(),
            userId: localStorage.getItem('userId')!.trim(),
             descrizione: descrizione
        }

        console.log(profili);
        //faccio il controllo che l'username scelto se inserito, non sià già in uso
       let c = 0;
        if(formData.username.trim() !== ''){
            let profiliReducer = profili;
            for(let x in profiliReducer){
                if(profiliReducer[x].username ===  formData.username.trim()){
                    c++;
                }
            }
        }

       if(c<1){
            if (profiloReducer.length) {
                    onUpdateData(profile, profiloReducer[0].profilo._id);
                    articoli.map((articolo:any) => {
                  
                    if (articolo.articolo.userId === localStorage.getItem("userId")) {
                            let messaggioUpdate;
                            if (articolo.articolo.messaggi !== undefined) {
                                messaggioUpdate = articolo.articolo.messaggi.map((messaggio:any) => {
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
                            onUpdateArticolo(updateArticolo, articolo.articolo._id);
                            setTimeout(()=>{
                                window.location.reload();
                            },2500)
                        }
                        else if (articolo.articolo.userId !== localStorage.getItem("userId")) {
                            let messaggioUpdate;
                            if (articolo.articolo.messaggi !== undefined) {
                                messaggioUpdate = articolo.articolo.messaggi.map((messaggio:any) => {
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
                            onUpdateArticolo(updateArticolo, articolo.articolo._id);
                            setTimeout(()=>{
                                window.location.reload();
                            },2500)
                        }
                        return null;
                    })
                }
                else {
                    onSendData(profile);
                    setTimeout(()=>{
                        history.push('/home')
                        window.location.reload();
                    },2000)
                }
           /* setTimeout(() => {
                if (caricamentoProfilo === "I dati sono stati inviati/modificati con successo.") {
                    window.location.reload();
                }
            }, 2000);*/
       }else {
            seterrorMessage('Errore nell\'aggiornare il profilo. L\'username scelto è già in uso');
            setTimeout(()=>{
                window.location.reload();
            },2500)
        }

        
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
        console.log(updatedFormElement);
        updatedFormElement.touched = true;
        updatedprofileForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedprofileForm) {
            formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
        }
        setProfileForm(updatedprofileForm);
        setFormIsValid(formIsValid);

    }


    const convertFile = (e:any) => {
        let reader = new FileReader();
        console.log("cliccato");
        if (e !== undefined) {
            reader.readAsDataURL(e);
            reader.onloadend = () => {
                let readerRes:string = reader.result as string;
                setImg(reader.result);
                setAnteprimaImg(<IonItem lines="none"><IonThumbnail><IonImg src={readerRes} alt=""></IonImg></IonThumbnail><IonButton class="btn-close-img" color="dark" fill="clear" onClick = {()=>clickCloseImg()}><IonIcon icon={closeOutline} slot="start"></IonIcon></IonButton></IonItem>)
            }
        }
        else {
            setImg(null);
            setAnteprimaImg(null);
            let inputFile:any = document.getElementById("inputFile");
            inputFile.value = null; /** vedere se click close è corretto */
        }
    };


    const clickCloseImg = ()=> {      
        setAnteprimaImg(null);
        setImg(null);   
        let inputFile:any = document.getElementById("inputFile");
        inputFile.value = null; /** vedere se click close è corretto */
    }


    const inputChangeEmail = (event:any) => {
        const updateEmail ={
            ...email
        }
        updateEmail.value=event.target.value;
        updateEmail.valid = checkValidity(updateEmail.value,updateEmail.validation);
        updateEmail.touched = true;

        let emailIsValid = updateEmail.valid;
        setEmail(updateEmail);
        setEmailIsValid(emailIsValid);
    }

    const handlerChangeEmail = ()=>{
        showModal();
        onChangeEmail(email.value);
        setTimeout(() => {   
                window.location.reload();
        }, 4000)
    }

    const inputChangePassword = (event:any , inputIdentifier:any) =>{
        const updatedPasswordForm = {
            ...password
        }
        const updatedPasswordElement = {
            ...updatedPasswordForm[inputIdentifier]
        }
        updatedPasswordElement.value = event.target.value;
        updatedPasswordElement.valid = checkValidity(updatedPasswordElement.value, updatedPasswordElement.validation);
        updatedPasswordElement.touched = true;
        updatedPasswordForm[inputIdentifier] = updatedPasswordElement;
        let passwordIsValid = true;
        for(let inputIdentifier in updatedPasswordForm){
            passwordIsValid = updatedPasswordForm[inputIdentifier].valid && passwordIsValid;
        }
        setPassword(updatedPasswordForm);
        setPasswordIsValid(passwordIsValid);

    }


    const passswordChangeHandler = ()=>{
       let errorePassword=false;
        let passwordData:any = {};
        for (let passwordElementIdentifier in password) {
            passwordData[passwordElementIdentifier] = password[passwordElementIdentifier].value;
        }
         const psw ={
            oldpassword:passwordData.oldpassword,
            newpassword1:passwordData.newpassword1,
            newpassword2:passwordData.newpassword2
        }
        let url = 'http://localhost:4001/login';
        const authData ={
            username : localStorage.getItem("email"),
            password:psw.oldpassword,
          }
          axios.post(url,authData)
          .then(response=>{
          })
          .catch(error =>{
            errorePassword=true;
            showModalPassword();
            setMessageModalPassord(<Modal show={true} modalClosed={()=>hideModalPassword()}>
                <IonItem>
                    <IonText><b>Errore!!</b></IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonText color="dark">La vecchia password inserita non corrisponde a quella memorizzata,
                     si prega di reinserire correttamente la vecchia password.</IonText>
                </IonItem>
        </Modal>)
           setTimeout(()=>{
                window.location.reload();
           },4500)

          })

          if(psw.newpassword1 !== psw.newpassword2){
              console.log("entrato");
            errorePassword=true;
            showModalPassword();
            setMessageModalPassord(<Modal show={true} modalClosed={()=>hideModalPassword()}>
                <IonItem>
                    <IonText color="dark"><b>Errore!!</b></IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonText color="dark">Purtroppo la nuova password inserita non risulta uguale in entrambi i campi, 
                    si prega di reinserire correttamente la nuova password da utilizzare.</IonText>
                </IonItem>   
            </Modal>)
            setTimeout(()=>{
                window.location.reload();
            },4500)
          }

          if(!errorePassword){
              //completo il cambio password
              showModal();
              onChangePassword(psw.newpassword1);
              setTimeout(() => {
                    window.location.reload();
            }, 2500)
          }

    }

    let emailVar;
    let modificaEmail;
    let modificaPassword;
    emailVar = localStorage.getItem('email');

    let presentazioneVisualizzata;
    let btnInviaInfo = null;



    let passwordElementsArray = [];
        for(let key in password){
            passwordElementsArray.push({
                id:key,
                psw:password[key]
            })
        }

        modificaPassword = (<React.Fragment><IonItem lines="none">
            <IonText><b>MODIFICA PASSWORD</b></IonText>
        </IonItem>
        {passwordElementsArray.map((elementArray)=>{
            console.log(elementArray);
            return <IonItem key={elementArray.id} className={!elementArray.psw.valid && elementArray.psw.touched ? 'Invalid' : ''}>
                <IonInput  
                type="password" 
                value={elementArray.psw.value} 
                placeholder={elementArray.psw.elementConfig.placeholder}
                onIonChange={(event) => inputChangePassword(event, elementArray.id)}></IonInput>
            </IonItem>
        })}
        <IonItem lines="none">
            <IonButton color="dark" fill="outline" onClick={passswordChangeHandler} disabled={!passwordIsValid} class="btn-change-psw">
                <IonIcon slot="start" icon={paperPlane}></IonIcon>
                <IonLabel>Modifica la password</IonLabel>
            </IonButton>
        </IonItem>
        </React.Fragment>)
   /*     modificaPassword = ( <div><h3>MODIFICA PASSWORD</h3>
           {passwordElementsArray.map(elementArray=>(
               <Input
                    key={elementArray.id}
                    type={elementArray.psw.elementType}
                    config={elementArray.psw.elementConfig}
                    value={elementArray.psw.value}
                    changed={(event) => this.inputChangePassword(event, elementArray.id)}
                    touched = {elementArray.psw.touched}
                    shouldValidate = {elementArray.psw.validation}
                    valid = {elementArray.psw.valid}
                    click = {this.doNothing}
               />
           ))}
          <button className={classes.ButtonSend} onClick={this.passswordChangeHandler} disabled={!passwordIsValid} ><IoIosSend style={{ verticalAlign: 'middle', marginRight: '4px' }} />Modifica la password</button>
            <br/>
        </div>
        )*/


    modificaEmail = (
        <React.Fragment>
            <IonItem lines="none">
                <IonText><b>MODIFICA EMAIL</b></IonText>
            </IonItem>
            <IonItem className={!emailIsValid && email.touched ? 'Invalid' : ''}>
                <IonInput 
                value={email.value}
                onIonChange={(event)=>inputChangeEmail(event)}
                ></IonInput>
            </IonItem>
            <IonItem lines="none" >   
                <IonButton 
                    onClick={handlerChangeEmail} 
                    disabled={!emailIsValid}
                    color="dark"
                    class="btn-change-email"
                    fill="outline"
                    >
                        <IonIcon icon={paperPlane} slot="start"></IonIcon>
                        <IonLabel>Modifica l'e-mail</IonLabel>
                </IonButton>
            </IonItem>
           
        </React.Fragment>
    )
  

    {presentazione === false && presentazioneInput === false? 
        presentazioneVisualizzata = <IonButton onClick={() => handlerClickPresentazioneInput()} fill="clear"><IonLabel class="ion-text-lowercase label-breve-presentazione" color="primary">Aggiungi una breve presentazione</IonLabel></IonButton>
        :presentazioneInput === true && ((presentazioneVisualizzata=<IonItem><IonInput type="text" placeholder="breve presentazione di te" onIonChange={descrizioneChangeHandler} value={descrizione}></IonInput></IonItem>) &&
        (btnInviaInfo = <IonButton class="ion-float-right" onClick={orderHandler} fill="outline" color="dark" disabled={!formIsValid}><IonIcon icon={paperPlane} slot="start"></IonIcon><IonLabel>Invia breve presentazione</IonLabel></IonButton>))
    }

    console.log(profileForm);

    const formElemetsArray = [];
        for (let key in profileForm) {
            formElemetsArray.push({
                id: key,
                config: profileForm[key],

            })
        }
    let form = (
        formElemetsArray.map(formElement=>{
            console.log(formElement);
            return formElement.id !== 'sesso' && formElement.id !== 'nazionalita' && formElement.id !== 'username' ?(<React.Fragment key={formElement.id}><IonItem class="ion-margin-top" className={!formElement.config.valid && formElement.config.touched ? 'Invalid' : ''}>
                 <IonInput 
                type={formElement.config.elementConfig.type} 
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.value} 
                onIonChange={(event) => inputChangedHandler(event, formElement.id)}
                
               /* className={!emailValid  ? 'Invalid' : ''}*/
                /></IonItem>
                 {!formElement.config.valid && formElement.config.touched && formElement.id === 'numeroTelefono' && (
                    <IonItem lines="none"><IonLabel>Il campo deve contenere 10 numeri</IonLabel></IonItem>)}
                </React.Fragment>
                
                ):formElement.id === 'sesso' ? <IonItem key={formElement.id} class="ion-margin-top"><IonRadioGroup  value={formElement.config.value} onIonChange={(event) => inputChangedHandler(event, formElement.id)}>
                    <IonLabel>Sesso:</IonLabel>
                    <IonItem lines="none">
                        <IonLabel>F</IonLabel>
                        <IonRadio slot="start" value={formElement.config.elementConfig.options[0].value} />
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>M</IonLabel>
                        <IonRadio slot="start" value={formElement.config.elementConfig.options[1].value} />
                    </IonItem>
                </IonRadioGroup></IonItem> : formElement.id === 'nazionalita' ? <IonItem key={formElement.id} class="ion-margin-top">
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
                    </IonItem> : <React.Fragment  key={formElement.id}><IonItem lines="none" class="ion-margin-top">
                        <IonText><b>MODIFICA IL TUO USERNAME</b></IonText>
                    </IonItem><IonItem className={!formElement.config.valid && formElement.config.touched ? 'Invalid' : ''}>
                 <IonInput 
                type={formElement.config.elementConfig.type} 
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.value} 
                onIonChange={(event) => inputChangedHandler(event, formElement.id)}
        /></IonItem>
        {!formElement.config.valid && formElement.config.touched && (
            <IonItem lines="none"><IonLabel>L'username può contenere:</IonLabel></IonItem>)}
        {!formElement.config.valid && formElement.config.touched && (
            <IonItem lines="none"><IonLabel>lettere, numeri, underscore (_)</IonLabel></IonItem>)}
        {!formElement.config.valid && formElement.config.touched && (
            <IonItem lines="none"><IonLabel>deve essere fra i 4 e i 15 caratteri</IonLabel></IonItem>)}
        </React.Fragment>
                    
        })
    );

    
    let pageModificaDati = (
        <IonCard>
            <IonCardContent>
                { modificaEmail}
                {modificaPassword}
                <IonItem lines="none">
                    <IonText><b>MODIFICA I TUOI DATI</b></IonText>
                </IonItem>
                {form}
                <IonItem lines="none">
                    <IonText><b>MODIFICA LA TUA FOTO PROFILO</b></IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonButton onClick={() => document.getElementById("inputFile")!.click()} color="dark" fill="outline"><IonIcon icon={camera} slot="start"></IonIcon><IonLabel>Carica foto profilo</IonLabel></IonButton>
                    <input id="inputFile" type="file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={(event:any) => convertFile(event.target.files[0])} style={{ width: '0px' }}/>
                    {anteprimaImg ? anteprimaImg : null}
                </IonItem>
                 <IonItem lines="none" class="ion-float-right">
                    <IonButton onClick={orderHandler} disabled={!formIsValid} color="dark" fill="outline"><IonIcon icon={paperPlane} slot="start"></IonIcon><IonLabel>Invia dati</IonLabel></IonButton>
                 </IonItem>
            </IonCardContent>
        </IonCard>
    );


    let modal = null;
    if (loading === false ||  loadingLogin === false) {
        modal = (<Modal show={show} modalClosed={/*this.hideModal*/ ()=>{}}>
             <IonLabel color="dark">{esito === '' ? null : esito}</IonLabel>
             <IonLabel color="dark">{esitoLogin === '' ? null : esitoLogin}</IonLabel>
            <IonLabel color="dark">{errorMessage === '' ? null : errorMessage}</IonLabel>
        </Modal>);
    }

    

    return(
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle>Blank</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            {modalPassword ? messageModalPassord : null}
            {!loading ? modal : null}
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
        onChangeEmail : (email:string) => dispatch(actions.updateEmail(email)),
        onChangePassword:(password:string) => dispatch(actions.updatePassword(password))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Profilo);