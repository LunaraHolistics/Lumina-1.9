
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  access_level: 'trial' | 'premium' | 'admin';
}

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-default',
    email: 'usuario@lumina.app',
    full_name: 'Estudante Lumina',
    avatar_url: null,
    access_level: 'premium'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Modo com acesso livre e desbloqueado permanente
    const localName = localStorage.getItem('lumina_user_name');
    const localPhoto = localStorage.getItem('lumina_user_photo');
    if (localName || localPhoto) {
      setUser({
        id: 'user-default',
        email: 'usuario@lumina.app',
        full_name: localName || 'Estudante Lumina',
        avatar_url: localPhoto || null,
        access_level: 'premium'
      });
    }
  }, []);

  const signInWithGoogle = async () => {
    // Autenticação desativada - acesso liberado diretamente
  };

  const signOut = async () => {
    // Acesso livre mantido
  };

  return { user, loading, signInWithGoogle, signOut };
};
