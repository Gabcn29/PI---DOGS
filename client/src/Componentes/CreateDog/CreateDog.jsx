// Importamos react, y los hooks que usaremos 
import React, { useEffect, useState } from "react";
// Importamos Link y useHistory desde react-router-dom
import { Link, useHistory } from "react-router-dom";
// Importamos las acciones que utilizaremos desde nuestras actions
import { getTemperaments, postDog } from "../../Redux/Actions";
// Importamos los hooks de react - redux
import { useDispatch, useSelector } from "react-redux";

export default function dogCreate () {
    const dispatch = useDispatch();
    // Nos traemos los temperamentos desde nuestro state en el reducer
    const temperaments = useSelector((state) => state.temperaments);
    // Creamos estados locales para controlar los inputs de la información que se pasará por body al post y asi crear nuestro elemento en la tabla de nuestro back.
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        lifeSpan:'',
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return (
        <div>
            
        </div>
    )    

}

