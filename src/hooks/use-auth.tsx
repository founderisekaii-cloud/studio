'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A placeholder for fetching user role from your backend/database
const getUserRole = async (firebaseUser: User): Promise<AppUser['role']> => {
  // In a real application, you would fetch this from your database
  // For example, from a 'users' collection in Firestore
  // For this example, we'll default to 'Customer' and make the first user an 'Admin'
  if (firebaseUser.email === 'admin@shivay.com') {
      return 'Admin';
  }
  return 'Customer';
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const role = await getUserRole(firebaseUser);
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          role: role,
          dateJoined: firebaseUser.metadata.creationTime || new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    // You might want to create a user document in your database here
    // with the default role
    
    // Re-fetch user to update the context
    const role = await getUserRole(userCredential.user);
    setUser({
        id: userCredential.user.uid,
        name: name,
        email: email,
        role: role,
        dateJoined: userCredential.user.metadata.creationTime || new Date().toISOString(),
    });
    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
