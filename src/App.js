import "./App.css";
import Home from "./routes/Home";
import CompanyList from "./routes/CompanyList";
import CompanyDetails from "./routes/CompanyDetails";
import JobList from "./routes/JobList";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import NavBar from "./Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route
                        path="/companies/:handle"
                        element={<CompanyDetails />}
                    />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
