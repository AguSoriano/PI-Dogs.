import React from 'react'
import style from './Card.module.css'

function Card({name, image, temperament, weight}) {
  return (
    <div className={`${style.Card_contenedor}`}>
      <div className={`${style.Titulo_Container}`}>
      <h3 className={`${style.Titulo_card}`}>{name}</h3>
      </div>
      <img className={`${style.Imagen}`} src={image} alt='img not found' width='200px' height='250px' />
      <div className={`${style.Info_Contenedor}`}>
        <p>
      <h5>Peso: {weight} kg.</h5>
      <h5>Temperamento: {temperament}</h5>
      </p>
      </div>
      
    </div>
  );
}

export default Card