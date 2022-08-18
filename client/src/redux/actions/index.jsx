
import axios from 'axios';
import {
    GET_DOGS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_TEMPERAMENTS,
    GET_FILTER_TEMPERAMENTS,
    GET_FILTER_RAZA,
    FILTER_CREATED,
    GET_NAME_DOGS,
    GET_DETAILS

} from "./ActionsTypes";

const { API_KEY } = process.env;


export function getDogs() {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/dogs?api_key=${API_KEY}`, {

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
    return {
        type: GET_FILTER_TEMPERAMENTS,
        payload
    }
};

export function FilterByRaza(payload) {
    return {
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

export function OrderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
};

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload

    }

}

export function getNameDogs(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_NAME_DOGS,
                payload: json.data
            })
        } catch (error) {
            return error;
        }
    }
}

export function postDogs(payload) {
    return async function (dispatch) {
        const response = axios.post(`http://localhost:3001/dogs?api_key=${API_KEY}`, payload)
        return response;
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }

    }
}






