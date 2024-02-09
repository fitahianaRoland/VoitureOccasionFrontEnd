import React, { useState, useEffect }  from 'react';
import '../assets/css/car.css';  // Créez un fichier CarGrid.css pour définir les styles de votre grille
import '../assets/css/annonce.css'
import '../assets/css/carousel.css'
import '../assets/css/bigTitle.css';
import '../assets/js/SecondaireTitle'
import { FaHeart } from 'react-icons/fa';
import getUrl from '../url/Url';


import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../assets/js/Firebase';

function extractFileNameFromUrl(url) {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1].split('?')[0]; // Prend seulement le nom du fichier
  return fileName;
}


// export default CarGrid;  
const DetailToutFavorisUser = () => {



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




  const [voiture, setvoiture] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const idUtilisateur = sessionStorage.getItem('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const voitureData = await fetch(`${getUrl()}/api/accueil/selectAllVoiture`,{method: 'GET' });
        const voiture = await voitureData.json();
        setvoiture(voiture);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataFavoris = async () => {
      try {
        const response = await fetch(`${getUrl()}/api/utilisateur/selectAllFavoris`, {
            method: 'GET', // ou 'POST' ou toute autre méthode selon vos besoins
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idUtilisateur}` ,
            }
          }); 
          if (response.ok) {
          const favorisData = await response.json();
          setFavoris(favorisData);
          setFavoris(favorisData.map(favori => favori.id_voiture));
        } else {
          console.error('Erreur lors de la récupération des données:', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } 
    };

    fetchDataFavoris();
  }, [idUtilisateur]);

  
  const favorisExistants = voiture.filter(voitureData => favoris.includes(voitureData.idVoiture));


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
    } 
  } catch (error) {
    console.error('Erreur lors de la gestion du favori:', error);
  }
};


const [photo,setPhoto] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      // eslint-disable-next-line no-undef
      const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`,{ method: 'GET' });
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
    <br />
    <br />
    <br />
    <br />
      <div id='sousTitre'>
        <div id='titre'>
          <div>Tout mes favoris</div>
          <div id='trait'></div>
        </div>
        <div className='listannonce'>
          <div id="ListAnnonceContainer">
            <div id="container">
            {favorisExistants.map((voitureData, index) => (
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
                          {/* <Link to={`/admin/detailannonce/${voitureData.idVoiture}`} >
                            <div id='divbouton'><button id='bouton'>Voir demande </button></div>
                          </Link> */}
                        </div>
                      </div>
                        );
                      })}
                        
                    </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailToutFavorisUser;
