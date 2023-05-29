import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoblyApi from "../api.js";
import Job from "../Job.js";

function CompanyDetails() {
    const [company, setCompany] = useState(null);
    const location = useLocation();
    const { companyHandle } = location.state;

    useEffect(() => {
        async function getCompanyByHandle() {
            const res = await new JoblyApi().constructor.getCompany(
                companyHandle
            );
            setCompany((c) => (c = res));
        }
        getCompanyByHandle();
    }, [companyHandle]);

    return (
        <div>
            <h2>{company ? company.name : "Loading..."}</h2>
            <h3>{company ? company.description : ""}</h3>
            {company
                ? company.jobs.map((j, key) => <Job job={j} key={j.id} />)
                : ""}
        </div>
    );
}

export default CompanyDetails;
