'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, firestore, firebaseInitialized } from '@/lib/firebase';
import type { User as AppUser } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  firebaseInitialized: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string, name: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fetches user role from Firestore
const getUserProfile = async (firebaseUser: FirebaseUser): Promise<AppUser | null> => {
  if (!firebaseInitialized) return null;
  const userDocRef = doc(firestore, 'users', firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data() as AppUser;
  }
  // This case might happen if a user is created in Auth but not in Firestore.
  // We can create it here or handle it as an error.
  console.warn("No user document found in Firestore for UID:", firebaseUser.uid);
  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseInitialized) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser);
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    if (!firebaseInitialized) return Promise.reject(new Error('Firebase is not configured.'));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    if (!firebaseInitialized) return Promise.reject(new Error('Firebase is not configured.'));
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    await updateProfile(firebaseUser, { displayName: name });

    // Create a user document in Firestore
    const userDocRef = doc(firestore, 'users', firebaseUser.uid);
    const newUser: AppUser = {
      id: firebaseUser.uid,
      name: name,
      email: email,
      role: 'Customer', // Default role for new signups
      dateJoined: new Date().toISOString(),
    };
    
    await setDoc(userDocRef, newUser);

    setUser(newUser);
    return userCredential;
  };

  const logout = async () => {
    if (!firebaseInitialized) return Promise.reject(new Error('Firebase is not configured.'));
    await signOut(auth);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, firebaseInitialized, login, signup, logout }}>
      {!loading && children}
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
