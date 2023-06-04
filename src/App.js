import "./App.css";
import { React, useState, useEffect } from "react";
import Home from "./routes/Home.js";
import CompanyList from "./routes/CompanyList.js";
import CompanyDetails from "./routes/CompanyDetails.js";
import JobList from "./routes/JobList.js";
import Profile from "./routes/Profile.js";
import Login from "./routes/Login.js";
import Signup from "./routes/Signup.js";
import NavBar from "./Navbar.js";
import UserContext from "./UserContext.js";
import JoblyApi from "./api.js";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
    let userInfo = JSON.parse(localStorage.getItem("user")) || "";
    const [user, setUser] = useState(userInfo);
    // const [userJobs, setUserJobs] = useState(null);

    useEffect(() => {
        async function fetchUserJobs() {
            const res = await new JoblyApi().constructor.getUserData();
            setUser((data) => ({ ...data, jobs: res.user.applications }));
        }
        fetchUserJobs();
    }, []);

    const login = (username, token) => {
        setUser({ username, token });
        localStorage.setItem("user", JSON.stringify({ username, token }));
    };

    const logout = () => {
        setUser("");
        localStorage.clear();
    };

    const apply = (jobId) => {
        let userJobs = user.jobs;
        userJobs.push(jobId);
        setUser((data) => ({
            ...data,
            jobs: userJobs,
        }));
        localStorage.setItem("user", JSON.stringify(user));
    };

    return (
        <div>
            <UserContext.Provider value={{ user, login, logout, apply }}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/companies"
                        element={
                            user ? <CompanyList /> : <Navigate replace to="/" />
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
                    <Route
                        path="/profile"
                        element={
                            user ? <Profile /> : <Navigate replace to="/" />
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
