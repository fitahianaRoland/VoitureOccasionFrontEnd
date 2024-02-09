import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import CarGrid from "./pages/Index.jsx";
import AnnonceDetails from "./pages/AnnonceDetails.jsx";
import SearchForm from "./pages/RechercheMultiCritaire.jsx";
import Results from "./pages/ListeRechercheMulticritaire.jsx";
import Header from "./pages/Header.jsx";
import HeaderUser from "./pages/UserHeader.jsx";
import Footer from "./pages/Footer.jsx";
import ResultsSimple from "./pages/ListeRechercheSimple.jsx";
import CarGridIndex from "./pages/UserIndex.jsx";
import VoirToutAnnonceUser from "./pages/UserVoirToutAnnonce.jsx";
import AnnonceDetailsUser from "./pages/UserAnnonceDetails.jsx";
import ResultsSimpleUser from "./pages/UserListeRechercheSimple.jsx";
import SearchFormUser from "./pages/UserRechercheMultiCritaire.jsx";
import ResultsUser from "./pages/UserListeRechercheMulticritaire.jsx";
import DetailToutFavorisUser from "./pages/UserVoirToutFavoris.jsx";
import HeaderAdmin from "./pages/AdminHeader.jsx";
import ElementsVoiture from "./pages/AdminElements.jsx";
import ListeCategorie from "./pages/AdminListeCategories.jsx";
import CarGridAdmin from "./pages/AdminListeDemandeAnnonce.jsx";
import AnnonceDetailsAdmin from "./pages/AdminDetailDemandeAnnonce.jsx";
import AcceptAnnonce from "./pages/AdminAccepteDemande.jsx";
import RefuseAnnonce from "./pages/AdminRefuseDemande.jsx";
import CarGridAdminIndex from "./pages/AdminIndex.jsx";
import YearlyChart from "./pages/AdminStatistique.jsx";
import ListeEnergie from "./pages/AdminListeEnergie.jsx";
import ListeMarque from "./pages/AdminListeMarque.jsx";
import ListeModele from "./pages/AdminListeModele.jsx";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import LoginUser from "./pages/LoginUser.jsx";
import ChoixLogin from "./pages/PageChoixLogin.jsx";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const [user, setUser] = useState(false);
  const [, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/user")) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/login")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [location.pathname]);

  const routes = [
    { path: '/', element: <CarGrid /> },
    { path: '/annoncedetail/:id_voiture', element: <AnnonceDetails /> },
    { path: '/recherche', element: <SearchForm /> },
    { path: '/results', element: <Results /> },
    { path: '/rechercheSimple', element: <ResultsSimple /> },
    // Login
    { path: '/login/admin', element: <LoginAdmin /> },
    //{ path: '/login/user/:id', element: <LoginUser /> },
    { path: '/login/user/', element: <LoginUser /> },
    { path: '/choix', element: <ChoixLogin /> },
    //Admin
    { path: '/admin', element: <CarGridAdminIndex /> },
    { path: '/admin/element', element: <ElementsVoiture /> },
    { path: '/admin/voirdemandeannonce', element: <CarGridAdmin /> },
    { path: '/admin/detailannonce/:id', element: <AnnonceDetailsAdmin /> },
    { path: '/admin/element/listeenergie', element: <ListeEnergie /> },
    { path: '/admin/element/listecategorie', element: <ListeCategorie /> },
    { path: '/admin/element/listemarque', element: <ListeMarque /> },
    { path: '/admin/element/listemodele', element: <ListeModele /> },
    { path: '/admin/accepteannonce/:id', element: <AcceptAnnonce /> },
    { path: '/admin/refuseannonce/:id', element: <RefuseAnnonce /> },
    { path: '/admin/statistique', element: <YearlyChart /> },
    // User
    { path: '/user/', element: <CarGridIndex/> },
    { path: '/user/recherche', element: <SearchFormUser /> },
    { path: '/user/detailtoutvoiture', element: <VoirToutAnnonceUser /> },
    { path: '/user/annonce/:id', element: <AnnonceDetailsUser /> },
    { path: '/user/rechercheSimple', element: <ResultsSimpleUser /> },
    { path: '/user/results', element: <ResultsUser /> },   
    { path: '/user/favoris', element: <DetailToutFavorisUser /> },   
  ];

  const id = sessionStorage.getItem('id');

  const redirigerIndex = (user || admin) && id === null;

  

  return (
    <div>
      {redirigerIndex && <Navigate to="/" />}
      {user  && <HeaderUser />}
      {admin  && <HeaderAdmin />}
      {!user && !admin && <Header />}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      { <Footer />}
    </div>
  );
}

export default App;
