import React, { useState, useEffect } from 'react';
import '../assets/css/recherchemulticritere.css'

import { useNavigate  } from 'react-router-dom';
import getUrl from '../url/Url';

const SearchFormUser = () => {
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [energies, setEnergies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transmissionVoitures, setTransmissionVoitures] = useState([]);

  const [selectedMarque, setSelectedMarque] = useState('');
  const [selectedModele, setSelectedModele] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [selectedEnergie, setSelectedEnergie] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedTransmissionVoiture, setSelectedTransmissionVoiture] = useState('');


  
  const [nombre,setCompter] = useState('');
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUrl()}/api/accueil/selectAllProposVoiture`, {method: 'GET' });
        const nombreVoiture = await fetch(`${getUrl()}/api/accueil/selectCountVoiture`, {method: 'GET' });
        const resp = await response.json();
        const nombre = await nombreVoiture.json();
        setCompter(nombre);
        
        if (response) {
          setMarques(resp.marques.map((marque) => marque));
          setModeles(resp.modeles.map((modele) => modele));
          setEnergies(resp.energies.map((energie) => energie));
          setCategories(resp.categories.map((categorie) => categorie));
          console.log(resp);
          setTransmissionVoitures(resp.transmissionVoitures.map((transmissionsVoiture) =>transmissionsVoiture));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchData = {
      marque: selectedMarque,
      modele: selectedModele,
      categorie: selectedCategorie,
      minPrice: minPrice,
      maxPrice: maxPrice,
      dateDebut: dateDebut,
      dateFin: dateFin,
      energie: selectedEnergie,
      transmissionVoiture: selectedTransmissionVoiture
    };
    navigate(`/user/results?marque=${searchData.marque}&modele=${searchData.modele}&minPrice=${searchData.minPrice}&maxPrice=${searchData.maxPrice}&energie=${searchData.energie}&categorie=${searchData.categorie}&transmission=${searchData.transmissionVoiture}&datedebut=${searchData.dateDebut}&datefin=${searchData.dateFin}`);
  };
    const [,setPhoto] = useState([]);
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
        <div id='sousTitre'>
            <div id='titre'>
                <div>RECHERCHE</div>
                <div id='trait'></div>
            </div>
        </div>
        <div id="rechercheContainer">
        <form onSubmit={handleSubmit}>
            <div id="rechercheMultiCritere">
                <div id="titre">Recherche</div>  
                <div id='dropDownCritere'>
                    <div id="box1">
                        <select value={selectedMarque} onChange={(e) => setSelectedMarque(e.target.value)}>
                        <option value="">Marque</option>
                            
                            {marques.map((marque, index) => (
                              <option key={index} value={marque.Marque}>{marque.nomMarque}</option>
                            ))}
                        </select>
                    </div>
                    <div id="box2">
                    <select value={selectedModele} onChange={(e) => setSelectedModele(e.target.value)}>
                       <option value="">Modèle</option>
                         {modeles.map((modele, index) => (
                        <option key={index} value={modele.Modele}>{modele.nomModel}</option>
                      ))}
                    </select>
                    </div>

                    <div id="box3">
                    <select value={selectedEnergie} onChange={(e) => setSelectedEnergie(e.target.value)}>
                        <option value="">Energie</option>
                        {energies.map((energie, index) => (
                          <option key={index} value={energie.Energie}>{energie.nomEnergie}</option>
                          ))}
                      </select>
                    </div>

                    <div id="box4">
                      <select value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                        <option value="">Categories</option>
                          {categories.map((categorie, index) => (
                          <option key={index} value={categorie.Categorie}>{categorie.nomCategorie}</option>
                        ))}
                      </select>
                    </div>

                    <div id="box5">
                      <select value={selectedTransmissionVoiture} onChange={(e) => setSelectedTransmissionVoiture(e.target.value)}>
                        <option value="">Type de vitesse</option>
                          {transmissionVoitures.map((transmission, index) => (
                          <option key={index} value={transmission.Transmission}>{transmission.nom_type}</option>
                        ))}
                      </select>
                    </div>
                    {/* Prix */}
                    
                    <input type="number" placeholder="Prix minimum" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
                    <input type="number" placeholder="Prix maximum" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
                    {/* Date  */}
                    <input type="number" placeholder="Date debut" min={0} value={dateDebut} onChange={(e) => setDateDebut(e.target.value)}/>
                    <input type="number" placeholder="Date fin" min={0} value={dateFin} onChange={(e) => setDateFin(e.target.value)}/>
                
                </div>
                
                <button type="submit" id="rechercher">Recherche ({nombre})</button>
            </div>
            </form>
            <div id='content'>
                <label>Titre</label>
                <label>Mais l'Intelligence Artificielle n'apportait pas le résultat tant recherché : 
                donner une conscience aux ordinateurs. Alors l'homme oublia l'Intelligence Artificielle, 
                et comme pour se prouver qu'il était bien le seul à avoir une conscience, se mit aux Arts.
                 Les belles promesses sur l'intelligence des ordinateurs et des robots étaient oubliées. 
                 Le "complexe de Frankenstein" avec. De nouveaux ordinateurs plus puissants, mais dépourvus 
                 d'intelligence, virent le jour. C'était en 2004, un an après l'ouverture au grand public
                d'Internet 3.</label>
            </div>
        </div>
      </>
    );
  }
export default SearchFormUser;
