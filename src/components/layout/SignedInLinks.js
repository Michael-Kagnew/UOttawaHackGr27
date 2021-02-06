import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Meet up</NavLink></li>
            <li><NavLink to='/'>Sign Out</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating green lighten-1">SF</NavLink></li>
        </ul>
    )
}

export default SignedInLinks;