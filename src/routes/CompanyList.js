import { React, useEffect, useState } from "react";
import Company from "../Company";
import JoblyApi from "../api.js";

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(() => {
        async function getCompanies() {
            const res = await new JoblyApi().constructor.getAllCompanies();
            setCompanies((c) => (c = res));
        }
        getCompanies();
    }, []);

    return (
        <div>
            {companies
                ? companies.map((c) => (
                      <Company
                          name={c.name}
                          description={c.description}
                          key={c.handle}
                      />
                  ))
                : "Loading Companies..."}
        </div>
    );
}

export default CompanyList;
