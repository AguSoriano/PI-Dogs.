import React from 'react';
import{useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../../redux/actions/index';
import{useEffect} from 'react';

export default function Detail(props){
  console.log(props)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  })

  const myDog = useSelector((state) => state.details)

  return(
    <div>
      {
        myDog.length>0 ?
        <div>
          <h1>
           Soy: {myDog[0].name}
          </h1>
          <img alt="Not found" src= {myDog[0].image.url?myDog[0].image.url:myDog[0].image}></img>
          <h1>
          Altura: {myDog[0].height}
          </h1>
          <h1>
           Peso: {myDog[0].weight[0] + 'a' + myDog[0].weight[1] + ' kg.'}
          </h1>
          <h1>
           Años de vida: {myDog[0].years_of_life}
          </h1>
          <h1>
           Temperamentos: {!myDog[0].createdInBd? myDog[0].temperament + ' ': myDog[0].temperamentos.map(el => el.name + (' '))}
           
          </h1>
        </div> : <p>Loading...</p>
      }
    </div>
  )
}

