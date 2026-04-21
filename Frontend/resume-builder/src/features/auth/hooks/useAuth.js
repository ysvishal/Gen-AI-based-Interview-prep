import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import {login, register, logout, getMe} from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({email, password}) => {
        try{
            setLoading(true)
            const data = await login({email, password});
            if (data && data.user) {
                const userData = data.user;
                setUser(userData)
            } else {
                console.error('No user data in response:', data)
            }
        }
        catch(err) {
            console.error('Login failed:', err)
            throw err
        }
        finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({username, email, password}) => {
        try {
            setLoading(true)
            const data = await register({username, email, password}) 
            console.log('Register response:', data);
            if (data && data.user) {
                const userData = data.user
                setUser(userData)
                console.log('Registration successful, user set:', userData);
            } else {
                console.error('No user data in response:', data)
            }
        }
        catch(err) {
            console.error('Registration failed:', err)
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true)
            const data = await logout();
            setUser(null)
        }
        catch(err) {
            console.error('Logout failed:', err)
            throw err
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try{
                console.log("useEffect working...");
                
                setLoading(true)
                const data = await getMe();
                console.log('getMe response:', data);
                console.log('getMe response status:', data);
                console.log('Full response object:', data);
                
                if (data && data.user) {
                    setUser(data.user)
                    console.log('User set successfully:', data.user);
                } else {
                    console.error('No user data in response:', data)
                }
                
            }
            catch(err) {
                console.error('getMe failed:', err)
                console.log('User will remain null - redirecting to login')
            }
            finally {
                setLoading(false)
            }
        }
        
        getAndSetUser()
    }, [])

    return {user, loading, handleLogin, handleLogout, handleRegister}
}
