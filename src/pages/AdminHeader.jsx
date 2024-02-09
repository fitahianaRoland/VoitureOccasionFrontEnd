// HeaderAdmin.js
import React from 'react';
import { Link } from 'react-router-dom';
import Deconnexion from './Deconnexion';
import '../assets/css/header.css';
import '../assets/font-awesome-4.7.0/css/font-awesome.css';
import logo from '../assets/img/LOGO-DICE-AUTO-1.png';
// import { menuburger,linksEvent } from '../assets/js/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { linksEvent, menuburger } from '../assets/js/header';

const HeaderAdmin = () => {
  return (
    <>
      <div id='containerHeader'>
        <div className='logoContainer'>
          <Link to={`/admin`}>
            <img className='logo' src={logo} alt='x'></img>
          </Link>
        </div>
        <div></div>
        <div id='linkContainer' >
          <Link to={`/admin`} id='children' onClick={linksEvent}>
            HOME
          </Link>
          <Link to={`/admin/voirdemandeannonce`} id='children' onClick={linksEvent}>
            ANNONCE
          </Link>
          <Link to={`/admin/statistique`} id='children' onClick={linksEvent}>
            STATISTIQUE
          </Link>
          <Link to={`/admin/element`} id='children' onClick={linksEvent}>
            ELEMENT
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

export default HeaderAdmin;
