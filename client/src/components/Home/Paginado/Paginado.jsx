import React from 'react'
import style from './Paginado.module.css'

export default function Paginado({dogsPerPage, allDogs, paginado}){
  const PageNumbers = []

  for(let i = 1; i<=Math.ceil(allDogs/dogsPerPage); i++){ //ceil lo que hace es redondear el resultado de la division entre todos los dogs y los que yo quiero por pagina
    PageNumbers.push(i)
  }

  return(
    <nav>
      <div className={style.div_paginador}>
        {PageNumbers && PageNumbers.map(number =>(
          <div className={style.number} key={number}>
          <button className={style.boton_paginador} onClick={() => paginado(number)}>{number}</button>
          </div>
        ))}
      </div>
    </nav>
  )
}

