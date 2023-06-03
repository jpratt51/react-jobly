import { React, useEffect, useState } from "react";
import Job from "../Job";
import JoblyApi from "../api.js";
import "../JobList.css";

function JobList() {
    const INITIAL_STATE = {
        title: "",
        minSalary: "",
        hasEquity: false,
    };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        async function getJobs() {
            const res = await new JoblyApi().constructor.findAllJobs();
            setJobs((c) => (c = res));
        }
        getJobs();
    }, []);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (value === "false") {
            value = "true";
        } else if (value === "true") {
            value = "false";
        }
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, minSalary, hasEquity } = formData;
        async function filterJobs() {
            let res = await new JoblyApi().constructor.findAllJobs(
                title || "",
                minSalary || 0,
                hasEquity
            );
            return res;
        }
        filterJobs().then((res) => setJobs((c) => (c = res)));
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <div className="w-25 mx-auto job-form">
                <form onSubmit={handleSubmit} className="">
                    <div className="form-group">
                        <label htmlFor="title">Job title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={formData.title}
                            placeholder="Enter job title"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="minSalary">Minimum Salary</label>
                        <input
                            id="minSalary"
                            type="number"
                            name="minSalary"
                            value={formData.minSalary}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <br />
                    <div className="form-check">
                        <label htmlFor="hasEquity">Has Equity</label>
                        <input
                            id="hasEquity"
                            type="checkbox"
                            name="hasEquity"
                            value={formData.hasEquity}
                            onChange={handleChange}
                            className="form-check-input"
                        />
                    </div>
                    <br />
                    <button className="btn btn-outline-success">Search</button>
                </form>
            </div>
            {jobs
                ? jobs.map((j) => <Job job={j} key={j.id} />)
                : "Loading Jobs ..."}
        </div>
    );
}

export default JobList;
