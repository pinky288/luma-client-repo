import { createContext, useEffect, useState } from "react";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    updateProfile,
    signOut 
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

axios.defaults.withCredentials = true;

export const authcontext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyAtBapIumuTmAzoTPe4aM8JOlPzahlupHI",
    authDomain: "luma-a982a.firebaseapp.com",
    projectId: "luma-a982a",
    storageBucket: "luma-a982a.firebasestorage.app",
    messagingSenderId: "714475005766",
    appId: "1:714475005766:web:4c67f4d7d8300382f1e747"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    const createuser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginuser = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googlelogin = () => {
        setloading(true);
        return signInWithPopup(auth, googleprovider);
    };

    const updateuserprofile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    const logout = async () => {
        setloading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
            setuser(currentuser);
            
            if (currentuser) {
                const userinfo = {
                    name: currentuser?.displayName,
                    email: currentuser?.email,
                    image: currentuser?.photoURL,
                    role: 'student'
                };

                const loggedUser = { email: currentuser.email };

                try {
                    await axios.post('https://luma-server.vercel.app/users', userinfo);

                    await axios.post('https://luma-server.vercel.app/jwt', loggedUser);
                    
                    console.log('User synced and Token set in cookie');
                } catch (error) {
                    console.error('Auth sync error:', error);
                }
            } else {
                try {
                    await axios.post('https://luma-server.vercel.app/logout');
                    console.log('Logged out and cookie cleared');
                } catch (error) {
                    console.error('Logout error:', error);
                }
            }
            setloading(false);
        });
        return () => unsubscribe();
    }, []);

    const authinfo = { 
        user, 
        loading, 
        createuser, 
        loginuser, 
        googlelogin, 
        logout, 
        updateuserprofile 
    };

    return (
        <authcontext.Provider value={authinfo}>
            {children}
        </authcontext.Provider>
    );
};

export default AuthProvider;