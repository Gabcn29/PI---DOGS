import React from "react";

export default function Paginado ({ dogsPerPage, allDogs, paginado, currentPage }) {
     const pageNumbers = [];

     for (let i = 1;i <= Math.ceil(allDogs/dogsPerPage);i++) {
        pageNumbers.push(i)        
     }

     function disabledPrev (){
        if (currentPage <= 1)return true       
     }

     function disabledNext (){
        if (currentPage >= pageNumbers.length) return true
    }
     
     return (
        <nav>
            <button onClick={() => paginado(currentPage - 1)} disabled={disabledPrev()} >PREV</button>
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
            <button onClick={() => paginado(currentPage + 1)} disabled={disabledNext()}>NEXT</button>
        </nav>
     )
}