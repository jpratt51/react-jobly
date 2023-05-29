import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext.js";

function NavBar() {
    const { user, logout } = useContext(UserContext);
    const signup = <NavLink to="/signup">Signup</NavLink>;
    const login = <NavLink to="/login">Login</NavLink>;
    const logoutBtn = (
        <button type="button" onClick={logout}>
            Logout {user.username}
        </button>
    );

    return (
        <div>
            <nav className="NavBar">
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/companies">Companies</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                {user ? logoutBtn : signup}
                {!user ? login : null}
            </nav>
        </div>
    );
}

export default NavBar;
