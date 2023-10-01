import React from "react";
import { Navigate } from "react-router-dom";


// If we're not authenticated, we'll navigate to /login, otherwise render children node
export function RequiresAuth({ children }) {
    const token = localStorage.getItem('token');

    if (token) return children;
    return <Navigate to={"/login"} />;
}

// If we are authenticated, we'll navigate to /, otherwise render children node
export function RequiresNonAuth({ children }) {
    const token = localStorage.getItem('token');

    if (!token) return children;
    return <Navigate to={"/"} />;
}