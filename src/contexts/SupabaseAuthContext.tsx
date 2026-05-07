import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authReady: boolean;
  error: string | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!isMounted) return;
        if (sessionError) throw sessionError;

        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!isMounted) return;
        setLoading(false);
        setAuthReady(true);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchProfile(currentUser.id).catch((err) => {
          if (isMounted) setError(err instanceof Error ? err.message : String(err));
        });
      } else {
        setProfile(null);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const fetchProfile = async (id: string) => {
    try {
      const { data, error: profileError } = await supabase
        .from<Profile>('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setProfile(null);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, authReady, error, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
