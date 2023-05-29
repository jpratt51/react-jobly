import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api.js";
import UserContext from "../UserContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const INITIAL_STATE = {
        username: "",
        password: "",
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
        const { username, password } = formData;
        async function loginUser() {
            let res = await new JoblyApi().constructor.login(
                username || "",
                password || ""
            );
            login(username, res);
            navigate("/");
        }
        loginUser();
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
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
