import React from 'react'
import './Paginado.css'

export default function Paginado({dogsPerPage, allDogs, paginado}){
  const PageNumbers = []

  for(let i = 1; i<=Math.ceil(allDogs/dogsPerPage); i++){ //ceil lo que hace es redondear el resultado de la division entre todos los dogs y los que yo quiero por pagina
    PageNumbers.push(i)
  }

  return(
    <nav>
      <div className='div-paginador'>
        {PageNumbers && PageNumbers.map(number =>(
          <div className='number' key={number}>
          <button className='boton-paginador' onClick={() => paginado(number)}>{number}</button>
          </div>
        ))}
      </div>
    </nav>
  )
}

