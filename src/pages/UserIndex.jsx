import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaHeart, FaBeer, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../assets/css/car.css';
import '../assets/css/annonce.css';
import '../assets/css/carousel.css';
import '../assets/css/bigTitle.css';
import '../assets/js/SecondaireTitle';
import voitures from '../assets/img/voitureAnnonce.jpg';
import getUrl from '../url/Url';

import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../assets/js/Firebase';

function extractFileNameFromUrl(url) {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1].split('?')[0]; // Prend seulement le nom du fichier
  return fileName;
}


const CarGridIndex = () => {


  const [imageList, setImageList] = useState([]);
 
  const [mieux, setMieux] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUrl()}/api/accueil/selectAllMieuxVisite`, {
          method: 'GET',
          credentials: 'same-origin',
        });
        const mieuxData = await response.json(); // Assuming the response is in JSON format
        setMieux(mieuxData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  


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

  const [voiture, setVoiture] = useState([]);
  const idUtilisateur = sessionStorage.getItem('id');
  const [favoris, setFavoris] = useState([]);
  const [, setLoading] = useState(true);
  const [, setListFavoris] = useState([]);
  const [photo,setPhoto] = useState([]);

  
  // Selecter toute les voiture existant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUrl()}/api/accueil/selectAllVoiture`, {
          method: 'GET'
        });
        const voitureData = await response.json(); // Assuming the response is in JSON format
  
        setVoiture(voitureData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`, {
          method: 'GET' 
        });
        const photo = await photoData.json(); // Assuming the response is in JSON format
        
        setPhoto(photo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);


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
// Donner de carrossel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <>
      <div id='sousTitre'>
        <div id="GrandTitre">
          <div id='contenu'>
          <div id='titre'>
              <label>Vente Voiture </label>
              <label>Rolfi Exchange</label>
            </div>
            <div id='about'>
              <p>Explorez une vaste sélection de voitures d'occasion de haute qualité chez Rolfi Exchange. Des véhicules fiables, des prix compétitifs et un processus d'achat transparent pour vous offrir la meilleure expérience dans l'achat de voitures d'occasion.</p>
            </div>
          </div>
          <div id='image'><img className='img' src={voitures} alt="x" /></div>
        </div>

        <div id='titre'>
          <div>Annonces</div>
          <div id='trait'></div>
        </div>
        <div className='listannonce'>
          <div className='lien'><Link to={`/user/detailtoutvoiture`} id='children'>Voir tout</Link></div>
          <div id="ListAnnonceContainerCarousel">
            <div id="container">
            <Slider {...settings}>
                {voiture.map((voitureData, index) => (
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
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="carContainer">
          <div className='titre'><h1>Les marques populaires</h1></div>
          <Slider {...settings}>
          {mieux.map((mieux, index) => (
            <div className="card">
              <div className="card-top">
                <img key={index} id='image' src={`${process.env.PUBLIC_URL}/images/${mieux.photo}`} alt={mieux.photo} />
                <div id='caracteristique'>
                  <label>{mieux.nom_visite}</label>
                </div>
                
              </div>
            </div>
          ))}
        </Slider>
        </div>

        <div id="secondairetitle">
            <div id='image'><img className='img' src={voitures} alt="x"/></div>
            <div id='contenu'>
                <div id='titre'>
                    <label>Ventre des voitures</label>
                </div>
                <div id='about'>
                    <div className='box'>
                        <div className='icon'><FaBeer/></div><label>Une analyse objective de prix .</label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaFacebook/></div><label>Une visibilite complete sur l'historique du vehicule.</label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaInstagram/></div><label>Votre budge maitruse avec notre simulateur de financement.</label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaTwitter/></div><label>Un projection claire sur les futurs entretients de votre voiture.</label>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
export default CarGridIndex;
