import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonThumbnail,
  IonImg,
  IonIcon,
  IonButton,
  IonInput,
  IonText,
  IonTextarea,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonLabel,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import Tag from "../../components/Tag/Tag";
import { closeOutline, camera } from "ionicons/icons";
import checkValidity from "../../utility/validation";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import moment from 'moment';
import history from '../../utility/history';
import "./Modifica.css";

const Modifica: React.FC<{
  loading: boolean,
  esito: string,
  onUpdateArticolo:(articolo:any, idArticolo:string)=>void,
  mount:()=>void,
  errore:string
}> = (props) => {
  const { esito, onUpdateArticolo, mount,errore } = props;

  const [form, setForm] = useState<any>({
    titolo: {
      type: "text",
      value: "",
      validation: {
        required: true,
      },
      touched: false,
      valid: false,
      config: {
        placeholder: "Titolo *",
        autoFocus: true,
      },
    },
    sottotitolo: {
      type: "text",
      value: "",
      touched: false,
      valid: true,
      config: {
        placeholder: "Sottotitolo",
      },
    },
    testo: {
      type: "textarea",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      config: {
        placeholder: "Scrivi qualcosa...  *",
      },
    },
    categoria: {
      type: "text",
      value: "",
      touched: false,
      valid: false,
      validation: {
        required: true,
      },
      config: {
        placeholder: "Categoria *",
      },
    },
    descrizione: {
      type: "text",
      value: "",
      touched: false,
      valid: true,
      config: {
        placeholder: "Breve descrizione dell'articolo",
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<any[]>([]);
  const [tagsList, setTagsList] = useState<any>([]);
  const [img, setImg] = useState<any>();
  const [anteprimaImg, setAnteprimaImg] = useState<any>();
  const [isFormValid, setIsFormValid] = useState<any>();
  const [show, setShow] = useState<any>();
  const [messaggi, setMessaggi] = useState<any>();

  let location = useLocation().pathname.substr(10);

  useEffect(() => {
    const id = location;
    const token = localStorage.getItem("token");
    setLoading(true);
    let config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    axios
      .get("http://localhost:4001/articolo/" + id, config)
      .then((response) => {
        /*  if (typeof response.data.tags === 'undefined'){
                      response.data.tags = [];
                  }*/
        let form = {
          titolo: {
            type: "text",
            value: "" + response.data[0].titolo + "",
            validation: {
              required: true,
            },
            touched: false,
            valid: false,
            config: {
              placeholder: "Titolo *",
              autoFocus: true,
            },
          },
          sottotitolo: {
            type: "text",
            value: "" + response.data[0].sottotitolo + "",
            touched: false,
            valid: true,
            config: {
              placeholder: "Sottotitolo",
            },
          },
          testo: {
            type: "textarea",
            value: "" + response.data[0].testo + "",
            touched: false,
            valid: false,
            validation: {
              required: true,
            },
            config: {
              placeholder: "Scrivi qualcosa...  *",
            },
          },
          categoria: {
            type: "text",
            value: "" + response.data[0].categoria + "",
            touched: false,
            valid: false,
            validation: {
              required: true,
            },
            config: {
              placeholder: "Categoria *",
            },
          },
          descrizione: {
            type: "text",
            value: "" + response.data[0].descrizione + "",
            touched: false,
            valid: true,
            config: {
              placeholder: "Breve descrizione dell'articolo",
            },
          },
        };
        
        setForm(form);
        setTags(response.data[0].tags === undefined ? [] : response.data[0].tags);
        console.log(response.data[0].tags);


        const updateTags = [...response.data[0].tags]
        let tagsList:any = [];
        updateTags.map((tag) => {
          console.log("entrato");
            return tagsList.push(<Tag key={tag} autoWidth={false} click={() => deleteTagHandler(tag)}>{tag} </Tag>);
        })
        setTagsList(tagsList)
        setAnteprimaImg(
          response.data[0].img === null ? null : (
            <IonItem lines="none" class="margin-auto">
              <IonThumbnail>
                <IonImg src={response.data[0].img} alt=""></IonImg>
              </IonThumbnail>
              <IonButton
                class="btn-close-img"
                color="dark"
                fill="clear"
                onClick={() => clickCloseImg()}
              >
                <IonIcon icon={closeOutline} slot="start"></IonIcon>
              </IonButton>
            </IonItem>
          )
        );
        setImg(response.data[0].img === null ? null : response.data[0].img);
        setLoading(false);
        setMessaggi(
          response.data[0].messaggi === undefined
            ? []
            : response.data[0].messaggi
        );
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const countWordsHandler = (testo: string) => {
    let minuti = 0;
    let parole = testo.trim().split(" ").length;
    for (let i = 0; i < parole; i++) {
      if (i % 100 === 0 && i > 1) minuti++;
    }
    return minuti;
  };
  const addTagHandler = (tag: any) => {
    let tagsListVar = [...tagsList];
    let tagsVar = tags;
    if (tagsVar.indexOf(tag) < 0 && tagsVar.length < 15 && tag.length > 0) {
      tagsListVar.push(
            <Tag key={tag} autoWidth={false} click={() => deleteTagHandler(tag)}>
                {tag}
            </Tag>
      );
      tagsVar = tagsVar.concat(tag);
      setTagsList(tagsListVar);
      
      setTags(tagsVar);
    }
  };

  const deleteTagHandler = (tag: any) => {
    let tagsListVar: any = [...tagsList];
    let tagsVar = tags;
    tagsVar = tags.filter((t: any) => t !== tag);
    tagsListVar = tagsList.filter((t: any) => t.key !== tag);
    setTagsList(tagsListVar);
    setTags(tagsVar);
  };

  const clickCloseImg = () => {
    setAnteprimaImg(null);
    let inputFile:any = document.getElementById("inputFile");
    inputFile.value = null;          
  };

  const convertFile = (e: any) => {
    let reader = new FileReader();
    if (e !== undefined) {
      reader.readAsDataURL(e);
      reader.onloadend = () => {
        let readerRes: string = reader.result as string;
        setImg(reader.result);
        setAnteprimaImg(
          <IonItem lines="none" class="margin-auto">
            <IonThumbnail >
              <IonImg src={readerRes} class="margin-auto"></IonImg>
            </IonThumbnail>
            <IonButton
              class="btn-close-img"
              color="dark"
              fill="clear"
              onClick={() => clickCloseImg()}
            >
              <IonIcon icon={closeOutline} slot="start"></IonIcon>
            </IonButton>
          </IonItem>
        );
      };
    }
  };

  const checkValidityOfInput = (event: any, id: string) => {
    let newObj = {
      ...form[id],
      value: event.target.value,
      valid: checkValidity(event.target.value, form[id].validation),
      touched: true,
    };
    let newForm = { ...form, [id]: { ...newObj } };
    let formIsValid = true;
    for (let key in newForm) {
      formIsValid = newForm[key].valid && formIsValid;
    }
    setIsFormValid(formIsValid);
    setForm(newForm);
  };

const modifyArticleHandler = async () => {
    const id = location;
   
    const articolo = {
        _id:location,
        autore: localStorage.getItem("username"),
        categoria: form.categoria.value.trim(),
        data: moment(new Date()),
        descrizione: form.descrizione.value.trim(),
        img: img,
        like: false,
        messaggi: messaggi,
        minuti: countWordsHandler(form.testo.value),
        sottotitolo: form.sottotitolo.value.trim(),
        tags: [...tags],
        testo: form.testo.value,
        titolo: form.titolo.value.trim(),
        userId: localStorage.getItem("userId")
    }
    console.log(articolo);
    onUpdateArticolo(articolo, id);
   
    setShow(true);
    /*setTimeout(()=>{
        mount();
        history.push("/");
        window.location.reload();
    },2500);*/
}

    console.log(tags)

  const formData = [];
  for (let key in form) {
    formData.push({ id: key, obj: form[key] });
  }

  console.log(tags.length);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
            <IonCardHeader>
            <IonToolbar>
                <IonTitle class="ion-text-center" color="dark">
                    <b>Modifica Articolo</b>
                </IonTitle>
            </IonToolbar>
            </IonCardHeader>
            <IonCardContent>
            {formData.map((el) => {
                return (
                el.id !== 'testo' ? <IonItem
                    className={!el.obj.valid && el.obj.touched ? "Invalid" : ""}
                    key={el.id}>
                    <IonInput
                        value={el.obj.value}
                        placeholder={el.obj.config.placeholder}
                        type={el.obj.type}
                        onIonChange={(e) => checkValidityOfInput(e, el.id)}
                        onKeyPress={(event:any) => { if (event.key === 'Enter') { addTagHandler(event.target.value);setTagInput("")}}}
                    ></IonInput>
                    </IonItem> : <IonItem  lines="none" class="item-text-area" key={el.id} >
                            <IonTextarea class="text-area"
                                placeholder={el.obj.config.placeholder} 
                                autoGrow={true}
                                value={el.obj.value} 
                                onIonChange={(e) => checkValidityOfInput(e, el.id)}></IonTextarea>
                        </IonItem>
                );
            })}
             <IonItem>
          <IonInput
            placeholder="#tag"
            value={tagInput}
            onIonChange={(event: any) => setTagInput(event.target!.value)}
            onKeyPress={(event:any) => { if (event.key === 'Enter') { addTagHandler(event.target.value);setTagInput("")} }}></IonInput>
            </IonItem>
            
              
            
            <div className="DivTagsList">
            {tagsList}
            </div>
            {tags.length === 15 ? <IonItem lines="none">
                    <IonText>Hai raggiunto il numero massimo di tag consentiti.</IonText>
            </IonItem> : null}
            <IonItem lines="none" className={'CaricaFoto'}>
                <IonButton onClick={() => document.getElementById("inputFile")!.click()} color="dark" fill="outline" class="margin-auto"><IonIcon icon={camera} slot="start"></IonIcon><IonLabel>Carica foto profilo</IonLabel></IonButton>
                <input id="inputFile" type="file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={(event:any) => convertFile(event.target.files[0])} style={{ width: '0px' }}/> 
            </IonItem>          
           <IonItem >
                {anteprimaImg ? anteprimaImg : null}
            </IonItem>   
             <IonItem lines="none" class="ion-margin-bottom">
                <IonButton fill="outline" color="dark" onClick={modifyArticleHandler} size="default" class="margin-auto ion-margin-top">Modifica</IonButton>
          </IonItem>    
            </IonCardContent>
        </IonCard>  
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state:any) => {
    return {
        loading: state.articolo.loading,
        esito: state.articolo.esitoCaricamento,
        errore:state.articolo.error
    };
};
const mapDispatchToProps = (dispatch:any) => {
    return {
        onUpdateArticolo: (articolo:any, id:string) => dispatch(actions.updateArticolo(articolo, id))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Modifica);
