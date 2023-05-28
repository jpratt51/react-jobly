import React from "react";
import { Link } from "react-router-dom";

function Company({ company }) {
    return (
        <Link
            to={`${company.handle}`}
            state={{ companyHandle: company.handle, key: company.handle }}
        >
            <div>
                <h1>{company.name}</h1>
                <h2>{company.description}</h2>
            </div>
        </Link>
    );
}

export default Company;
