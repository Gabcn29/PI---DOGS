import React from "react";

export default function Paginado ({ dogsPerPage, allDogs, paginado }) {
     const pageNumbers = [];

     for (let i = 1;i <= Math.ceil(allDogs/dogsPerPage);i++) {
        pageNumbers.push(i)        
     }
     
     return (
        <nav>
            <ul className='paginado'>
                {
                    pageNumbers?.map( n =>{
                        return (
                        <li className='number' key={n}>
                            <a onClick={() => paginado(n)} href='#top'>{n}</a>
                        </li> )
                    })
                }
            </ul>
        </nav>
     )
}