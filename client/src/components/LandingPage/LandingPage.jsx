import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={style.main_container}>
      <div className={style.main_left_container}>
        <h1 className={style.titleApp} >DOGPEDIA</h1>
        <h3>All about man's best friend</h3>
        <div className={style.left_paragraph}>
          <p>Here you can find relevant information about your favorite breed and others!</p>
        </div>
        
        <Link to="/dogs">
            <button className={style.button_home}>START</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

