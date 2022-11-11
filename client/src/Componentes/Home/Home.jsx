// Este sera nuestro Home
// Importamos React

import React from 'react';

// Importamos nuestros hooks, 

import { useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importamos nuestras actions, link y componentes a utilizar
import { getAllDogs, filterBySource, sortByName, sortByWeight, getTemperaments, filterByTemperament, cleanDetails } from '../../Redux/Actions/index';
import { Link } from 'react-router-dom';
import Card from '../DogCard/DogCard'; 
import Paginado from '..//Paginado/Paginado';

import SearchBar from './SearchBar';

//Definimos nuestro componente

export default function DogsHome() {
    const dispatch = useDispatch();
   
    //// Nos traemos el array con todas las razas de perros desde index.js en el reducer:
   
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    
    // Definimos una constante para nuestro paginado que correspondera a la pagina actual y su respectivo setState,

    const [ currentPage, setCurrentPage ] = useState(1);
    
    // Definimos otra constante para definir el numero de paginas y la cantidad de recetas a mostrar por pag, cabe recordar que el numero de recetas por pag seran 8 teniendo en cuenta el README
    
    const [ dogsPerPage, setDogsPerPage ] = useState(8)
    
    // Creamos una constante con el indice de la ultima receta, el calculo recae en que el useState de la currentPage toma como valor inicial 1 y al multiplicarlo por 8, nos da que el indice es 8
    
    const indexOfLastDog = currentPage * dogsPerPage // 8
    
    // Definimos otra variable para tener el valor del indice de la primera receta que es igual a la resta entre el indice de la ultima receta y el numero de recetas por pagina,

    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
    
    // Definimos una constante que almacenara la cantidad de recetas en la pagina actual, se aplica el metodo de array .slice() que nos permite extraer elementos de un array y guardarlos en uno nuevo

    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    // Creamos un estado que nos permitira modificar el orden de las paginas dependiendo del ordenamiento basado en el nombre siendo ascendente o descendente

    const [ orden, setOrden ] = useState('')
    
    // A continuacion definimos nuestra funcion paginadora que toma como parametro el numero de la pagina pageNumber

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const getDispatchs = useCallback(() => {
        dispatch(cleanDetails());
        dispatch(getAllDogs());
        dispatch(getTemperaments())
    }, [dispatch])

    useEffect (() => {
        getDispatchs()
    },[getDispatchs]);

   
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllDogs());
    };

    function handleFilterBySource(e){
        dispatch(filterBySource(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setOrden(`Sort by ${e.target.value}`);
        setCurrentPage(1)
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setOrden(`Sort by ${e.target.value}`);
        setCurrentPage(1)
    }

    function handleFilterByTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
        setOrden(`Sort by ${e.target.value}`);
        setCurrentPage(1)
    }

    return (
        <div>            
            <Link to = '/createDog'>Create Dog</Link>
            <h1>DOGS APP</h1>
            <button onClick={ e => { handleClick(e) }}>
                Back To All Dogs
            </button>
            <div>  
            <SearchBar />
                <div>                    
                    <select onChange={e => handleSortByWeight(e)} >  
                        <option value='All'>All</option>                      
                        <option value='Asc'>Ascendent</option>
                        <option value='Des'>Descendent</option>
                    </select>
                                        
                    <select onChange={e => handleSortByName(e)}  > 
                        <option value='All'>All</option>
                        <option value='A-Z'>A to Z</option>
                        <option value='Z-A'>Z to A</option>
                    </select>
                                        
                    <select onChange={e => handleFilterBySource(e)} >
                        <option value='All'>All</option>
                        <option value='API'>From API</option>
                        <option value='DB'>From DB</option>
                    </select>

                    <select onChange={e => handleFilterByTemperament(e)} >
                        { temperaments?.map((temps) => 
                            (<option value={temps.name} key={temps.id}>
                                {temps.name}
                            </option>))
                        }
                    </select>
                    
                </div> 
                <div>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado} 
                    currentPage={currentPage}                   
                    />
                </div>
                <div>
                {
                    currentDogs?.map( el => {
                        return (
                            <div key={el.id}>
                                <Link to = { '/home/' + el.id }>
                                    <Card
                                        key={el.id}
                                        image={el.image}
                                        name={el.name}
                                        temperament={el.createdInDb ? el.temperaments.map(el => el.name + (', ')) : el.temperament}
                                        weight={el.weight}
                                        />
                                    
                                </Link>
                            </div>
                        )
                    })
                }
                </div>

            </div>

        </div>
    )

}