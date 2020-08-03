import React, { useState } from 'react';
import Username from '../../Username/Username';
import { IonItem, IonInput, IonButton } from '@ionic/react';
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
  return (
    <>
        {/*<Username show ={showUsername} modalClosed ={showUsernameModal}/>*/}
        <IonItem>
            <IonInput type="text" value={messaggio} placeholder="Scrivi un commento..." onIonChange={changeMessage} onClick={(localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')}: ()=>showUsernameModal())}></IonInput>
        </IonItem> 
        <IonButton onClick={  (localStorage.getItem("username")? ()=>{props.clickSendMessage(messaggio);setMessaggio('')} : ()=>showUsernameModal())}>INVIA</IonButton>
    </>
  );
};

export default Messaggio;