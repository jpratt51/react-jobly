import { React, useEffect, useState } from "react";
import Company from "../Company";
import JoblyApi from "../api.js";

function CompanyList() {
    const INITIAL_STATE = {
        name: "",
        minEmployees: "",
        maxEmployees: "",
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        async function getCompanies() {
            const res = await new JoblyApi().constructor.getAllCompanies();
            setCompanies((c) => (c = res));
        }
        getCompanies();
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
        const { name, minEmployees, maxEmployees } = formData;
        async function filterCompanies() {
            let res = await new JoblyApi().constructor.findAllCompanies(
                name || "",
                minEmployees || 0,
                maxEmployees || 1000
            );
            return res;
        }
        filterCompanies().then((res) => setCompanies((c) => (c = res)));
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <div className="w-25 mx-auto job-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Company Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter company name"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="minEmployees">Minimum Employees</label>
                        <input
                            id="minEmployees"
                            type="text"
                            name="minEmployees"
                            value={formData.minEmployees}
                            placeholder="Minimum number of employees"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="maxEmployees">Maximum Employees</label>
                        <input
                            id="maxEmployees"
                            type="text"
                            name="maxEmployees"
                            value={formData.maxEmployees}
                            placeholder="Max number of employees"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <br />
                    <button className="btn btn-outline-success">Search</button>
                </form>
            </div>
            {companies
                ? companies.map((c) => <Company company={c} key={c.handle} />)
                : "Loading Companies..."}
        </div>
    );
}

export default CompanyList;
