import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCard } from '@ionic/react';
import React, { useRef } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import ScrollUpButton from '../../components/ScrollUpButton/ScrollUpButton';

const Home: React.FC = () => {

  const contentRef = useRef(null);
    
    const scrollTop = ()=>{
      if(contentRef){
        contentRef.current?.scrollToTop();
      }
      
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} ref={contentRef}>
        <IonToolbar>
            <IonTitle class="ion-text-center">Blog</IonTitle>
        </IonToolbar> 
        <div className="Prova">
        
        </div>   
        <div className="ScrollUpButton">
          <ScrollUpButton clicked={scrollTop}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
