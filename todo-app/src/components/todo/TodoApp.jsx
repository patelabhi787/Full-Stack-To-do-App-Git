import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './TodoApp.css'
import HeaderComponent from './HeaderComponent';
import LogoutComponent from './LogoutComponent';
import LoginComponent from './LoginComponent';
import ErrorComponent from './ErrorComponent';
import ListTodoComponent from './ListTodoComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if (authContext.isAuthenticated)
        return children
    return <Navigate to="/" />
}

export default function TodoApp () {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/Login' element={<LoginComponent/>}/>
                    
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                            } 
                        />
                    
                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodoComponent/>
                            </AuthenticatedRoute>
                            } 
                        />

                        <Route path='/todo/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                            } 
                        />
                    
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                            } 
                        />
                    
                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
