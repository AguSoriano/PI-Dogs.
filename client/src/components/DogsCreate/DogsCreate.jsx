import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDogs, getTemperaments, getDogs } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from './DogsCreate.module.css'
import validate from './validate';

export default function DogsCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const temperaments = useSelector((state) => state.temperaments)
  const allDogs = useSelector((state) => state.dogs)
  const [boolean, setBoolean] = useState(false);
  const [errors, setErrors] = useState({});
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
      [e.target.name]: e.target.value
    }));
  }

  function handleSelect(e) {
    if (input.temperament.filter(t => t === e.target.value).length === 0) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
      });
    } else {
      alert('El temperamento ya fue seleccionado');
    }

  }

  function handleSelect_Weight_Min(e) {
    input.weight[0] = e.target.value;
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect_Weight_Max(e) {
    input.weight[1] = e.target.value;
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect_Height_Min(e) {
    input.height[0] = e.target.value;
    setErrors(validate({
      ...input,
      [e.target.name]: input.height
    }))
  }

  function handleSelect_Height_Max(e) {
    input.height[1] = e.target.value;
    setErrors(validate({
      ...input,
      [e.target.name]: input.height
    }))
  }

  function handleSubmit(e) {

    e.preventDefault();
    try {
      if (
        !errors.name &&
        !errors.height &&
        !errors.weight &&
        !errors.image &&
        !errors.temperament &&
        !errors.years_of_life
      ) {

        dispatch(postDogs(input));
        alert('Dogs creado :)');
        setInput({
          name: "",
          height: [],
          weight: [],
          years_of_life: "",
          temperament: [],
          image: "",
        })
        history.push('/dogs')
      } else {
        alert("Error, complete correctly");
      }

    } catch (error) {
      alert("Error, create dogs");
      console.log(error);
    }

  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter(temp => temp !== el)
    })
  }

  useEffect(() => {
    setErrors(validate(input, allDogs))
  }, [input])

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className={style.fondo_imagen}>
      <div className={style.fondo}>
        <div className={style.container}>
          <div >
            <Link to='/dogs'><button className={style.button_to_home}>Home</button></Link>
          </div>
          <div className={style.titulo}>
            <h1>Create Dog</h1>
          </div>
          <form className={style.formulario} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.input}>
              <label className={style.labelForm}>Name: </label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Required"
                onChange={handleChange}
              />
              <div className={style.inputError}>{errors.name && <p>{errors.name}</p>}</div>
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Height_Min: </label>
              <input id='Height_Min' type="number" name="height" placeholder="Required" onChange={(e) => handleSelect_Height_Min(e)} />
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Height_Max:</label>
              <input id='Height_Max' type="number" name="height" placeholder="Required" onChange={(e) => handleSelect_Height_Max(e)} />
              <div className={style.inputError}>{errors.height && <p>{errors.height} </p>}</div>
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Weight_Min:</label>
              <input id='Weight_Min' type="number" name="weight" placeholder="Required" onChange={(e) => handleSelect_Weight_Min(e)} />
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Weight_Max:</label>
              <input id='Weight_Max' type="number" name="weight" placeholder="Required" onChange={(e) => handleSelect_Weight_Max(e)} />
              <div className={style.inputError}>{errors.weight && <p>{errors.weight} </p>}</div>
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Years_Of_Life:</label>
              <input
                type="number"
                value={input.years_of_life}
                name="years_of_life"
                placeholder="Required"
                onChange={handleChange}
              />
              <div className={style.inputError}>{errors.years_of_life && <p>{errors.years_of_life} </p>}</div>
            </div>
            <div className={style.input}>
              <label className={style.labelForm}>Image:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                placeholder="Url-NoRequired"
                onChange={handleChange}
              />
              <div className={style.inputError}>{errors.image && <p>{errors.image} </p>}</div>
            </div>
            <select onChange={handleSelect}>
              {temperaments.map((temp) => (
                <option value={temp.name}>{temp.name}</option>
              ))}
            </select>
            <div>
              <ul><li>{input.temperament.map(el => el + " ,")}</li></ul>
              {boolean && errors.temperament ? (
                <span>{errors.temperament}</span>
              ) : null}
            </div>
            <button className={style.button_to_home} type='submit'>Create dogs</button>
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