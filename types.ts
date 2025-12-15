export enum ViewState {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  LEAD_FORM = 'LEAD_FORM', // Novo estado
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

export interface LeadData {
  name: string;
  phone: string;
}

// =====================================
// CRM / DATABASE SCHEMA DEFINITION
// =====================================
export interface CrmPayload {
  lead_source: string; 
  lead_score: number;
  classification: ResultType; 
  answers_json: string; 
  timestamp: string;
  device_info: {
    userAgent: string;
    screen: string;
  };
  contact?: {
    name?: string;
    phone?: string;
  }
}