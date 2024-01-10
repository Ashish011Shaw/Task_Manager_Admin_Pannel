import React from 'react'
import { NavLink } from 'react-router-dom'
import img from "./Images/404.svg"

const Error = () => {
    return (
        <>
            <div className="container">
                <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <img src={img} alt="error" style={{ width: "500px", marginBottom: 20 }} />
                    {/* <h1 className="mb-3">404 ERROR </h1> */}
                    <h2 className="mb-3 text-danger">PAGE NOT FOUND</h2>
                    <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18 }}> Back To Home Page </NavLink>
                </div>
            </div>
        </>
    )
}

export default Error