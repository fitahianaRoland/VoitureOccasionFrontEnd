// Deconnexion.js
import React from 'react';
import { Link } from 'react-router-dom';

const Deconnexion = () => {
  const handleLogout = () => {
    // Effacer les informations de session
    sessionStorage.removeItem('id');

    // Rediriger vers la page de connexion ou une autre page
    window.location.href = '/'; // Remplacez avec l'URL de votre choix
  };

  return (
    <Link to="#" onClick={handleLogout} id='children'>
      DECONNEXION
    </Link>
  );
};

export default Deconnexion;
