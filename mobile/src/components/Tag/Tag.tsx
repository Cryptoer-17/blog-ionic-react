import React from 'react';
import './Tag.css';
import { IonCardSubtitle, IonButton, IonIcon, IonText } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { closeOutline } from 'ionicons/icons';


const Tag: React.FC<{
  click:()=>void,
  autoWidth:boolean
}> = (props) => {
  let location = useLocation().pathname.slice(0,9);
  const {autoWidth} = props;  
  console.log(location);
  return (
    <div className ={autoWidth? 'Tag' : 'TagSize'}>
      {location === "/pubblica" || location === "/modifica" ? <IonButton size="small" color="dark" fill="clear" onClick = {props.click} ><IonIcon icon={closeOutline} slot="start"></IonIcon></IonButton> :null}
      <IonCardSubtitle color="dark" class="margin-top" ><IonText>{props.children}</IonText></IonCardSubtitle>
    </div>
  );
};

export default Tag;

