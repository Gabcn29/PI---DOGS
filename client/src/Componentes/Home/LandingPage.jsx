//importamos react
import  React from 'react';
//importamos Link desde react Dom
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Welcome to Dogs</h1>
            <Link to ='/home'>
                <button>DOGS</button>
            </Link>
        </div> 
    )
}