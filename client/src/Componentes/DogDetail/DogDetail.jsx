// Importamos react, y los hooks que usaremos 
import React, { useEffect } from "react";
// Importamos Link y useHistory desde react-router-dom
import { Link } from "react-router-dom";
// Importamos las acciones que utilizaremos desde nuestras actions
import { dogDetails } from "../../Redux/Actions";
// Importamos los hooks de react - redux
import { useDispatch, useSelector } from "react-redux";


export default function DogDetail (props) {
    const dispatch = useDispatch()
    console.log(props)

    useEffect(() => {
        dispatch(dogDetails(props.match.params.id))
    }, [dispatch])

    const dog = useSelector(state => state.details)

    return (
        <div >
            <Link to={'/home'}>
                <button>Back</button>
            </Link>
            {
            dog.length>0 ?
            <div>
                <h1>{dog[0].name}</h1>
                <img src={dog[0].image} alt={dog[0].name} width='600px'height='400'/>
                <h4>Temperaments: {dog[0].createdInDb ? dog[0].temperaments.map(el => el.name + (', ')) : dog[0].temperament}</h4>
                <h5>Height: {dog[0].height}</h5>
                <h5>Weight: {dog[0].weight}</h5>
                <h5>Lifespan: {dog[0].lifeSpan}</h5>
            </div>
            : <p>Loading...</p>            
            }

        </div>
    )

}