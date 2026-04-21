import { createBrowserRouter } from "react-router";
import Login from "./features/auth/components/Login.jsx";
import Register from "./features/auth/components/Register.jsx"
import Protected from "../src/features/auth/pages/Protected.jsx"
export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Protected><h1>Home Page</h1></Protected>
    },
    {
        path:'/logout',
        element: <Login/>
    }
])