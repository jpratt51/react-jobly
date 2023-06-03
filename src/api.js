import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        let { token } = JSON.parse(localStorage.getItem("user")) || "";

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getAllCompanies() {
        let res = await this.request(`companies`);
        return res.companies;
    }

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async findAllCompanies(name = "", minEmployees, maxEmployees) {
        let data;
        name === ""
            ? (data = { minEmployees, maxEmployees })
            : (data = { name, minEmployees, maxEmployees });
        let res = await this.request(data);
        return res.companies;
    }

    static async findAllJobs(title = "", minSalary = 0, hasEquity = false) {
        let data;
        title === ""
            ? (data = { minSalary, hasEquity })
            : (data = { title, minSalary, hasEquity });
        let res = await this.request("jobs", data);
        return res.jobs;
    }

    static async register(username, password, firstName, lastName, email) {
        let res = await this.request(
            `auth/register`,
            {
                username,
                password,
                firstName,
                lastName,
                email,
            },
            "post"
        );
        return res.token;
    }

    static async login(username, password) {
        let res = await this.request(
            `auth/token`,
            {
                username,
                password,
            },
            "post"
        );
        return res.token;
    }

    static async updateUser(password, firstName, lastName, email) {
        const user = JSON.parse(localStorage.getItem("user"));
        let data = {};
        if (password) data["password"] = password;
        if (firstName) data["firstName"] = firstName;
        if (lastName) data["lastName"] = lastName;
        if (email) data["email"] = email;
        let res = await this.request(`users/${user.username}`, data, "patch");
        return res;
    }

    static async getUserData() {
        const user = JSON.parse(localStorage.getItem("user"));
        let res = await this.request(`users/${user.username}`);
        return res;
    }

    static async apply(username, jobId) {
        let res = await this.request(
            `users/${username}/jobs/${jobId}`,
            null,
            "post"
        );
        return res;
    }

    // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
