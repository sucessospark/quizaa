export enum ViewState {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT'
}

export enum ResultType {
  LOW = 'LOW', // Chance Baixa
  MEDIUM = 'MEDIUM', // Chance Média
  HIGH = 'HIGH' // Boa Chance
}

export interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  options: {
    label: string;
    value: string;
    score: number; // Used for simple heuristic scoring
  }[];
}

export interface UserResponses {
  [questionId: number]: number; // Maps Question ID to Score
}

// =====================================
// CRM / DATABASE SCHEMA DEFINITION
// =====================================
// Esta é a estrutura que o N8N receberá para salvar no Banco de Dados
export interface CrmPayload {
  lead_source: string; // 'site_quiz'
  lead_score: number;
  classification: ResultType; // 'HIGH', 'MEDIUM', 'LOW'
  answers_json: string; // As respostas do usuário
  timestamp: string;
  device_info: {
    userAgent: string;
    screen: string;
  };
  // Campos opcionais para futuro (se capturar lead form)
  contact?: {
    name?: string;
    phone?: string;
  }
}