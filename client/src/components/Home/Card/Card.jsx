import React from 'react'
import './Card.css'

function Card({name, image, temperament, weight}) {
  return (
    <div className='Card-contenedor'>
      <div className="Titulo-Container">
      <h3 className='Titulo-Card'>{name}</h3>
      </div>
      <img className='Imagen' src={image} alt='img not found' width='200px' height='250px' />
      <div className='Info-Contenedor'>
      <h5 className='Peso'>Peso: {weight} kg.</h5>
      <h5 className='Temperamento'>Temperamento: {temperament}</h5>
      </div>
      
    </div>
  );
}

export default Card