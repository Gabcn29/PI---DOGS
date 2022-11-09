import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className='navbar'>
            <Link to = '/home'>                
                Henry - Dogs App                
            </Link>             
        </nav>
    )
}