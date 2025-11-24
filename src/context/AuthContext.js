import React, {createContext,useState,useEffect} from "react";
import { getCurrentUser, getUserFromLocalStorage, isAuthenticated } from "../services/UserService";



export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn , setIsLoggedIn] = useState(false);

    useEffect(() =>{
        const initializeAuth = async () =>{
            try {
                const storedUser = getUserFromLocalStorage();

                if(storedUser && isAuthenticated()){
                    setUser(storedUser);
                    setIsLoading(true);

                    try {
                        const currentUser = await getCurrentUser();
                        setUser(currentUser);
                    } catch (error) {
                        console.warn('Could not fetch current user: ',error);
                    }
                }else{
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setUser(null);
                setIsLoggedIn(false);
            }finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);


//Todo: Giriş yap
const login = (userData,token) =>{
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('authToken',token);
    localStorage.setItem('user',JSON.stringify(userData));
};


//Todo: Çıkış yap

const logout = () =>{
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');    
};


//Todo: Profil güncelleme
const updateProfile = (updatedUser) =>{
    setUser(updatedUser);
    localStorage.setItem('user',JSON.stringify(updatedUser));
};

//Todo:Rol Güncelleme

const hasRole = (role) =>{
    return user && user.role === role;
}

//Todo: Admin kontrolü
const isAdmin = () =>{
    return user && user.role === 'admin';
}

//Todo:Author Kontrolü
const isAuthor = () =>{
    return user && user.role === 'author';
}



const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    updateProfile,
    hasRole,
    isAdmin,
    isAuthor
};

return(
    <AuthContext.Provider value ={value}>
        {children}
    </AuthContext.Provider>
);
}