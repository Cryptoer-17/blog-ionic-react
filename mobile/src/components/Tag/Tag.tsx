import React from 'react';
import './Tag.css';
import { IonCardSubtitle } from '@ionic/react';
import { useLocation } from 'react-router-dom';

const Tag: React.FC<{
  click:()=>void
}> = (props) => {
  let location = useLocation().pathname;

  return (
    <div className ={'Tag'}>
      <IonCardSubtitle color="dark" class="margin-top" >{props.children}</IonCardSubtitle>
      {(location === "/pubblica" || location === "/modifica/:id") && <i className="material-icons" onClick = {props.click}>close</i>}
    </div>
  );
};

export default Tag;

