import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoblyApi from "../api.js";

function CompanyDetails() {
    const [company, setCompany] = useState(null);
    const location = useLocation();
    const { companyHandle } = location.state;

    useEffect(() => {
        async function getCompanyByHandle() {
            const res = await new JoblyApi().constructor.getCompany(
                companyHandle
            );
            console.log("UseEffect Res:", res);
            setCompany((c) => (c = res));
        }
        getCompanyByHandle();
    }, [companyHandle]);

    return (
        <div>
            <h2>{company ? company.name : "Loading..."}</h2>
            <h3>{company ? company.description : ""}</h3>
            {company
                ? company.jobs.map((j, key) => (
                      <p key={j.id}>
                          {j.title}, {j.salary}, {j.equity}
                      </p>
                  ))
                : ""}
        </div>
    );
}

export default CompanyDetails;
