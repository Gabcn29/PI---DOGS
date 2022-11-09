const axios = require('axios')

//exportamos todas las constantes con los textos de las acciones que crearemos y usaremos en el reducer
export const GET_ALL_DOGS = 'GET_ALL_DOGS'; // YA, renderiza todos en el home
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT';
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT'; //YA, filtro funciona    
export const SORT_BY_NAME = 'SORT_BY_NAME';//YA, ordenamiento funciona
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';//YA, filtro funciona
export const POST_DOG = 'POST_DOG';//  , post del dog que entra por form
export const DOG_DETAILS = 'DOG_DETAILS';
export const DELETE_DOG = 'DELETE_DOG';//Not yet
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';//NOT YET
export const GET_NAME_DOGS = 'GET_NAME_DOGS'////YA, renderiza el dog que se busca por el searchbar

//Una vez declaradas las constantes de las acciones se realizan peticiones a la ruta de nuestro proyecto, en este caso 
//a la ruta que nos conecta con nuestro backend, 'http://localhost:3001/dogs'.
// definimos y estructuramos la función get recipes que nos permitira obtener las recetas desde nuestro back,

export const getAllDogs = () => async dispatch => {
    return  await fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(data => dispatch({
            type: GET_ALL_DOGS,
            payload: data
        })
        )
}

export function sortByName (payload){
    console.log(payload)
    return {
        type: SORT_BY_NAME,
        payload
    } 
} 

export function filterBySource (payload) {
    console.log(payload)
    return {
        type: FILTER_BY_SOURCE,
        payload
    }
}

export function sortByWeight (payload) {
    console.log(payload)
    return {
        type: SORT_BY_WEIGHT,
        payload
    }
}

export function filterByTemperament (payload) {    
    
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export const getTemperaments = () => async dispatch => {
    return await fetch.get('http://localhost:3001/temperaments')
                .then(res => res.json)
                .then(data => dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: data
                }))
};

export const postDog = (payload) => async dispatch => {
    let response = await axios.post('http://localhost:3001/dogs',payload);
    console.log(response);
    return response
};

export function getNameDogs(name) {
    return async function (dispatch) {      
        try {
           let json = await axios.get('http://localhost:3001/dogs?name=' + name);
           return dispatch({
                    type: GET_NAME_DOGS,
                    payload: json.data            
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}


