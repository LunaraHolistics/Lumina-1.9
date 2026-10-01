
-- Habilita extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABELA DE PERFIS (Profiles)
-- Sincronizada com a tabela interna auth.users via Trigger (opcional) ou criação manual
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  access_level TEXT DEFAULT 'trial' CHECK (access_level IN ('trial', 'premium', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilita RLS para Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso (Profiles)
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- TABELA DE LEITURAS (Readings)
CREATE TABLE IF NOT EXISTS public.readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  spread_type TEXT NOT NULL, -- 'mesa-real', 'relogio', 'mesa-9', etc
  board_state JSONB NOT NULL, -- Array de 36 IDs ou estrutura similar
  ai_analysis TEXT,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilita RLS para Readings
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso (Readings)
CREATE POLICY "Users can view own readings" ON public.readings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own readings" ON public.readings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own readings" ON public.readings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own readings" ON public.readings
  FOR DELETE USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_readings_user_id ON public.readings(user_id);
CREATE INDEX IF NOT EXISTS idx_readings_created_at ON public.readings(created_at);
