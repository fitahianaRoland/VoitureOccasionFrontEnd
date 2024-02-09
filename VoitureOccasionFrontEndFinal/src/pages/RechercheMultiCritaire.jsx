import React, { useState, useEffect } from 'react';
import '../assets/css/recherchemulticritere.css';
import { useNavigate } from 'react-router-dom';
import getUrl from '../url/Url';

const SearchForm = () => {
  const navigate = useNavigate();

  // State pour stocker les options de recherche
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [energies, setEnergies] = useState([]);
  const [selectedMarque, setSelectedMarque] = useState('');
  const [selectedModele, setSelectedModele] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedEnergie, setSelectedEnergie] = useState('');

  // State pour stocker le nombre de résultats
  const [nombre, setCompter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getUrl()}/api/accueil/selectAllProposVoiture`,{
          method: 'GET',
        });
        const resp = await response.json();

        const nombreVoiture = await fetch(`${getUrl()}/api/accueil/selectCountVoiture`,{
            method: 'GET'
        });
        const nombre = await nombreVoiture.json();
        setCompter(nombre);

        if (response) {
          setMarques(resp.marques.map((marque) => marque));
          setModeles(resp.modeles.map((modele) => modele));
          setEnergies(resp.energies.map((energie) => energie));
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
      minPrice: minPrice,
      maxPrice: maxPrice,
      energie: selectedEnergie,
    };

    // Utilisation de navigate pour la navigation
    navigate(`/results?marque=${searchData.marque}&modele=${searchData.modele}&minPrice=${searchData.minPrice}&maxPrice=${searchData.maxPrice}&energie=${searchData.energie}`);
  };

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
                <select value={selectedMarque} onChange={(e) => setSelectedMarque(e.target.value)} required>
                  <option value="">Marque</option>
                  {marques.map((marque, index) => (
                    <option key={index} value={marque.nomMarque}>{marque.nomMarque}</option>
                  ))}
                </select>
              </div>
              <div id="box2">
                <select value={selectedModele} onChange={(e) => setSelectedModele(e.target.value)} required>
                  <option value="">Modèle</option>
                  {modeles.map((modele, index) => (
                    <option key={index} value={modele.nomModele}>{modele.nomModel}</option>
                  ))}
                </select>
              </div>
              <div id="box3">
                <select value={selectedEnergie} onChange={(e) => setSelectedEnergie(e.target.value)} required>
                  <option value="">Energie</option>
                  {energies.map((energie, index) => (
                    <option key={index} value={energie.nomEnergie}>{energie.nomEnergie}</option>
                  ))}
                </select>
              </div>
              <input type="number" placeholder="Min" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required />
              <input type="number" placeholder="Max" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} required />
            </div>

            <button type="submit" id="rechercher">Recherche ({nombre})</button>
          </div>
        </form>

        {/* <div id='content'>
          <label>À chaque voiture d'occasion, une narration unique se dessine, façonnée par les kilomètres parcourus, les aventures vécues, et les souvenirs créés. C'est une invitation à explorer un large éventail de modèles, de marques et de styles, chacun portant la patine du temps avec élégance.</label>

          <label>Choisir une voiture d'occasion offre des avantages inégalés. C'est l'opportunité de posséder un véhicule de qualité à un coût plus abordable. La dépréciation initiale a déjà été absorbée, offrant ainsi un excellent rapport qualité-prix.</label>
        </div> */}
      </div>
    </>
  );
};

export default SearchForm;
