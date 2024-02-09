import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getUrl from '../url/Url';

const ElementsVoiture = () => {
  const idAdmin = sessionStorage.getItem("id");
  const navigate = useNavigate();
  // State for different elements
  const [element, setElement] = useState({
    marque: '',
    categorie: '',
    modele: '',
    energie: '',
  });

  // Generic function to insert an element
  const insertElement = async (elementType, elementValue) => {
    try {
      const url = `${getUrl()}/api/admin/insert${elementType}?nom=${elementValue}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idAdmin}`
        }
      });

      if (response.ok) {
        navigate(dynamicLinks[elementType]);
        console.log(`${elementType} enregistré avec succès.`);
      } else {
        console.error(`Erreur lors de l'enregistrement de ${elementType}:`, response.status);
      }
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de ${elementType}:`, error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e, elementType) => {
    e.preventDefault();
    insertElement(elementType, element[elementType]);
  };

  // Function to handle input changes
  const handleInputChange = (e, elementType) => {
    setElement({ ...element, [elementType]: e.target.value });
  };

  // Dynamic links based on the element type
  const dynamicLinks = {
    marque: '/admin/element/listemarque',
    categorie: '/admin/element/listecategorie',
    modele: '/admin/element/listemodele',
    energie: '/admin/element/listeenergie',
  };

  return (
    <>
      {/* Header Section */}
      <div id='sousTitre'>
        <div id='titre'>
          <div>Inserer des elements</div>
          <div id='trait'></div>
        </div>
      </div>

      {/* Form Section */}
      <div id="rechercheContainer">        
        {Object.keys(element).map((elementType) => (
          <form key={elementType} onSubmit={(e) => handleSubmit(e, elementType)}>
            <div id="rechercheMultiCritere">
              <Link to={dynamicLinks[elementType]} id="children">
                Liste des {elementType}s
              </Link>
              <br />
              <div id="titre">Add {elementType} voiture</div>
              <br />
              <input
                type="text"
                placeholder={`example: ${elementType}`}
                value={element[elementType]}
                onChange={(e) => handleInputChange(e, elementType)}
                required
              />
              <br />
              <button type="submit" id="rechercher">
                Ajouter
              </button>
            </div>
          </form>
        ))}
      </div>
    </>
  );
};

export default ElementsVoiture;
