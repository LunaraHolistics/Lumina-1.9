
import { createClient } from '@supabase/supabase-js';

// Configuração de ambiente para acesso ao Supabase
// Se as chaves não estiverem presentes, o cliente não será inicializado
// e o app deve usar fallback para localStorage (implementado nos hooks).

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Tipagem para as tabelas do banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          access_level: string; // 'trial', 'premium', 'admin'
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          access_level?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          access_level?: string;
          created_at?: string;
        };
      };
      readings: {
        Row: {
          id: string;
          user_id: string;
          spread_type: string;
          board_state: any; // JSONB
          ai_analysis: string | null;
          notes: string | null;
          is_favorite: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          spread_type: string;
          board_state: any;
          ai_analysis?: string | null;
          notes?: string | null;
          is_favorite?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          spread_type?: string;
          board_state?: any;
          ai_analysis?: string | null;
          notes?: string | null;
          is_favorite?: boolean;
          created_at?: string;
        };
      };
    };
  };
};
