import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, isAdmin: false, loading: true });

export const useAuth = () => useContext(AuthContext);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check if user is admin in Firestore or has the default admin email
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const isDefaultAdmin = currentUser.email === 'labradarenz@gmail.com';
        
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else if (isDefaultAdmin) {
          setIsAdmin(true);
          // Provision the user doc if it doesn't exist
          if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', currentUser.uid), {
              email: currentUser.email,
              role: 'admin',
              uid: currentUser.uid
            });
          }
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
