import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';

const Navbar = () => {
    return (
        <nav>
            <div className="container nav-wrapper">
                <Link to="/" className="left brand-logo"> Social Fli</Link>
                <SignedInLinks/>
            </div>
        </nav>
    )
}

export default Navbar;