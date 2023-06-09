import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api.js";

function Profile() {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            const res = await new JoblyApi().constructor.getUserData();
            setFirstName((c) => (c = res.user.firstName));
            setLastName((c) => (c = res.user.lastName));
            setEmail((c) => (c = res.user.email));
        }
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, firstName, lastName, email } = formData;
        async function updateUser() {
            await new JoblyApi().constructor.updateUser(
                password,
                firstName,
                lastName,
                email
            );
            navigate("/");
        }
        updateUser();
        setFormData(INITIAL_STATE);
    };

    return (
        <div className="w-25 mx-auto job-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name </label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        placeholder={firstName || "Loading ..."}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="lastName">Last Name </label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        placeholder={lastName || "Loading ..."}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        placeholder={email || "Loading ..."}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="password"
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <br />
                <button className="btn btn-outline-dark">Submit Changes</button>
            </form>
        </div>
    );
}

export default Profile;
