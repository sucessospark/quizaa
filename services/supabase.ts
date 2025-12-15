import { createClient } from '@supabase/supabase-js';
import { CrmPayload } from '../types';

// Credenciais diretas para garantir conexão
const SUPABASE_URL = 'https://lpbvfkmexorranvcxlrd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwYnZma21leG9ycmFudmN4bHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MzkyNjYsImV4cCI6MjA4MTQxNTI2Nn0.jLR8r9epPzofOGY5f2zZEZ9HCKt18t7qKLvHXI5r5A8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const saveResultToSupabase = async (payload: CrmPayload) => {
  console.log("Tentando salvar no Supabase...", payload);
  
  try {
    // Prepara o JSON das respostas.
    let answersData: any = payload.answers_json;
    try {
        if (typeof answersData === 'string') {
            answersData = JSON.parse(answersData);
        }
    } catch (e) {
        console.warn("Falha ao fazer parse do JSON das respostas, enviando como string", e);
        answersData = { raw: payload.answers_json };
    }

    // CORREÇÃO: Como a coluna 'classification' não existe no banco, 
    // salvamos essa informação dentro do JSON de respostas para não perder o dado.
    if (typeof answersData === 'object' && answersData !== null) {
        answersData = {
            ...answersData,
            _classification: payload.classification,
            _timestamp: payload.timestamp
        };
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: payload.contact?.name || 'Anônimo (Quiz)',
          phone: payload.contact?.phone || null,
          lead_score: payload.lead_score,
          // classification: payload.classification, // <--- REMOVIDO PARA EVITAR ERRO DE SCHEMA
          answers_json: answersData,
          user_agent: payload.device_info.userAgent
        }
      ])
      .select();

    if (error) {
      console.error('ERRO CRÍTICO SUPABASE:', error.message, error.details);
      return { success: false, error };
    }
    
    console.log('SUCESSO SUPABASE: Dados salvos ID:', data);
    return { success: true, data };

  } catch (err) {
    console.error('ERRO DE CONEXÃO SUPABASE:', err);
    return { success: false, error: err };
  }
};