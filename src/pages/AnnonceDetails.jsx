import React, { useState, useEffect }  from "react";
import { Link, useParams } from 'react-router-dom';
import getUrl from "../url/Url";
import { storage } from "../assets/js/Firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";


function extractFileNameFromUrl(url) {
  const segments = url.split('/');
  const fileName = segments[segments.length - 1].split('?')[0]; // Prend seulement le nom du fichier
  return fileName;
}

const AnnonceDetails = () => {
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

  const { id_voiture } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const voitureData = await fetch(`${getUrl()}/api/accueil/selectByIdVoiture?id_voiture=${id_voiture}`,{
         method: 'GET' 
         //credentials: 'include'
        });
        const car = await voitureData.json();
        setvoiture(car);
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
        const photoData = await fetch(`${getUrl()}/api/accueil/selectAllPhotoVoiture`, {
          method: 'GET' 
          //credentials: 'include'
        });
        const photo = await photoData.json(); // Assuming the response is in JSON format

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
          <div>Detail</div>
          <div id='trait'></div>
        </div>
      </div>
      {voiture.length > 0 && (
      <div id="annonceContainer">
      {photo
      .filter(item => item.id_voiture === voiture[0].idVoiture)
      .slice(0, 1)
      .map((photoData, photoIndex) => {
        const firebaseFileName = encodeURIComponent(photoData.image_voiture); // Encoder le nom de fichier Firebase
        const matchingImageUrl = imageList.find(
          (url) => extractFileNameFromUrl(url) === firebaseFileName
        );
        return (
          <div key={photoIndex} id="boxContainer">
            {matchingImageUrl && (
              <img className="img" src={matchingImageUrl} alt={firebaseFileName} />
              
            )}
            <div id='contenu'>
              <div id='marque'>
                <label>{voiture[0].nomMarque}</label>
              </div>
              <div id='about'>
                <label> </label>
                <br />
                <label> Année:<span >{new Date(voiture[0].anneeCirculation).getFullYear().toString()}</span>  </label>
                <label> Modele : <span>{voiture[0].nomModele}</span> </label>
                <label> Energie : <span>{voiture[0].nomEnergie}</span> </label>
                <label> Categorie : <span>{voiture[0].nomCategorie}</span> </label>
                <label> Prix : <span>{voiture[0].prix.toLocaleString('fr-FR')} €</span></label>
              </div>
              <div>
                <br />
                <br />
                <Link to={`/user/message`} id='bouton'>
                  Message
                </Link>               
              </div>
            </div>
          </div>
        );
      })}
  </div>
)}

      <div id="caracteristiqueContainer">
        <div id='box1'>
          <label className='caracteristiqueTitle'>Caracteristique générale</label>
          {voiture.map((caracteristique, index) => (
            <React.Fragment key={index}>
              <label></label>
              <label></label>
              <br />
              <label><span className='labelTitle'>Année de circulation:</span> {new Date(caracteristique.anneeCirculation).getFullYear().toString()}</label>
              <label><span className='labelTitle'>Provenance:</span> {caracteristique.provenance}</label>
              <label><span className='labelTitle'>Controlle technique:</span> {caracteristique.controleTechnique}</label>
              <label><span className='labelTitle'>Kilometrage compteur:</span> {caracteristique.kilometrageCompteur}</label>
              <label><span className='labelTitle'>Nombre de place:</span> {caracteristique.nombrePlace}</label>
              <label><span className='labelTitle'>Energie:</span> {caracteristique.nomEnergie}</label>
              <label><span className='labelTitle'>Longueur:</span> {caracteristique.longueur} m</label>
             
            </React.Fragment>
          ))}
        </div>
        <div id='box2'>
          <label className='caracteristiqueTitle'>Caracteristique puissance</label>
          {voiture.map((puissance, index) => (
            <React.Fragment key={index}>
              <label></label>
              <label></label>
              <br />
              <label><span className='labelTitle'>Puissance vehicule:</span> {puissance.puissanceVehicule}</label>
              <label><span className='labelTitle'>Volume de coffre:</span> {puissance.volumeDeCoffre}</label>
              <label><span className='labelTitle'>Type de vitesse:</span> {puissance.typeVitesse}</label>
              <label><span className='labelTitle'>Immatriculation:</span> {puissance.immatriculation}</label>
              <label><span className='labelTitle'>Prix:</span> {puissance.prix.toLocaleString('fr-FR')}€</label>
            </React.Fragment>
          ))}
        </div>
        <div id='box3'>
          <div id='publicite'>publicite</div>
        </div>
      </div>
    </>
  );
};
export default AnnonceDetails;
