import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

function LoginComponent () {

    const authContext = useAuth()

    const [username,setUsername] = useState('Abhi')
    const [password,setPassword] = useState('')
    const [showError,setErrorMessage] = useState(false)
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        } else {
            setErrorMessage(true)
        }
    }

    return (
        <div className="LoginComponent">
            <h1>Login</h1>
            {showError && <div className='errorMessage'>Authentication Failed. Please check your credentials</div>}
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent