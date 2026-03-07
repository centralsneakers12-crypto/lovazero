
CREATE TABLE public.trial_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_whatsapp TEXT NOT NULL,
  fingerprint TEXT,
  ip TEXT,
  generated_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trial_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON public.trial_keys FOR SELECT USING (true);
CREATE POLICY "Allow insert from service role" ON public.trial_keys FOR INSERT WITH CHECK (true);
