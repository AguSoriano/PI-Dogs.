import React from 'react';
import{useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../../redux/actions/index';
import{useEffect} from 'react';
import style from './Details.module.css'
import { Link } from "react-router-dom";

export default function Detail(props){
  console.log(props)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  })

  const myDog = useSelector((state) => state.details)

  return(
    <div className={`${style.main_container}`}>
      <Link to="/dogs">
                <button className={`${style.button_home}`}>Home</button>
            </Link>
            <div className={`${style.sub_container}`}>
            <div className={`${style.container_elements}`}>
      {
        myDog.length>0 ?
        <div>
          <div className={`${style.image_container}`}>
          <img alt="Not found" src= {myDog[0].image.url?myDog[0].image.url:myDog[0].image}></img>
          </div>
          <div className={`${style.right_container}`}>
          <h1>
           {myDog[0].name}
          </h1>
          <h3>
          Altura: {myDog[0].height[0] + ' a ' + myDog[0].height[1] + ' mts.'}
          </h3>
          <h3>
           Peso: {myDog[0].weight[0] + ' a ' + myDog[0].weight[1] + ' kg.'}
          </h3>
          <h3>
           Años de vida: {myDog[0].years_of_life.replace('years','')}
          </h3>
          <h3>
           Temperamentos: {!myDog[0].createdInBd? myDog[0].temperament + ',': myDog[0].temperamentos.map(el => el.name + (','))}
          </h3>
          </div>
        </div> : <p>Loading...</p>
      }
    </div>
    </div>
    </div>
  )
}

