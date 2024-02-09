import '../assets/css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faSnapchat, faTiktok } from '@fortawesome/free-brands-svg-icons';

const socialMediaLinks = [
  { icon: faInstagram, url: 'https://www.instagram.com/fenosoa_randrii/' },
  { icon: faFacebook, url: 'https://www.facebook.com/fenosoa.588' },
  { icon: faTiktok, url: 'https://www.tiktok.com/@fenosoarandria' },
  { icon: faSnapchat, url: 'https://www.snapchat.com' }
];

const contactDetails = [
  { label: '+261 34 88 351 08', type: 'phone' },
  { label: 'fenosoarandria1@gmail.com', type: 'email' }
];

function Footer() {
  return (
    <div id="footerContainer">
      <div id="about">
        <b>Developpeur</b>
        <p>RANDRIAMAMITINA FENOSOA</p>
        <p>RANAIVOARIMANANA FITAHIANA ROLLAND</p>
        <p>RAVELONARIVO NY AINA HERITOKY</p>
        <p>ANDRINIRINA DANNY PERRY</p>
      </div>
      <div id="middle">
        <b>Suivez nous</b>
        <div id='svgContainer'>
          {socialMediaLinks.map((link, index) => (
            <a key={index} href={link.url}>
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
      <div id="contact">
        <b>Contact</b>
        {contactDetails.map((detail, index) => (
          <p key={index}>{detail.label}</p>
        ))}
      </div>
    </div>
  );
}

export default Footer;
