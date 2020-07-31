import React from 'react';
import { IonItem } from '@ionic/react';



const ActionBar: React.FC<{
    id:string,
    showdropdown:boolean,
    viewComments:()=>void,
    modalDelete:()=>void,
    clickMenu:()=>void,
    disableMore:boolean,
    color:string,
    onClick:()=>void,
    ricerca:boolean
}> = (props) => {
    const { disableMore/*, color*/, showdropdown, id, ricerca,viewComments,modalDelete, clickMenu,color, onClick } = props;

  return (
    <IonItem></IonItem>
  );
};

export default ActionBar;
