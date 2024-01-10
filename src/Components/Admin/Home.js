import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const checkAuth = async () => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("*")
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <>
            Home
        </>
    )
}

export default Home