import { React, useContext } from "react";
import UserContext from "../UserContext";

function Home() {
    const { user } = useContext(UserContext);
    const welcomeUser = <h1>Welcome back, {user.username}!</h1>;

    return (
        <div>
            <h1>Jobly</h1>
            <h2>All the jobs in one, convenient place.</h2>
            {user ? welcomeUser : null}
        </div>
    );
}

export default Home;
