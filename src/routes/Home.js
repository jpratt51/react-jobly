import { React, useContext } from "react";
import UserContext from "../UserContext";
import "../Home.css";

function Home() {
    const { user } = useContext(UserContext);
    const welcomeUser = <h1>Welcome back, {user.username}!</h1>;

    return (
        <div className="card w-50 mx-auto welcome-card">
            <div className="card-body">
                <h1 className="card-title">Jobly</h1>
                <h2 className="card-text">
                    All the jobs in one, convenient place.
                </h2>
                {user ? welcomeUser : null}
            </div>
        </div>
    );
}

export default Home;
