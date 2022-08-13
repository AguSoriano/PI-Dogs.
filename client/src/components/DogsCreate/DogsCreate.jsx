import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDogs, getTemperaments } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './DogsCreate.module.css'

const validate = (input) => {
  let errors = {}
  if(!input.name) {
      errors.name = "Name is required, it should not contain numbers"
  }
  if(!input.height) {
      errors.height = "Height is required"
  }
  if(!input.weight) {
      errors.weight = "Weight is required"
  }
  if(!input.life_span) {
      errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
  }
  return errors
}

export default function DogsCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const temperaments = useSelector((state) => state.temperaments)

  const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        height: [],
        weight: [],
        life_span:  "",
        image: "",
    });

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
    setErrors(validate({
      ...input,
      [e.target.name] : e.target.value
  }))
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
    e.preventDefault(); //sirve para prevenir la accion por defecto del submit
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

  useEffect(()=>{
    if (input.name.length > 0 && input.height.length > 0  &&  input.weight.length > 0) setButton(false)
    else setButton(true)
}, [input, setButton]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className= {style.fondo_imagen}>
    <div className= {style.fondo}>
      <div className= {style.container}>
      <div >
      <Link to='/dogs'><button className= {style.button_to_home}>Volver</button></Link>
      </div>
      <div className={style.titulo}>
      <h1>Creá tu dog</h1>
      </div>
      <form className={style.formulario} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.input}>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            placeholder="Required"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>{errors.name}</div>
        <div className={style.input}>
          <label>Height_Min:</label>
          <input id='Height_Min' type="number" name="height" placeholder="Required" onChange={(e) => handleSelect_Height_Min(e)} />
        </div>
        <div>{errors.height}</div>
        <div className={style.input}>
          <label>Height_Max:</label>
          <input id='Height_Max' type="number" name="height" placeholder="Required" onChange={(e) => handleSelect_Height_Max(e)} />
        </div>
        
        <div className={style.input}>
          <label>Weight_Min:</label>
          <input id='Weight_Min' type="number" name="weight" placeholder="Required" onChange={(e) => handleSelect_Weight_Min(e)} />
        </div>
        <div>{errors.weight}</div>
        <div className={style.input}>
          <label>Weight_Max:</label>
          <input id='Weight_Max' type="number" name="weight" placeholder="Required" onChange={(e) => handleSelect_Weight_Max(e)} />
        </div>
        <div>{errors.weight}</div>
        <div className={style.input}>
          <label>Years_Of_Life:</label>
          <input
            type="number"
            value={input.years_of_life}
            name="years_of_life"
            placeholder="Required" 
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={style.input}>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            placeholder="Url-NoRequired" 
            onChange={(e) => handleChange(e)}
          />
        </div>
        <select onChange={(e) => handleSelect(e)}>
          {temperaments.map((temp) => (
            <option value={temp.name}>{temp.name}</option>
          ))}
        </select>
        <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
        <button className={style.button_to_home} type='submit' disabled={button}>Crear dogs</button>
      </form>
      <div className={style.container_temperaments}>
      {input.temperament.map(el =>
      <div className={style.element_temperament}>
          <p>{el}</p>
          <button onClick={() => handleDelete(el)}>X</button>
          </div>
      )}
      </div>
      </div>
    </div>
    </div>
  )
}

