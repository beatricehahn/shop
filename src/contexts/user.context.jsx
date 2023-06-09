import { createContext, useState, useEffect } from 'react';

import { 
    onAuthStateChangedListener,
    createUserDocFromAuth
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe; // return whenever function unmounts
    }, []);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
};
