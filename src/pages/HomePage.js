import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div style={{marginTop: "50px"}}>
                <button style={{
                    position: "relative",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#568EA6",
                    border: "none",
                    color: "white",
                    padding: "15px 32px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inlineBlock",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer"
                }}>
                    Meet up now!
                </button>
            </div>
        </div>
    )
}

export default HomePage;