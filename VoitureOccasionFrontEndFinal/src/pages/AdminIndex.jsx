import React, { useState, useEffect }  from 'react';
import '../assets/css/car.css';  // Créez un fichier CarGrid.css pour définir les styles de votre grille
import '../assets/css/annonce.css'
import '../assets/css/carousel.css'
import '../assets/css/bigTitle.css';
import '../assets/js/SecondaireTitle'

import voitures from '../assets/img/voitureAnnonce.jpg';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FaBeer,FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../assets/js/Firebase';
import getUrl from '../url/Url';
import { Link } from 'react-router-dom';



function extractFileNameFromUrl(url) {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1].split('?')[0]; // Prend seulement le nom du fichier
  return fileName;
}

// export default CarGrid;
 const CarGridAdminIndex = () => {

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

    const [photo,setPhoto] = useState([]);
    const [voiture, setVoiture] = useState([]);
  const [mieux,setMieux] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${getUrl()}/api/accueil/selectAllVoiture`, {
            method: 'GET',
            credentials: 'same-origin'
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
          const response = await fetch(`${getUrl()}/api/accueil/selectAllMieuxVisite`, {
            method: 'GET',
            credentials: 'same-origin'
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
      const fetchData = async () => {
        try {
          // eslint-disable-next-line no-undef
          const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`, {
            method: 'GET' ,
            credentials: 'same-origin'
          });
          const photo = await photoData.json(); // Assuming the response is in JSON format
          
          setPhoto(photo);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchData();
    }, []);

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
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
                    <label>Vente des voitures occasions </label>
                    <label></label>
                </div>
                <div id='about'>
                    <p>Explorez une vaste sélection de voitures d'occasion de haute qualité chez Rolfi Exchange. Des véhicules fiables, des prix compétitifs et un processus d'achat transparent pour vous offrir la meilleure expérience dans l'achat de voitures d'occasion.</p>
                </div>
                {/* <div id='recherche'>RECHERCHE</div> */}
            </div>
            <div id='image'><img className='img' src={voitures} alt="x"/></div>
        </div>
          
            <div id='titre'>
                <div>Annonces</div>
                <div id='trait'></div>
            </div>
            <div className='listannonce'>
              {/* <div className='lien'><b>voir tous</b></div> */}
                <div id="ListAnnonceContainerCarousel">
                    <div id="container">
                    <Slider {...settings}>
                {voiture.map((voitureData, index) => (
                  <div id='element' key={index}>
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
                              <Link to={`/annoncedetail/${voitureData.idVoiture}`} >
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
              
          </div>
          <div className="carContainer">
            <div className='titre'><h1>Nos marque preferé</h1></div>
              {/* <div className='lien'><b>voir tous</b></div> */}
                <Slider {...settings}>
                  {mieux.map((mieux, index) => (
                      <div className="card">
                        <div className="card-top">
                            <img key={index} id='image' src={`${process.env.PUBLIC_URL}/images/${mieux.photo}`} alt={mieux.photo} />
                        <div id='caracteristique'>
                        <label>{mieux.nom_visite}</label>
                        </div>
                        <div className="card-bottom">
                          <label>{index * 2010} $</label>
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
        </>
    )
}
export default CarGridAdminIndex;
