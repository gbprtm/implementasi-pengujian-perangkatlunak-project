-- Seed MET Values according to PRD Section 9.2
INSERT INTO public.met_values (category, intensity, met) VALUES
    ('gym', 'light', 3.5),
    ('gym', 'medium', 5.0),
    ('gym', 'heavy', 6.0),
    ('running', 'light', 7.0),
    ('running', 'medium', 9.8),
    ('running', 'heavy', 11.8),
    ('home_workout', 'light', 3.0),
    ('home_workout', 'medium', 3.8),
    ('home_workout', 'heavy', 5.5)
ON CONFLICT (category, intensity) DO UPDATE SET met = EXCLUDED.met;
