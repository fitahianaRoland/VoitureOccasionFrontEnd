import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/css/listAnnonce.css';
import getUrl from "../url/Url";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../assets/js/Firebase";
import { FaHeart } from "react-icons/fa";


function extractFileNameFromUrl(url) {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1].split('?')[0]; // Prend seulement le nom du fichier
  return fileName;
}


const ResultsSimpleUser = () => {

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const imagelistRef = ref(storage, 'images/');
    listAll(imagelistRef)
      .then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((urls) => {
        setImageList(urls);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);



  const location = useLocation();
  const searchParams = location.search ? new URLSearchParams(location.search) : null;

  const [voiture, setVoiture] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getUrl()}/api/accueil/rechercheAllVoiture?${searchParams}`;
        const voitureData = await fetch( url,{method: 'GET'});
        console.log(voitureData)
        const voiture = await voitureData.json();
        if (voitureData.ok) {
          setVoiture(voiture);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, );


  const [photo,setPhoto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`, {method: 'GET' });
        const photo = await photoData.json();
        setPhoto(photo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);


  const idUtilisateur = sessionStorage.getItem('id');
  const [favoris, setFavoris] = useState([]);
  const [, setLoading] = useState(true);
  const [, setListFavoris] = useState([]);
// Selecter les favoris by id_user
useEffect(() => {
  const fetchDataFavoris = async () => {
    try {
      const response = await fetch(`${getUrl()}/api/utilisateur/selectAllFavoris`, {
        method: 'GET', // ou 'POST' ou toute autre méthode selon vos besoins
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
        }
      });   
      if (response.ok) {
        const favorisData = await response.json();
        setListFavoris(favorisData);
        setFavoris(favorisData.map(favori => favori.id_voiture));
      } else {
        console.error('Erreur lors de la récupération des données:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDataFavoris();
}, [idUtilisateur]);
// Inserer le favoris 
const envoyerFavori = async (idVoiture) => {
  try {
    const url = `${getUrl()}/api/utilisateur/insertFavoris?id_voiture=${idVoiture}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
      },
    });

    if (response.ok) {
      console.log('Favori enregistré avec succès.');
      setFavoris([...favoris, idVoiture]);
    } else {
      console.error('Erreur lors de l\'enregistrement du favori:', response.status);
    }
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du favori:', error);
  }
};
// Supprimer le favoris
const supprimerFavori = async (idVoiture) => {
  try {
    const url = `${getUrl()}/api/utilisateur/deleteFavoris?id_voiture=${idVoiture}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idUtilisateur}` // Utilisation d'un en-tête personnalisé, vous pouvez ajuster selon vos préférences
      },
    });

    if (response.ok) {
      console.log('Favori supprimé avec succès.');
      setFavoris(favoris.filter(id => id !== idVoiture));
    } else {
      const responseData = await response.text();
      console.error('Erreur lors de suppression du favori:', responseData);
    }
  } catch (error) {
    console.error('Erreur lors de suppression du favori:', error);
  }
};
// Condition de couleur de favoris
const handleToggleFavori = async (idVoiture) => {
  try {
    if (!idVoiture) {
      console.error('ID de voiture non défini.');
      return;
    }

    if (favoris.includes(idVoiture)) {
      await supprimerFavori(idVoiture);
      console.log('Favori supprimé avec succès:' + idVoiture);
    } else {
      await envoyerFavori(idVoiture);
      console.log('Favori enregistré avec succès.');
    }
  } catch (error) {
    console.error('Erreur lors de la gestion du favori:', error);
  }
};

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
                 <FaHeart
                    onClick={() => handleToggleFavori(voitureData.idVoiture)} 
                    color={favoris.includes(voitureData.idVoiture) ? 'red' : 'gray'}
                  />
                {photo
                  .filter((item) => item.id_voiture === voitureData.idVoiture)
                  .slice(0, 1) // Prendre seulement le premier élément
                  .map((photoData, photoIndex) => {
                    const firebaseFileName = encodeURIComponent(photoData.image_voiture); // Encoder le nom de fichier Firebase

                    const matchingImageUrl = imageList.find(
                      (url) => extractFileNameFromUrl(url) === firebaseFileName
                    );

                    return (
                      <div key={photoIndex}>
                        {matchingImageUrl && (
                          <img id='image' src={matchingImageUrl} alt={firebaseFileName} />
                        )}
                        <div id='caracteristique'>
                          <div id='caracteristique'>
                            <div><label><b>{voitureData.nomMarque}</b></label></div>
                            <div><label>{new Date(voitureData.anneeCirculation).getFullYear().toString()} | {voitureData.kilometrageCompteur}  | {voitureData.nomModele} | {voitureData.nomEnergie}</label></div>
                            <div><label>{voitureData.prix.toLocaleString('fr-FR')}€</label></div>
                          </div>
                          <Link to={`/user/annonce/${voitureData.idVoiture}`} >
                            <div id='divbouton'><button id='bouton'>Voir demande </button></div>
                          </Link>
                        </div>
                      </div>
                        );
                      })}
              </div>
            ))
          ) : (
            <h1 id="h1">Aucune résultats</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultsSimpleUser;
