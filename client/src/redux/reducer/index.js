
import {
    GET_DOGS,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    GET_TEMPERAMENTS,
    GET_FILTER_TEMPERAMENTS,
    GET_FILTER_RAZA,
    FILTER_CREATED,
    GET_NAME_DOGS,
    POST_DOGS,
    GET_DETAILS
} from "../actions/ActionsTypes";

const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: []

}

export default function reducer(state = initialState, { type, payload }) {
    //vamos a ejecutar los typos de accion para saber donde ejecutar cada logica
    switch (type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: payload,

            }
        case ORDER_BY_WEIGHT:
            const sortedWeight =
                payload === "min_weight"
                    ? state.dogs.sort((a, b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3)))
                    : state.dogs.sort((a, b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3)))
            return {
                ...state,
                dogs: sortedWeight,
            };

        case ORDER_BY_NAME:

            const sortedName =
                payload === "A-Z"
                    ? state.dogs.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.dogs.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                dogs: sortedName,

            };



        case GET_TEMPERAMENTS:

            const filteresTemp = payload.filter((temp) => temp.name !== "");
            return {
                ...state,
                temperaments: filteresTemp,
            };

        case GET_FILTER_TEMPERAMENTS:


            if (state.allDogs.length === 0) {
                state.allDogs = state.dogs;
            } else {
                state.dogs = state.allDogs;
            }

            let filteredDogs = [];

            if (payload === 'Todos') {
                filteredDogs = state.allDogs;
            } else {
                for (let i = 0; i < state.dogs.length; i++) {

                    if (state.dogs[i].temperament?.find(t => t === payload)) {
                        filteredDogs.push(state.dogs[i]);
                    }else if(state.dogs[i].temperamentos?.find(t => t === payload)){
                        filteredDogs.push(state.dogs[i]);
                    }

                }
            }


            return {
                ...state,
                dogs: filteredDogs,
            };

        case GET_FILTER_RAZA:


            if (state.allDogs.length === 0) {
                state.allDogs = state.dogs;
            } else {
                state.dogs = state.allDogs;
            }

            let filteredDogsByRaza = [];

            if (payload === 'Todos') {
                filteredDogsByRaza = state.allDogs;
            } else {
                for (let i = 0; i < state.dogs.length; i++) {
                    if (state.dogs[i].name === payload) {
                        filteredDogsByRaza.push(state.dogs[i]);
                    }
                }
            }
            return {
                ...state,
                dogs: filteredDogsByRaza,
            };

        case FILTER_CREATED:

            if (state.allDogs.length === 0) {
                state.allDogs = state.dogs;
            } 

            const allDogs = state.allDogs
            console.log(allDogs)
            
            const createdFilter = payload === 'created' ? allDogs.filter(el => el.createdInBd) : allDogs.filter(el => !el.createdInBd)
            return {
                ...state,
                dogs: createdFilter
            }


        case GET_NAME_DOGS:
            return {
                ...state,
                dogs: payload
            }

        case POST_DOGS:
            return {
                ...state,
            }
        case GET_DETAILS:
            return {
                ...state,
                details: payload
            }

        default: return state
    }
}
