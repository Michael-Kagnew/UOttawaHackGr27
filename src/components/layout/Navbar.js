import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
const Navbar = () => {
    return (
        <nav>
            <div className="container nav-wrapper">
                <Link to="/" className="left brand-logo"> Social Fli</Link>
                <SignedInLinks/>
                <SignedOutLinks/>
            </div>
        </nav>
    )
}

export default Navbar;