import { createBrowserRouter } from "react-router";
import Login from "./features/auth/components/Login.jsx";
import Register from "./features/auth/components/Register.jsx"
import Protected from "../src/features/auth/pages/Protected.jsx"
import Home from "./features/auth/components/Home.jsx";
import InterviewGenerate from "./features/auth/pages/Interview.generate.jsx";
import InterviewResponse from "./features/auth/pages/Interview.response.jsx";
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
        element: <Protected><Home/></Protected>
    },
    {
        path:'/logout',
        element: <Login/>
    },
    {
        path: '/interview-response',
        element: <InterviewResponse/>
    }
])