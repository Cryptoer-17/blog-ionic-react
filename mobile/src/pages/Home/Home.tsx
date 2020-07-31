import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonCard } from '@ionic/react';
import React, { useRef } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import ScrollUpButton from '../../components/ScrollUpButton/ScrollUpButton';
import {connect} from 'react-redux';

const Home: React.FC = () => {

  const contentRef = useRef(null);
    
    const scrollTop = ()=>{
      if(contentRef){
        contentRef.current?.scrollToTop(1000);
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
        <div className="ScrollUpButton">
          <ScrollUpButton clicked={scrollTop}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state:any) =>{
  
  return{
     articoli : state.articolo.articoli,
     error:state.articolo.error
  }
}

export default connect(mapStateToProps,null)(Home);
