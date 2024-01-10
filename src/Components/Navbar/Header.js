import React, { useContext, useEffect } from 'react'
import Logo from "../../Images/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../ContextProvider/Context';

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    console.log(logindata)

    const navigate = useNavigate();
    const logOut = async () => {
        localStorage.removeItem('token');
        // Add a small delay (e.g., 100 milliseconds) before navigating
        // This allows time for the token removal to take effect
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate("/");
    }




    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={Logo} />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-link active" style={{ fontWeight: 500 }} aria-current="page" to="/all-users">
                                Home
                            </Link>
                            <Link className="nav-link active" to="/my-users" style={{ fontWeight: 500 }} >
                                Employees
                            </Link>
                            <Link className="nav-link active" to="/add-user" style={{ fontWeight: 500 }} >
                                Add-User
                            </Link>
                            <Link className="nav-link active" to="/admin-profile" style={{ fontWeight: 500 }} >
                                Profile
                            </Link>
                            <Link className="nav-link active" onClick={logOut} style={{ fontWeight: 500 }} >
                                Logout
                            </Link>

                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header