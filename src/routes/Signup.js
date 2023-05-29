import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api.js";
import UserContext from "../UserContext";

function Signup() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, firstName, lastName, email } = formData;
        async function registerUser() {
            let res = await new JoblyApi().constructor.register(
                username || "",
                password || "",
                firstName || "",
                lastName || "",
                email || ""
            );
            login(username, res);
            navigate("/");
        }
        registerUser();
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="username"
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="password"></label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="password"
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="firstName"></label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                />
                <br />
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                />
                <br />
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                />
                <br />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
