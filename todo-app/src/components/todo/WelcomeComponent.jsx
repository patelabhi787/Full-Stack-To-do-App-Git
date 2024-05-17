import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retrieveHelloWorldBeanPathVariableApi } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent () {

    const {username} = useParams()
    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi() {

        retrieveHelloWorldBeanPathVariableApi(username, authContext.token)
            .then( (response) => successResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('clean up'))
    }

    function successResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos. <Link to="/todos">Click here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Load Hello World API</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    );
}

export default WelcomeComponent