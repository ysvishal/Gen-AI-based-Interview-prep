import { createBrowserRouter } from "react-router"; // or "react-router-dom"
import Login from "./features/auth/components/Login.jsx";
import Register from "./features/auth/components/Register.jsx"
import Protected from "../src/features/auth/pages/Protected.jsx"
import Home from "./features/auth/components/Home.jsx";
import InterviewGenerate from "./features/auth/pages/Interview.generate.jsx";
import InterviewResponse from "./features/auth/pages/Interview.response.jsx";
import Layout from "./features/auth/pages/Layout.jsx";

export const router = createBrowserRouter([
    // --- Public Routes (No NavBars) ---
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path:'/logout',
        element: <Login/> 
    },

    // --- Protected App Routes (With NavBars) ---
    {
        // 1. The Layout is the parent element
        // Wrapping it in <Protected> means unauthorized users can't even see the NavBars
        element: <Layout/>, 
        
        // 2. These children will render INSIDE the <Outlet /> of your Layout.jsx
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/interview-response',
                element: <InterviewResponse/>
            },
            
        ]
    }
]);