import React from 'react';
import { IonItem } from '@ionic/react';

const AnteprimaArticolo: React.FC<{
    id:string,
    autore:string,
    categoria:string,
    descrizione:string,
    img:string,
    like:boolean,
    sottotitolo:string,
    titolo:string,
    data:any,
    minuti:number,
    clickHeart:()=>void
}>= (props) => {
    let colore = 'black';
    let variabile;
    const { autore, titolo, sottotitolo,categoria, img, descrizione, clickHeart, data, minuti, id /*showDropdown*/, like/*,ricerca*/} = props;

  return (
   <IonItem></IonItem>
  );
};

export default AnteprimaArticolo;
