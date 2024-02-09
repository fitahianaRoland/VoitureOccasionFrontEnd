import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import '../assets/css/login.css';
import getUrl from '../url/Url';

async function sendData(data, idAnnonce ,navigate) {
  try {
    const response = await fetch(`${getUrl()}/api/login/verificationLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(data.email)}&motdepasse=${encodeURIComponent(data.motdepasse)}`
    });

    if (response.ok) {
      const resultText = await response.text();
      if (resultText === '0') {
        return false;
      } else {
        const [token, value] = resultText.split(',');
        sessionStorage.setItem('id', token);
        if (value === '1') {
          console.log('idAnnonce : '+idAnnonce)
          //navigate(`/user/annonce/${idAnnonce}`);
          navigate(`/user`);

        }
        return true;
      }
    } else {
      console.error('Erreur lors de la requête. Code de statut:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return false;
  }
}

function LoginUser() {
  const [formData, setFormData] = useState({
    email: 'fitahiana@gmail.com',
    motdepasse: 'user1',
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const success = await sendData(formData, id ,navigate);

      if (!success) {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      setError('Erreur inattendue. Veuillez réessayer.');
    }
  };

  return (
    <div className='bodyLogin'>
      <div className='containerLogin'>
        <div className='entete'>
          <FaSignInAlt />
          <label>Connexion</label>
        </div>
        <div className='formulaire'>
          <form onSubmit={handleSubmit}>
            <div className='nom'>
              <input type='text' name='email' onChange={handleInputChange} value={formData.email} placeholder='Email' />
              {/* <FaUser /> */}
            </div>
            <div className='password'>
              <input type='password' name='motdepasse' onChange={handleInputChange} value={formData.motdepasse} placeholder='Mot de passe' />
              {/* <FaEye /> */}
            </div>
            <div className='valider'>
              <input type='submit' value='Valider' id='button' />
            </div>
            {error && <div className='errorMessage'>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
