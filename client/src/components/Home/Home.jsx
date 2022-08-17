import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, OrderByName, FilterByTemperament, getTemperaments, FilterByRaza, filterCreated, OrderByWeight} from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import Card from './Card/Card';
import style from './Home.module.css';
import Paginado from './Paginado/Paginado';
import SearchBar from './SearchBar/SearchBar';
import Loading from '../Home/Loading/Loading';
import Footer from "../Footer/Footer";

function Home() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs)
  const allTemperaments = useSelector(state => state.temperaments);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage, setDogsPerPage] = useState(8)
  const indexOfLastDog = currentPage * dogsPerPage
  const next = Math.ceil(allDogs.length / dogsPerPage)
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1)
  }

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(e.target.value);
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
    setOrden(e.target.value);
    setCurrentPage(1)
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginado(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < next) {
      paginado(currentPage + 1)
    }
  }

  return (
    <div className={style.main_container}>
      <div className={style.titleApp}>
        <h1>DOGPEDIA</h1>
      </div>
      <button className={style.p_cargar} onClick={e => { handleClick(e) }}>
        Refresh
      </button>

      <div className={style.container_todos_select}>
        <div className={style.select_container}>
          <select onChange={handleOrderByName}>
            <option value={orden}>
              Alphabetical order
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
        <div className={style.select_container}>
          <select onChange={handleOrderByWeight}>
            <option disabled selected defaultValue>
              Order by weight
            </option>
            <option value="max_weight">Max</option>
            <option value="min_weight">Min</option>
          </select>
        </div>
        <div className={style.select_container}>
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
        <div className={style.select_container}>
          <select onChange={handleFilterByRaza}>
            <option disabled selected defaultValue>Breeds</option>
            <option value="Todos">All</option>
            {
              allDogs?.map(i => (
                <option value={i.name} key={i.id}>{i.name}</option>
              ))
            }
          </select>
        </div>
        <div className={style.select_container}>
          <select onChange={e => handleFilterCreated(e)}>
            <option value="created">Created</option>
            <option value="api">Existing</option>
          </select>
        </div>
      </div>
      <nav>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <button className={style.p_cargar} onClick={handlePrevClick}>Prev</button>
        <button className={style.p_cargar} onClick={handleNextClick}>Next</button>
      </nav>
      <SearchBar></SearchBar>

      <div className={style.dogs_container}>

        {currentDogs?.map((c) => {
          return (
            <div>
              <Link style={{ textDecoration: "none" }} to={'/dogs/' + c.id}>
                <Card key={c.id} name={c.name} image={!c.image.url ? c.image : c.image.url} temperament={!c.createdInBd ? c.temperament + ' ' : c.temperamentos.map(el => el.name + (' '))} weight={c.weight[0] + ' a ' + c.weight[1]}/>
              </Link>
            </div>
          )
        })
        }{
          currentDogs.length > 0 ?
            <div></div> : <Loading />
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Home
