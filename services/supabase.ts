import { createClient } from '@supabase/supabase-js';
import { CrmPayload } from '../types';

// Configuração Supabase com credenciais fornecidas
const SUPABASE_URL = 'https://lpbvfkmexorranvcxlrd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnZma21leG9ycmFudmN4bHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzkyNjYsImV4cCI6MjA4MTQxNTI2Nn0.jLR8r9epPzofOGY5f2zZEZ9HCKt18t7qKLvHXI5r5A8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const saveResultToSupabase = async (payload: CrmPayload) => {
  try {
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          name: payload.contact?.name || 'Anônimo',
          phone: payload.contact?.phone || null,
          lead_score: payload.lead_score,
          classification: payload.classification,
          // Convertemos a string JSON de volta para objeto para salvar no campo JSONB do Supabase
          answers_json: typeof payload.answers_json === 'string' ? JSON.parse(payload.answers_json) : payload.answers_json,
          user_agent: payload.device_info.userAgent
        }
      ]);

    if (error) {
      console.error('Erro Supabase:', error.message);
    }
  } catch (err) {
    console.error('Erro de conexão Supabase:', err);
  }
};