import React, { useState, useEffect } from 'react';
import '../assets/css/pagination.css';
import Pagination from './Pagination';
import getUrl from '../url/Url';

function ListeCategorie() {
  const [categorie, setCategorie] = useState([]);
  const [newNom, setNewNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUrl()}/api/admin/selectAllCategorie`, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('id')}`
          }
        });


        const categorieData = await response.json();
        setCategorie(categorieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateCategorie = async (idVoiture) => {
    try {
      const url = `${getUrl()}/api/admin/updateCategorie?id=${idVoiture}&nom=${newNom}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('id')}`
        }
      });
  
      if (response.ok) {
        console.log(newNom + "  et " + idVoiture);
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
  const currentPosts = categorie.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='listadmincontainer'>
      <div className="list">
        <h2>Tableau des catégories de voiture</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((categorie, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{categorie.nomCategorie}</td>
                <td>
                  <input
                    type='text'
                    name='nom'
                    placeholder='Nouvelle valeur ...'
                    onChange={handleInputChange}
                  />
                  <button onClick={() => updateCategorie(categorie.idCategorie)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination postPerPage={postPerPage} totalPost={categorie.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default ListeCategorie;
