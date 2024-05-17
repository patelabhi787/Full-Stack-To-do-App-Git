import { apiClient } from "./ApiClient"

// export function retrieveHelloWorldBeanApi() {
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

// can also be written as a lambda function. 
export const retrieveHelloWorldBeanPathVariableApi 
     = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`)
