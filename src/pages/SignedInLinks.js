import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>My Account</NavLink></li>
            <li><NavLink to='/'>Settings</NavLink></li>
            <li><NavLink to='/' className="btn btn-floating green lighten-1">SF</NavLink></li>
        </ul>
    )
}

export default SignedInLinks;