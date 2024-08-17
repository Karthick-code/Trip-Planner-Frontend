import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        window.location = "/";
    }, [])
    return null;
}

export default Logout