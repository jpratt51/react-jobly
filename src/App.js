import "./App.css";
import Home from "./routes/Home";
import Companies from "./routes/Companies";
import CompanyDetails from "./routes/CompanyDetails";
import Jobs from "./routes/Jobs";
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
                    <Route path="/companies" element={<Companies />} />
                    <Route
                        path="/companies/:handle"
                        element={<CompanyDetails />}
                    />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
