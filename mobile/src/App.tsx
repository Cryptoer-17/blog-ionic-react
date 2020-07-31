import React, { useEffect, Props } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import MainPage from './pages/MainPage/MainPage';
import Navigation from './pages/Navigation/Navigation';
import Profilo from './pages/Profilo/Profilo';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC<{
  onInitArticoli:()=>void
}> = (props) => {

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
      props.onInitArticoli();
     /* props.onGetProfilo();*/
    }
  },[]);


return(
  <IonApp>
    <Navigation />
    <IonReactRouter>
      <IonRouterOutlet>
      {localStorage.getItem("userId") ? <Route path="/home" component={Home} exact={true} /> : <Route path="/home" component={MainPage} exact={true} />}
      {localStorage.getItem("userId") ? <Route path="/profilo" exact render={()=>(<Profilo></Profilo>)}/> :null}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>)
};

/*
{localStorage.getItem("userId") ?    <Route path={"/profilo" + (key ? "/:key" : "")} exact  render={() =>(<AsyncProfilo  profilo={tempArray} clickUpdateArticolo={this.updateArticoloHandler} key={key} mount={() => this.componentDidMount()}/>)} /> : null }
*/

const mapStateToProps = (state:any) =>{
  return{
      loading: state.articolo.loading,
      error : state.articolo.error,
    /*  profilo: state.profilo.profilo,*/
  };
};

const mapDispatchToProps = (dispatch:any) =>{
  return{
     onInitArticoli: () => dispatch(actions.initArticoli()),
    /* onGetProfilo:() => dispatch(actions.getProfilo()),*/
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
