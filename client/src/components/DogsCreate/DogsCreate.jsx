import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDogs, getTemperaments } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';


/*
function validate(input){
  let errors = {};
  if (!input.name){
    errors.name = "Se requiere un nombre";
  }else if(!input.weight){
    errors.weight = "Se requiere un peso";
  }
  return errors;
};
*/

export default function DogsCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const temperaments = useSelector((state) => state.temperaments)
  /*const [errors,setErrors] = useState({}) */

  /*despues del onChange en el render
  {errors.name && (
    <p className='error'>{errors.name}</p>
  )}
  */

  const [input, setInput] = useState({
    name: "",
    height: [],
    weight: [],
    years_of_life: "",
    temperament: [],
    image: "",
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })

  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })
  }

  function handleSelect_Weight_Min(e) {
    input.weight[0] = e.target.value;
  }

  function handleSelect_Weight_Max(e) {
    input.weight[1] = e.target.value;
  }

  function handleSelect_Height_Min(e) {
    input.height[0] = e.target.value;
  }

  function handleSelect_Height_Max(e) {
    input.height[1] = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postDogs(input)).then((result) => {
      alert('Dogs creado :)');
      setInput({
        name: "",
        height: [],
        weight: "",
        years_of_life: "",
        temperament: [],
        image: "",
      })
      history.push('/dogs') //esto me redirige

    }).catch(e => {
      console.log(e);
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter(temp => temp !== el)
    })
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to='/dogs'><button>Volver</button></Link>
      <h1>Creá tu dogs</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div >
          <label>Height_Min:</label>
          <input id='Height_Min' type="number" name="height" placeholder="Min height..." onChange={(e) => handleSelect_Height_Min(e)} required />

        </div>

        <div>
          <label>Height_Max:</label>
          <input id='Height_Max' type="number" name="height" placeholder="Max height..." onChange={(e) => handleSelect_Height_Max(e)} />
        </div>
        <div>
          <label>Weight_Min:</label>
          <input id='Weight_Min' type="number" name="weight" placeholder="Min weight..." onChange={(e) => handleSelect_Weight_Min(e)} />
        </div>

        <div>
          <label>Weight_Max:</label>
          <input id='Weight_Max' type="number" name="weight" placeholder="Max weight..." onChange={(e) => handleSelect_Weight_Max(e)} />
        </div>
        <div>
          <label>Years_Of_Life:</label>
          <input
            type="number"
            value={input.years_of_life}
            name="years_of_life"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {temperaments.map((temp) => (
            <option value={temp.name}>{temp.name}</option>
          ))}
        </select>
        <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
        <button type='submit'>Crear dogs</button>
      </form>
      {input.temperament.map(el =>
        <div className='divTemp'>
          <p>{el}</p>
          <button className='botonX' onClick={() => handleDelete(el)}>X</button>
        </div>
      )}
    </div>
  )
}

/*<div>
          <label>Weight:</label>
          <input
          type= "text"
          value= {input.weight}
          name= "weight"
          onChange={(e) => handleChange(e)}
          />
        </div> */