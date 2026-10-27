-- Daily Tracker Phase 1 Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nama VARCHAR(80),
    jenis_kelamin VARCHAR(10) CHECK (jenis_kelamin IN ('male', 'female')),
    tanggal_lahir DATE,
    tinggi_cm NUMERIC(5,2) CHECK (tinggi_cm BETWEEN 100 AND 250),
    activity_level VARCHAR(10) CHECK (activity_level IN ('low', 'medium', 'high')),
    goal_type VARCHAR(10) CHECK (goal_type IN ('lose', 'maintain', 'gain')),
    target_weight_kg NUMERIC(5,2) CHECK (target_weight_kg BETWEEN 20 AND 300),
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. MET Values Config Table
CREATE TABLE IF NOT EXISTS public.met_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(20) NOT NULL CHECK (category IN ('gym', 'running', 'home_workout')),
    intensity VARCHAR(10) NOT NULL CHECK (intensity IN ('light', 'medium', 'heavy')),
    met NUMERIC(4,2) NOT NULL CHECK (met > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT met_values_category_intensity_key UNIQUE (category, intensity)
);

-- 3. Exercise Logs Table
CREATE TABLE IF NOT EXISTS public.exercise_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('gym', 'running', 'home_workout')),
    title VARCHAR(120) NOT NULL,
    duration_min INTEGER NOT NULL CHECK (duration_min BETWEEN 1 AND 300),
    intensity VARCHAR(10) NOT NULL CHECK (intensity IN ('light', 'medium', 'heavy')),
    status VARCHAR(10) NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'done')),
    calories_burned INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Todos Table
CREATE TABLE IF NOT EXISTS public.todos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    title VARCHAR(120) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('exercise', 'general')),
    category VARCHAR(20) CHECK (category IN ('gym', 'running', 'home_workout')),
    status VARCHAR(10) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'done')),
    completed_by VARCHAR(10) CHECK (completed_by IN ('manual', 'auto')),
    completed_at TIMESTAMPTZ,
    exercise_log_id UUID REFERENCES public.exercise_logs(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Weight Logs Table
CREATE TABLE IF NOT EXISTS public.weight_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight_kg NUMERIC(5,2) NOT NULL CHECK (weight_kg BETWEEN 20 AND 300),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT weight_logs_user_date_key UNIQUE (user_id, date)
);

-- 6. Daily Summaries Table
CREATE TABLE IF NOT EXISTS public.daily_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    target_kcal INTEGER NOT NULL DEFAULT 0,
    burned_kcal INTEGER NOT NULL DEFAULT 0,
    consumed_kcal INTEGER NOT NULL DEFAULT 0,
    remaining_kcal INTEGER NOT NULL DEFAULT 0,
    todos_done INTEGER NOT NULL DEFAULT 0,
    todos_total INTEGER NOT NULL DEFAULT 0,
    exercise_minutes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT daily_summaries_user_date_key UNIQUE (user_id, date)
);

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_met_values_updated_at BEFORE UPDATE ON public.met_values FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercise_logs_updated_at BEFORE UPDATE ON public.exercise_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON public.todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weight_logs_updated_at BEFORE UPDATE ON public.weight_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_summaries_updated_at BEFORE UPDATE ON public.daily_summaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.met_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_summaries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- met_values (Read only for authenticated users)
CREATE POLICY "Authenticated users can read MET values" ON public.met_values FOR SELECT TO authenticated USING (true);

-- Exercise Logs
CREATE POLICY "Users can view own exercise logs" ON public.exercise_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exercise logs" ON public.exercise_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own exercise logs" ON public.exercise_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own exercise logs" ON public.exercise_logs FOR DELETE USING (auth.uid() = user_id);

-- Todos
CREATE POLICY "Users can view own todos" ON public.todos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own todos" ON public.todos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own todos" ON public.todos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own todos" ON public.todos FOR DELETE USING (auth.uid() = user_id);

-- Weight Logs
CREATE POLICY "Users can view own weight logs" ON public.weight_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own weight logs" ON public.weight_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own weight logs" ON public.weight_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own weight logs" ON public.weight_logs FOR DELETE USING (auth.uid() = user_id);

-- Daily Summaries
CREATE POLICY "Users can view own daily summaries" ON public.daily_summaries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily summaries" ON public.daily_summaries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily summaries" ON public.daily_summaries FOR UPDATE USING (auth.uid() = user_id);
