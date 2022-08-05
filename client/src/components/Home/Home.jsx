import React from 'react'
//utilizamos hooks con el componente funcional
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, OrderByName, FilterByTemperament, getTemperaments, FilterByRaza} from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import Card from './Card/Card';
import './Home.css'

function Home() {
  const dispatch = useDispatch()//para utilizar esta constante que despache mis acciones
  const allDogs = useSelector((state) => state.dogs) //es lo mismo que hacer mapStateToProps
  const allTemperaments = useSelector(state => state.temperaments);
  const [orden, setOrden] = useState("");
  const [peso, setPeso] = useState("");
  useEffect(() => {

    dispatch(getDogs())
    dispatch(getTemperaments());
  }, [dispatch])//dentro del arreglo coloco lo que tenga dependencia con useEffect

  function handleClick(e) {
    e.preventDefault(); //para que no se recargue y rompa
    dispatch(getDogs());
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

  /*const pesoSelectedChange = (e) => {
    dispatch(OrderByWeight(e.target.value));
    setPeso(`Ordenado ${e.target.value}`)
  }*/
  const pesoSelectedChange = (e) => {
    if (e.target.value === "liviano-pesado") {
      dispatch({
        type: "ordenar-liviano-pesado",
      });
    }
    else if (e.target.value === "pesado-liviano") {
      dispatch({
        type: "ordenar-pesado-liviano",
      });
    }
    setPeso(e.target.value)
  }

  return (
    <div>
      <h1>ALL DOGS</h1>
      <button onClick={e => { handleClick(e) }}>
        Volver a cargar todos las razas
      </button>
      <div>
        <select onChange={handleOrderByName}>
          <option value={orden}>
            Orden Alfabetico
          </option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <select value={peso} onChange={pesoSelectedChange}>
          <option value="liviano-pesado">Más liviano a más pesado</option>
          <option value="pesado-liviano">Más pesado a más liviano</option>
        </select>

        <select onChange={handleFilterByTemperament}>
          <option disabled selected defaultValue>Temperaments</option>
          <option value="Todos">All</option>
          {
            allTemperaments?.map(temp => (
              <option value={temp.name} key={temp.id}>{temp.name}</option>
            ))
          }
        </select>

        <select onChange={handleFilterByRaza}>
          <option disabled selected defaultValue>Razas</option>
          <option value="Todos">All</option>
          {
            allDogs?.map(i => (
              <option value={i.name} key={i.id}>{i.name}</option>
            ))
          }
        </select>

        {allDogs?.map((c) => {
          return (
            <div>
              <Link to={'/dogs/' + c.id}>
                <Card key={c.id} name={c.name} image={c.image.url} temperament={c.temperament+','} weight={c.weight} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home