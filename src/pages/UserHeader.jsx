// HeaderUser.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Deconnexion from './Deconnexion'; // Importez le composant Deconnexion
import '../assets/css/header.css';
import '../assets/font-awesome-4.7.0/css/font-awesome.css';
import logo from '../assets/img/LOGO-DICE-AUTO-1.png';
import { menuburger,linksEvent } from '../assets/js/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const HeaderUser = () => {
  const [mots, setMots] = useState('');

  const handleSearch = () => {
    const searchUrl = `/user/rechercheSimple?mots=${mots}`;
    // Rediriger vers la page de recherche
    window.location.href = searchUrl;
  };

  return (
    <>
      <div id='containerHeader'>
        <div className='logoContainer'>
          <Link to={`/user`}>
            <img className='logo' src={logo} alt='x'></img>
          </Link>
        </div>
        <div></div>
        <div id='linkContainer'>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input type='text' value={mots} onChange={(e) => setMots(e.target.value)} />
            <button type='submit'><FontAwesomeIcon icon={faSearch} /></button>
          </form>
          <Link to={`/user`} id='children' onClick={linksEvent}>
            HOME
          </Link>
          <Link to={`/user/recherche`} id='children' onClick={linksEvent}>
            RECHERCHE
          </Link>
          <Link to={`/user/favoris`} id='children' onClick={linksEvent}>
            FAVORI
          </Link>
          {/* Utilisez le composant Deconnexion ici */}
          <Deconnexion />
        </div>
        <div id='icons' onClick={menuburger}>
        <FontAwesomeIcon icon={faBars} />        
        </div>
      </div>
    </>
  );
};

export default HeaderUser;
