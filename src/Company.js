import React from "react";
import { Link } from "react-router-dom";
import "./Company.css";

function Company({ company }) {
    return (
        <div className="card w-75 mx-auto my-4 company-card">
            <div className="card-body">
                <Link
                    to={`${company.handle}`}
                    state={{ companyHandle: company.handle }}
                    className="company-card-title"
                >
                    <p className="card-title">{company.name}</p>
                </Link>
                <p className="card-text">{company.description}</p>
            </div>
        </div>
    );
}

export default Company;
