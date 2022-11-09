import React from "react";


export default function Card( { image, name, temperament, weight, id }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt='Img Not Found' width= '200px' height= '200px' />
            <h3>Temperaments: {temperament}</h3>
            <h3>Weight: {weight}</h3>
            <h3>{id}</h3>
        </div>
    )
}