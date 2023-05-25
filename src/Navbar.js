import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="NavBar">
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
        </nav>
    );
}

export default NavBar;
