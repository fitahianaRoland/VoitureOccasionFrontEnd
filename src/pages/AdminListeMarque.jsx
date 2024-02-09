import React, { useState, useEffect } from 'react';
import '../assets/css/pagination.css';
import Pagination from './Pagination';
import getUrl from '../url/Url';

function ListeMarque() {
  const [marque, setMarque] = useState([]);
  const [newNom, setNewNom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getUrl()}/api/admin/selectAllMarque`;
        const response = await fetch(url, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('id')}`
          }
        });

        const marqueData = await response.json();
        setMarque(marqueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateMarque = async (idMarque) => {
    try {
      const url = `${getUrl()}/api/admin/updateMarque?id=${idMarque}&nom=${newNom}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('id')}`
        }
      });

      if (response.ok) {
        console.log(newNom + "  et " + idMarque);
        console.log('Update effectué avec succès.');
        window.location.reload();
      } else {
        const responseData = await response.text();
        console.error('Erreur lors de la mise à jour de la marque:', responseData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la marque:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewNom(e.target.value);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = marque.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='listadmincontainer'>
      <div className="list">
        <h2>Tableau des Marques de voiture</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((Marque, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{Marque.nomMarque}</td>
                <td>
                  <input
                    type='text'
                    name='nom'
                    placeholder='Nouvelle valeur ...'
                    onChange={handleInputChange}
                  />
                  <button onClick={() => updateMarque(Marque.idMarque)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination postPerPage={postPerPage} totalPost={marque.length} paginate={paginate} />
      </div>
    </div>
  );
}

export default ListeMarque;
