import React, { useState, useEffect } from 'react';
import '../assets/css/pagination.css';
import Pagination from './Pagination';
import '../assets/css/list.css';
import getUrl from '../url/Url';

function ListeEnergie() {
  const [energie, setEnergie] = useState([]);
  const [newNom, setNewNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getUrl()}/api/admin/selectAllEnergie`;
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('id')}`
          }
        });
  
        const EnergieData = await response.json();
        console.log(EnergieData); // Ajoutez cette ligne pour vérifier les données reçues
        setEnergie(EnergieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const updateEnergie = async (idEnergie) => {
    try {
      const url = `${getUrl()}/api/admin/updateEnergie?id=${idEnergie}&nom=${newNom}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('id')}`
        }
      });

      if (response.ok) {
        console.log(newNom + "  et " + idEnergie);
        console.log('Update effectué avec succès.');
        window.location.reload();
      } else {
        const responseData = await response.text();
        console.error('Erreur lors de la mise à jour de la catégorie:', responseData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewNom(e.target.value);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = energie.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = energie.length;

  // Calcul du nombre total de pages
  const totalPageCount = Math.ceil(totalPosts / postPerPage);

  // Vérification si le nombre total de pages est inférieur à la page actuelle
  if (currentPage > totalPageCount && totalPageCount > 0) {
    setCurrentPage(totalPageCount);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='listadmincontainer'>
      <div className="list">
        <h2>Tableau des Energies de voiture</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((Energie, index) => (
              <tr key={index}>
                <td>{index +1 }</td>
                <td>{Energie.nomEnergie}</td>
                <td>
                  <input
                    type='text'
                    name='nom'
                    placeholder='Nouvelle valeur ...'
                    onChange={handleInputChange}
                  />
                  <button onClick={() => updateEnergie(Energie.idEnergie)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination postPerPage={postPerPage} totalPost={totalPosts} paginate={paginate} />
      </div>
    </div>
  );
}

export default ListeEnergie;
