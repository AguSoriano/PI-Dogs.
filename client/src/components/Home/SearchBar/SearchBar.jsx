import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameDogs } from '../../../redux/actions/index.jsx';
import style from "./SearchBar.module.css"



function SearchBar() {

  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

   function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameDogs(name)).then(resp =>{
      if(resp.code && resp.code ==='ERR_BAD_REQUEST'){
         alert('There is not dog with that name');
      }
    });
  }

  return (
    <div>
      <input
      className={style.searchBar}
      type = 'text'
      placeholder='Search...coincidences about name'
      onChange = {(e) => handleInputChange(e)}
      />
      <button className={style.btn} type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
      </div>
  )
};

export default SearchBar;

