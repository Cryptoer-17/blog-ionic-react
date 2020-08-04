import React, { useState } from 'react';
import Username from '../../Username/Username';
import { IonItem, IonInput, IonButton } from '@ionic/react';
import './Messaggio.css';
const Messaggio: React.FC<{
    clickSendMessage:(props:any)=>void
}> = (props) => {

    const [messaggio, setMessaggio] = useState('');
    const [showUsername,setShowUsername] = useState(false);

    const changeMessage = (event:any)=>{
        setMessaggio(event.target.value)
    }
    const showUsernameModal = () => {
        setShowUsername(!showUsername);  
    }

    const handlerKeyPressed = (event:any)=>{
        if(event.key === 'Enter'){
            if(localStorage.getItem("username")){
                if(messaggio !== ''){
                    props.clickSendMessage(messaggio);
                    setMessaggio('');
                }     
            }else{
                showUsernameModal();
            }
                
        }
    }
  return (
    <>
        {/*<Username show ={showUsername} modalClosed ={showUsernameModal}/>*/}
        <IonItem color="light">
            <IonInput type="text" color="dark" value={messaggio} placeholder="Scrivi un commento..." onIonChange={changeMessage} onKeyPress={handlerKeyPressed}/*onClick={(localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')}: ()=>showUsernameModal())}*/></IonInput>
        </IonItem> 
        <IonButton class="ion-float-right send-button" fill="outline" color="dark" onClick={  (localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')} : ()=>showUsernameModal())}>INVIA</IonButton>
    </>
  );
};

export default Messaggio;