import "./App.css";
import { React, useState } from "react";
import Home from "./routes/Home";
import CompanyList from "./routes/CompanyList";
import CompanyDetails from "./routes/CompanyDetails";
import JobList from "./routes/JobList";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NavBar from "./Navbar";
import UserContext from "./UserContext.js";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function App() {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(userInfo || "");

    const login = (username, token) => {
        setUser({ username, token });
        localStorage.setItem("token", JSON.stringify({ username, token }));
    };

    const logout = () => {
        setUser("");
        localStorage.clear();
    };

    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={{ user, login, logout }}>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/companies"
                            element={
                                user ? (
                                    <CompanyList />
                                ) : (
                                    <Navigate replace to="/" />
                                )
                            }
                        />
                        <Route
                            path="/companies/:handle"
                            element={
                                user ? (
                                    <CompanyDetails />
                                ) : (
                                    <Navigate replace to="/" />
                                )
                            }
                        />
                        <Route
                            path="/jobs"
                            element={
                                user ? <JobList /> : <Navigate replace to="/" />
                            }
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;
