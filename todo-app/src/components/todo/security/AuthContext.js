import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJWTAuthenticationService } from "../api/AuthenticationApiService";

// Create a context and export it so that it is accessible to other components
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

// share the context with other components, children is all the components under AuthProvider
export default function AuthProvider({ children }) {

    // put some state in the context
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // For basic authentication service:
    // async function login(username, password) {
    //     const token = "Basic " + window.btoa(username+":"+password)
        
    //     try {
    //         const response = await executeBasicAuthenticationService(token)
    //         if (response.status===200) {
    //             setIsAuthenticated(true)
    //             setUsername(username)
    //             setToken(token)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log("intercepting apiClient and adding token")
    //                     config.headers.Authorization=token
    //                     return config
    //                 }
    //             )

    //             return true
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch(error) {
    //         logout()
    //         return false
    //     }
    // }
    
    // for JWT authentication service:
    async function login(username, password) {
        
        try {
            const response = await executeJWTAuthenticationService(username,password)

            if (response.status===200) {
                const jwtToken = "Bearer " + response.data.token
                setIsAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("intercepting apiClient and adding token")
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )

                return true
            } else {
                logout()
                return false
            }
        } catch(error) {
            logout()
            return false
        }
    }

    function logout() {
        setIsAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }>
            {children}
        </AuthContext.Provider>
    );
}