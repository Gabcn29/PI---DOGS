// Importamos las actions types desde nuestra carpeta de acciones

import { GET_ALL_DOGS, FILTER_BY_TEMPERAMENT, SORT_BY_WEIGHT, SORT_BY_NAME, FILTER_BY_SOURCE, DOG_DETAILS, POST_DOG, DELETE_DOG, GET_NAME_DOGS, GET_TEMPERAMENTS} from '../Actions/index';

// Definimos nuestro estado inicial 

const initialState = {
    Alldogs: [],
    dogs: [],
    temperaments: []
}

// Definimos nuestro root reducer, que tendra como parametros iniciales un estado que sera igual a initialState, y una acción que correspondera con nuestras actions creadas.

function rootReducer(state = initialState, action) {
    switch(action.type){
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                Alldogs: action.payload,
            };
        
        case FILTER_BY_SOURCE:

            const filteredBy = action.payload === 'DB' ? state.Alldogs.filter( el => el.createdInDb ) : state.Alldogs.filter( el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.Alldogs : filteredBy
            };
        
        case SORT_BY_NAME: 

            const sortedByName = action.payload === 'A-Z' ? 
            state.dogs.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                console.log(a.name)
                let nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                else return 0;                
            }) :
            state.dogs.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
                else return 0;                
            })         
            
            return {
                ...state,
                dogs: sortedByName,
            };

        case SORT_BY_WEIGHT: 

        const sortedByWeight = action.payload === 'Asc' ? 
        state.dogs.sort((a, b) => {
            let weightA = a.weight.slice(0,2);
            let weightANum = parseInt(weightA)
            console.log(weightANum)
            let weightB = b.weight.slice(0,2);
            let weightBNum = parseInt(weightB)            
            console.log(weightBNum)
            if (weightANum < weightBNum) return -1;
            if (weightANum > weightBNum) return 1;
            return 0;                
        }) :
        state.dogs.sort((a, b) => {
            let weightA = a.weight.slice(0,2);
            let weightANum = parseInt(weightA)
            let weightB = b.weight.slice(0,2);
            let weightBNum = parseInt(weightB)
            if (weightANum < weightBNum) return 1;
            if (weightANum > weightBNum) return -1;
            return 0;                
        }) 
            return {
                ...state,
                dogs: sortedByWeight
            };

        case FILTER_BY_TEMPERAMENT: 

            return {
                ...state,
                dogs: action.payload
            };

        case DOG_DETAILS: 

            return {
                ...state,
                dogs: action.payload
            };

        case POST_DOG: 

            return {
                ...state
            };

        case DELETE_DOG: 

            return {
                ...state,
                dogs: action.payload
            };    
            
        case GET_NAME_DOGS:
// Este caso nos permite acceder a la busqueda realizada por la searchbar y asi poder renderizar los resultados que se encuentran en el payload; si el payload se no contiene nada debido a que no se ingreso nada en el searchbar y se ejecuto el boton, se renderiza todo nuevamente. Preguntar a ver si se deja asi o no.
            return {
                ...state,
                dogs: action.payload.length ? action.payload : action.Alldogs
            };
        
        case GET_TEMPERAMENTS:

            return {
                ...state,
                temperaments: action.payload
            }
            
        default:
            return state;
    
    
    }

}


export default rootReducer;