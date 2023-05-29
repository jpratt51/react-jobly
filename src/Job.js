import React from "react";

function Job({ job }) {
    return (
        <div>
            <p>
                {job.title}, {job.salary}, {job.equity}
            </p>
        </div>
    );
}

export default Job;
