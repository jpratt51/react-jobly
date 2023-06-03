import { React, useContext } from "react";
import JoblyApi from "./api.js";
import UserContext from "./UserContext";

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
        <div>
            {user.jobs && job.id ? (
                user.jobs.indexOf(job.id) !== -1 ? (
                    <div>
                        <p>
                            {job.title ? job.title : null},
                            {job.salary ? job.salary : null},
                            {job.equity ? job.equity : null}
                        </p>
                        <p>Applied</p>
                    </div>
                ) : (
                    <div>
                        <p>
                            {job.title ? job.title : null},
                            {job.salary ? job.salary : null},
                            {job.equity ? job.equity : null}
                        </p>
                        <button onClick={handleClick}>Apply</button>
                    </div>
                )
            ) : null}
        </div>
    );
}

export default Job;
