
import { GET_DOGS, ORDER_BY_NAME, GET_TEMPERAMENTS, GET_FILTER_TEMPERAMENTS, GET_FILTER_RAZA } from "../actions/ActionsTypes";
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: []

}

export default function reducer(state = initialState, { type, payload }) {
    //vamos a ejecutar los typos de accion para saber donde ejecutar cada logica
    switch (type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: payload,

            }

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

            if(payload === 'Todos'){
                filteredDogs = state.allDogs;
            }else{
                for (let i = 0; i < state.dogs.length; i++) {

                    if (state.dogs[i].temperament.find(t => t === payload)) {
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

            if(payload === 'Todos'){
                filteredDogsByRaza = state.allDogs;
            }else{
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
        /*case "ordenar-liviano-pesado":
            const ord_Liv_Pes =
            payload === "Más pesado a más liviano"?
            state.dogs.sort((a,b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3))):
            state.dogs.sort((a,b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3)))
           return {
               ...state,
               dogs: ord_Liv_Pes, 
           };*/
        case "ordenar-liviano-pesado":
            return {
                ...state,
                dogs: state.dogs.sort((a, b) => parseInt(a.weight.slice(0, 3)) - parseInt(b.weight.slice(0, 3)))
            };
        case "ordenar-pesado-liviano":
            return {
                ...state,
                dogs: state.dogs.sort((a, b) => parseInt(b.weight.slice(0, 3)) - parseInt(a.weight.slice(0, 3)))
            };

        default: return state
    }
}


