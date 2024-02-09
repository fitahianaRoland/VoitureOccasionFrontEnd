import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import getUrl from '../url/Url';

const YearlyChart = () => {
  const [data, setData] = useState([]);

  const startYear = 2000;
  const endYear = new Date().getFullYear();

  // Générer les années de startYear à endYear
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => (startYear + index).toString());

  const fetchData = async () => {
    try {
      const url = `${getUrl()}/api/admin/SelectStatistiqueMarque`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("id")}`
        }
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Organiser les données par produit (marque)
    const productData = {};
    data.forEach(item => {
      if (!productData[item.marque]) {
        productData[item.marque] = { label: item.marque, data: Array(years.length).fill(0) };
      }
      const yearIndex = years.indexOf(item.annee);
      if (yearIndex !== -1) {
        productData[item.marque].data[yearIndex] += item.nombre;
      }
    });

    // Données pour le graphique
    const chartData = {
      labels: years,
      datasets: Object.values(productData)
    };

    // Obtenez le contexte du canevas
    const ctx = document.getElementById('yearlyChart').getContext('2d');

    // tout les type
    // doughnut,radar,polarArea,bar
    // Créez le graphique en ligne annuel
    const yearlyChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    

    // Nettoyez le graphique lors du démontage du composant
    return () => {
      yearlyChart.destroy();
    };
  }, [data, years]);

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <center><h1>Statistique de marque le plus utiliser chaque année</h1></center>
      <canvas id="yearlyChart"></canvas>
    </div>
  );
};

export default YearlyChart;
