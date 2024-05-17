import { useEffect, useState } from "react";
import { retrieveAllTodosForUsernameApi, deleteTodoForIdApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodoComponent () {

    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    function refreshTodos(){
        retrieveAllTodosForUsernameApi(username)
            .then( response => setTodos(response.data) )
            .catch( error => console.log(error) )
    }

    useEffect( () => refreshTodos(), [])

    function deleteTodo(id) {
        deleteTodoForIdApi(username, id)
            .then (
                () => {
                    setMessage(`Succesfully deleted Todo with id = ${id}`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }

    function addNewTodo(id) {
        navigate(`/todo/-1`)
    }

    return (
        <div className='container'>
            <h1>Things that you want to do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>        
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* <td>{todo.targetDate.toDateString()}</td> */}
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-success" onClick={ () => updateTodo(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={ () => deleteTodo(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    );
}

export default ListTodoComponent