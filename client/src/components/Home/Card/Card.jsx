import React from 'react'
import style from './Card.module.css'

function Card({name, image, temperament, weight}) {
  return (
    <div className={style.Card_contenedor}>
      <div className={style.Titulo_Container}>
      <h3>{name}</h3>
      </div>
      <img className={style.Imagen} src={image} alt='img not found' width='200px' height='250px' />
      <div className={style.Info_Contenedor}>
        <p>
      <h5>Weight: {weight} kg.</h5>
      </p>
      <h5>Temperament: {temperament}</h5>
      </div>
    </div>
  );
}

export default Card