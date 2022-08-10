import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameDogs } from '../../../redux/actions/index.jsx';
import "./SearchBar.css"



function SearchBar() {

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameDogs(name)) //name es el payload que escribe el usuario
  }

  return (
    <div>
      <input
      className= "searchbar"
      type = 'text'
      placeholder='Buscar...raza'
      onChange = {(e) => handleInputChange(e)}
      />
      <button className= "btn" type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
      </div>
  )
};

export default SearchBar;

