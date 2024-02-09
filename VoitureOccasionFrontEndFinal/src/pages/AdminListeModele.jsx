import React, { useState, useEffect } from 'react';
import '../assets/css/pagination.css';
import Pagination from './Pagination';
import getUrl from '../url/Url';

function ListeModele() {
  const [modele, setModele] = useState([]);
  const [newNom, setNewNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getUrl()}/api/admin/selectAllModele`;
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('id')}`
          }
        });

        const modeleData = await response.json();
        setModele(modeleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateModele = async (idModele) => {
    try {
      const url = `${getUrl()}/api/admin/updateModele?id=${idModele}&nom=${newNom}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('id')}`
        }
      });

      if (response.ok) {
        console.log(newNom + "  et " + idModele);
        console.log('Update effectué avec succès.');
        window.location.reload();
      } else {
        const responseData = await response.text();
        console.error('Erreur lors de la mise à jour du modèle:', responseData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du modèle:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewNom(e.target.value);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = modele.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='listadmincontainer'>
      <div className="list">
        <h2>Tableau des Modèles de voiture</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((Modele, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Modele.nomModel}</td>
                <td>
                  <input
                    type='text'
                    name='nom'
                    placeholder='Nouvelle valeur ...'
                    onChange={handleInputChange}
                  />
                  <button onClick={() => updateModele(Modele.idModele)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination postPerPage={postPerPage} totalPost={modele.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default ListeModele;
