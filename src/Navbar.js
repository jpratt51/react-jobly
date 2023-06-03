import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext.js";

function NavBar() {
    const { user, logout } = useContext(UserContext);
    const signup = (
        <NavLink to="/signup" className="nav-item nav-link p-2">
            Signup
        </NavLink>
    );
    const login = (
        <NavLink to="/login" className="nav-item nav-link p-2">
            Login
        </NavLink>
    );
    const logoutBtn = (
        <button
            type="button"
            onClick={logout}
            className="nav-item nav-link bg-transparent border-0"
        >
            Logout {user.username}
        </button>
    );

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <NavLink to="/" className="navbar-brand p-3">
                    Jobly
                </NavLink>
                <div className="navbar-nav active d-flex flex-row ms-auto">
                    <NavLink to="/jobs" className="nav-item nav-link p-2">
                        Jobs
                    </NavLink>

                    <NavLink to="/companies" className="nav-item nav-link p-2">
                        Companies
                    </NavLink>

                    <NavLink to="/profile" className="nav-item nav-link p-2">
                        Profile
                    </NavLink>

                    {user ? logoutBtn : signup}
                    {!user ? login : null}
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
