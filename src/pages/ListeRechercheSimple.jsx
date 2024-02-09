import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/listAnnonce.css';
import getUrl from "../url/Url";

const ResultsSimple = () => {
  const location = useLocation();
  const searchParams = location.search ? new URLSearchParams(location.search) : null;
  
  const libelle = searchParams ? searchParams.get('mots') : null;
  
  console.log("valeur "+libelle);

  const [voiture, setVoiture] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voitureData = await fetch(
          `${getUrl()}/api/accueil/rechercheAllVoiture?${searchParams}`,{
          method: 'GET'
        });
        const car = await voitureData.json();

        if (voitureData.ok) {
          setVoiture(car);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },);
  const [photo,setPhoto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`,{ method: 'GET',credentials:'include' });
        const photo = await photoData.json();
        setPhoto(photo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);


  return (
    <>
    <div id='sousTitre'>
        <div id='titre'>
            <div>Liste des annonces</div>
            <div id='trait'></div>
        </div>
    </div>
    <div id="ListAnnonceContainer">
    <div id="container">
        {voiture && voiture.length > 0 ? (
            voiture.map((voitureData, index) => (
                <div id='element' key={index}>
                  {photo
                    .filter(item => item.id_voiture === voitureData.idVoiture)
                    .slice(0, 1) // Prendre seulement le premier élément
                    .map((photoData, photoIndex) => (
                      <img key={photoIndex} id='image' src={`${process.env.PUBLIC_URL}/images/${photoData.image_voiture}`} alt={photoData.image_voiture} />
                    ))}  
                    <div id='caracteristique'>
                    <div>
                        <label><b>{voitureData.nomMarque}</b></label></div> 
                          <div><label>{new Date(voitureData.anneeCirculation).getFullYear().toString()} | {voitureData.kilometrageCompteur}  | {voitureData.nomModele} | {voitureData.nomEnergie} | {voitureData.nomCategorie}</label></div>
                          <div><label>{voitureData.prix.toLocaleString('fr-FR')}€</label></div>
                      </div>
                      <Link to={`/annoncedetail/${voitureData.idVoiture}`} >
                          <div id='divbouton'><button id='bouton'>Voir demande </button></div>
                      </Link>
                </div>
            ))
        ) : (
            <h1 id="h1">Aucune resultats</h1>
        )}
    </div>
</div>

    </>
)
};
export default ResultsSimple;
