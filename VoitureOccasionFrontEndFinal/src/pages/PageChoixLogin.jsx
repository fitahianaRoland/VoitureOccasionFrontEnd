import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/choixlogin.css"; // Assurez-vous d'avoir le bon chemin d'accès vers votre fichier CSS

function ChoixLogin() {
  return (
    <div className="container">
      <Link to={`/login/user`} className="link user">Utilisateur</Link>
      <Link to={`/login/admin`} className="link admin">Admin</Link>
    </div>
  );
}

export default ChoixLogin;
