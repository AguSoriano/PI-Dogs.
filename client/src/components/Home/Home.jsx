import React from 'react'
//utilizamos hooks con el componente funcional
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, OrderByName, FilterByTemperament, getTemperaments, FilterByRaza, filterCreated, OrderByWeight } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import Card from './Card/Card';
import './Home.css';
import Paginado from './Paginado/Paginado';
import SearchBar from './SearchBar/SearchBar';

function Home() {
  const dispatch = useDispatch()//para utilizar esta constante que despache mis acciones
  const allDogs = useSelector((state) => state.dogs) //es lo mismo que hacer mapStateToProps
  const allTemperaments = useSelector(state => state.temperaments);//llamando a mis estados globales
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1) //Esto es un estado local, aca estoy guardando la primer pagina
  const [dogsPerPage, setDogsPerPage] = useState(8) //Aca estoy seteando cuandos dogs quiero por pagina
  const indexOfLastDog = currentPage * dogsPerPage //esto guardando la pagina actual por la cantidad de dogs //8
  const indexOfFirstDog = indexOfLastDog - dogsPerPage //0
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog) // estoy tomando sobre todos mis dogs, el indice de mi primer dog hasta el ultimo
  //slice toma un arreglo y agarra la porcion que le pase por parametro, osea desde el dogs(0) hasta el dogs(8)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments());
  }, [dispatch])//dentro del arreglo coloco lo que tenga dependencia con useEffect

  function handleClick(e) {
    e.preventDefault(); //para que no se recargue y rompa
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    e.preventDefault(); //para que no se recargue y rompa
    dispatch(filterCreated(e.target.value));
  }

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleFilterByRaza = (e) => {
    e.preventDefault();
    dispatch(FilterByRaza(e.target.value));
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <div>
      <h1>ALL DOGS</h1>
      <button className="p-cargar" onClick={e => { handleClick(e) }}>
        Volver a cargar todos
      </button>

      <div className="container-todos-select">
        <div className="select-container">
          <select onChange={handleOrderByName}>
            <option value={orden}>
              Orden Alfabetico
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className="select-container">
          <select onChange={handleOrderByWeight}>
            <option disabled selected defaultValue>
              Ordenar por peso
            </option>
            <option value="max_weight">Max</option>
            <option value="min_weight">Min</option>
          </select>
        </div>
        <div className="select-container">
          <select onChange={handleFilterByTemperament}>
            <option disabled selected defaultValue>Temperaments</option>
            <option value="Todos">All</option>
            {
              allTemperaments?.map(temp => (
                <option value={temp.name} key={temp.id}>{temp.name}</option>
              ))
            }
          </select>
        </div>
        <div className="select-container">
          <select onChange={handleFilterByRaza}>
            <option disabled selected defaultValue>Razas</option>
            <option value="Todos">All</option>
            {
              allDogs?.map(i => (
                <option value={i.name} key={i.id}>{i.name}</option>
              ))
            }
          </select>
        </div>
        <div className="select-container">
          <select onChange={e => handleFilterCreated(e)}>
            <option value="created">Creados</option>
            <option value="api">Existente</option>
          </select>
        </div>
      </div>
      <nav>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />

      </nav>
      <SearchBar></SearchBar>
      <div className="dogs-container">
        {currentDogs?.map((c) => {
          return (
            <div>
              <Link to={'/dogs/' + c.id}>
                <Card key={c.id} name={c.name} image={!c.image.url ? c.image : c.image.url} temperament={!c.createdInBd ? c.temperament + ' ' : c.temperamentos.map(el => el.name + (' '))} weight={c.weight[0] + ' a ' + c.weight[1]} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
/*temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments} */
export default Home
//weight={typeof c.weight !== 'string'?c.weight[0] + ' a ' + c.weight[1]:c.weight}