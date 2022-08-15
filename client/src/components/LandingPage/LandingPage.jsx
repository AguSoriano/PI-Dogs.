import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >DOGPEDIA</h1>
        <h3>Todo sobre el mejor amigo del hombre</h3>
        <div className={`${style.left_paragraph}`}>
          <p>Aquí tu puedes encontrar informacion relevante sobre tu raza favorita y otras!</p>
        </div>
        
        <Link to="/dogs">
            <button className={`${style.button_home}`}>COMENZAR</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

