import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Protected = ({children}) => {
    const {loading, user} = useAuth();
    
    // Show loading while authentication check is in progress
    if(loading) {
        return(<main><h1>Loading....</h1></main>)
    }
    
    console.log('Protected - user:', user)
    
    // Only redirect to login if we're sure there's no user
    if(!user) {
        return (
        <Navigate to={'/login'} />
    )
    }
    
    return (
        children
    )
}

export default Protected