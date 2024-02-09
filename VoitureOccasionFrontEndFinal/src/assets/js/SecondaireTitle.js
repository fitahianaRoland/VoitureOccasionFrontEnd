import '../css/secondaireTitle.css';
import voitures from '../img/voitureAnnonce.jpg';
import { FaBeer,FaFacebook,FaInstagram,FaTwitter } from "react-icons/fa";
export default function secondaireTitle() {
    return (
      <>
        <div id="secondairetitle">
            <div id='image'><img className='img' src={voitures} alt="x"/></div>
            <div id='contenu'>
                <div id='titre'>
                    <label>Vente Voiture tres mobile</label>
                </div>
                <div id='about'>
                    <div className='box'>
                        <div className='icon'><FaBeer/></div><label>une analyse objective de prix </label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaFacebook/></div><label>Une visibilite complete sur l'historique du vehicule</label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaInstagram/></div><label>Votre budge maitruse avec notre simulateur de financement</label>
                    </div>
                    <div className='box'>
                        <div className='icon'><FaTwitter/></div><label>Un projection claire sur les futurs entretients de votre voiture</label>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }