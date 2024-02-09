import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import getUrl from "../url/Url";

const Results = () => {
  const location = useLocation();
  const searchParams = location.search ? new URLSearchParams(location.search) : null;

  const marque = searchParams ? searchParams.get('marque') : null;
  const modele = searchParams ? searchParams.get('modele') : null;
  const minPrice = searchParams ? searchParams.get('minPrice') : 0.0;
  const maxPrice = searchParams ? searchParams.get('maxPrice') : 0.0;
  const energie = searchParams ? searchParams.get('energie') : null;
  const categorie = searchParams ? searchParams.get('categorie') : null;
  const transmission = searchParams ? searchParams.get('transmission') : null;
  const datedebut = searchParams ? searchParams.get('datedebut') : 0.0;
  const datefin = searchParams ? searchParams.get('datefin') : 0.0;
  
  const [voiture, setVoiture] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const voitureData = await fetch(
          `${getUrl()}/api/accueil/rechercheVoiture?Marque=${marque}&Modele=${modele}&Categorie=${categorie}&Energie=${energie}&prixMin=${minPrice}&prixMax=${maxPrice}&DateDebut=${datedebut}&DateFinn=${datefin}&Transmission=${transmission}`,{
          method: 'GET',
          cedentials:'include'
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
  }, [marque, modele, categorie, energie, minPrice, maxPrice, datedebut, datefin, transmission]);

  const [photo,setPhoto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`,{
          method: 'GET',
          credential:'include' 
        });
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
                          <div><label>{new Date(voitureData.anneeCirculation).getFullYear().toString()} | {voitureData.kilometrageCompteur}  | {voitureData.nomModele} | {voitureData.nomEnergie}</label></div>
                          <div><label>{voitureData.prix.toLocaleString('fr-FR')}€</label></div>
                      </div>
                    <Link to={`/annonce/${voitureData.idVoiture}`}>
                        <div id='divbouton'><button id='bouton'>voir</button></div>
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
export default Results;
