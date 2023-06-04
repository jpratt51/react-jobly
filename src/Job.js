import { React, useContext } from "react";
import JoblyApi from "./api.js";
import UserContext from "./UserContext.js";
import "./Job.css";

function Job({ job }) {
    const { user, apply } = useContext(UserContext);

    const handleClick = () => {
        async function applyForJob() {
            let res = await new JoblyApi().constructor.apply(
                user.username,
                job.id
            );
            return res;
        }
        applyForJob();
        apply(job.id);
    };

    return (
        <div className="card w-75 mx-auto my-4 job-card">
            {user.jobs && job.id ? (
                user.jobs.indexOf(job.id) !== -1 ? (
                    <div className="card-body">
                        <p className="card-title m-2">
                            <b>{job.title ? job.title : null}</b>
                        </p>
                        <hr></hr>
                        <div className="d-flex justify-content-between">
                            <p className="card-text m-2">
                                {job.salary ? `Salary: ${job.salary}` : null}
                            </p>
                            <p className="card-text m-2">
                                {job.equity
                                    ? `Equity: ${job.equity}`
                                    : "Equity: 0"}
                            </p>
                            <p className="text-muted m-2">Applied</p>
                        </div>
                    </div>
                ) : (
                    <div className="card-body">
                        <p className="card-title m-2">
                            <b>{job.title ? job.title : null}</b>
                        </p>
                        <hr></hr>
                        <div className="d-flex justify-content-between">
                            <p className="card-text m-2">
                                {job.salary ? `Salary: ${job.salary}` : null}
                            </p>
                            <p className="card-text m-2">
                                {job.equity
                                    ? `Equity: ${job.equity}`
                                    : "Equity: 0"}
                            </p>
                            <button
                                onClick={handleClick}
                                className="btn btn-outline-dark m-2"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )
            ) : null}
        </div>
    );
}

export default Job;
