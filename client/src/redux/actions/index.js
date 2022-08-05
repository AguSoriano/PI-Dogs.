
import axios from 'axios';
import { GET_DOGS, ORDER_BY_NAME, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENTS,GET_FILTER_RAZA } from "./ActionsTypes";

const {API_KEY} = process.env;

//Acá sucede toda la conecxion entre el front y el back
export function getDogs() {
    return async function(dispatch){ 
        let json = await axios.get(`http://localhost:3001/dogs?api_key=${API_KEY}`,{
        
        });

        return dispatch({
            type: GET_DOGS,
            payload: json.data
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/temperaments?api_key=${API_KEY}`)
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        });
      }  
  };

export function FilterByTemperament(payload) {
    return{
        type: GET_FILTER_TEMPERAMENTS,
        payload
    }
};

export function FilterByRaza(payload) {
    return{
        type: GET_FILTER_RAZA,
        payload
    }
};

export function OrderByName(payload) {
    return { 
        type: ORDER_BY_NAME,
        payload
    }
};

/*export function OrderByWeight(payload){
    return {
        type: "ordenar-liviano-pesado",
        payload
    }
}*/


  

