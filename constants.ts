import { QuizQuestion } from './types';

// ==========================================
// 1. LINKS E VARIÁVEIS GERAIS (Centralizado)
// ==========================================
export const LINKS = {
  // WhatsApp Dr. Cintra (Alta Prioridade)
  whatsapp: "https://wa.me/5516991579493",
  // WhatsApp Equipe/Amanda (Média/Baixa Prioridade)
  whatsapp_team: "https://wa.me/5518981925450", 
  
  phone_raw: "5516991579493",
  instagram: "https://instagram.com/placidocintra.adv",
  linkedin: "https://linkedin.com/in/placidocintra",
  cv: "https://cnsq.org.br/escritorios/andre-ricardo-placido-cintra/", 
  site_url: "https://www.placidocintra.com",
  webhook_n8n: "https://SEU-N8N-URL-AQUI.com/webhook/quiz-entry"
};

export const COMPANY = {
  name: "Plácido Cintra Advocacia",
  attorney: "Dr. André Ricardo Plácido Cintra",
  oab_mg: "OAB/MG 161.704", 
  cnpj: "06.029.225/0001-57",
  email: "placidocintra@gmail.com",
  phone_display: "(16) 99157-9493",
  location_main: "Rua Ângela Rosa Scrabucci, 2876 | Franca/SP",
  location_branch: "Avenida Antônio Carlos, 920 | Sacramento/MG",
  location_fiscal: "Rodovia Claraval/Ibiraci, km 09 | Claraval/MG",
  google_reviews: "+50 Avaliações 5 Estrelas"
};

// ==========================================
// 2. CONTEÚDO: SEGURANÇA (Anti-Golpe)
// ==========================================
export const SECURITY_TIPS = [
  {
    title: "Verifique o Registro na OAB",
    text: "Todo advogado deve ter um número de inscrição ativo. Consulte no site do CNA (Cadastro Nacional de Advogados) usando o nome completo.",
    icon: "search"
  },
  {
    title: "Não pague boletos suspeitos",
    text: "Golpistas usam logotipos do Tribunal de Justiça para cobrar 'taxas de liberação' antecipadas via PIX. A justiça não manda zap pedindo PIX.",
    icon: "money"
  },
  {
    title: "Chamada de Vídeo",
    text: "Exija uma chamada de vídeo com o advogado antes de fechar contrato. Golpistas evitam mostrar o rosto ou o escritório.",
    icon: "video"
  }
];

// ==========================================
// 3. QUIZ E LÓGICA
// ==========================================
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que causou a sua lesão ou problema de saúde?",
    description: "Precisamos entender a origem para enquadrar o direito.",
    options: [
      { label: "Acidente de Trabalho (Máquinas, Queda, Trajeto)", value: "acidente_trabalho", score: 4 },
      { label: "Acidente de Trânsito ou de Qualquer Natureza", value: "acidente_transito", score: 3 },
      { label: "Doença Ocupacional (LER, DORT, Esforço Repetitivo)", value: "doenca_ocupacional", score: 2 },
      { label: "Doença Comum (Diabetes, Cardíaca, Degenerativa natural)", value: "doenca_comum", score: -2 },
    ]
  },
  {
    id: 2,
    question: "Qual foi a gravidade da intervenção médica?",
    description: "Identificando a materialidade da sequela.",
    options: [
      { label: "Tive que colocar pinos, placas ou fazer cirurgia", value: "cirurgia_pinos", score: 4 },
      { label: "Sofri amputação ou corte profundo com perda de movimento", value: "amputacao", score: 4 },
      { label: "Tive fratura ou lesão que exigiu gesso/imobilização", value: "fratura", score: 2 },
      { label: "Apenas dores e tratamento com remédios/fisioterapia", value: "apenas_dor", score: 0 },
    ]
  },
  {
    id: 3,
    question: "Você recebeu Auxílio-Doença (B31 ou B91) na época?",
    description: "O benefício por incapacidade temporária é um pré-requisito comum.",
    options: [
      { label: "Sim, recebi benefício do INSS (Fiquei afastado)", value: "sim_inss", score: 3 },
      { label: "A empresa pagou os 15 dias, mas não entrei no INSS", value: "afastado_curto", score: 1 },
      { label: "Não me afastei do trabalho", value: "nao_afastado", score: 0 },
    ]
  },
  {
    id: 4,
    question: "Como ficou sua capacidade de trabalho após a alta?",
    description: "A lei exige redução permanente da capacidade para a função habitual.",
    options: [
      { label: "Tenho sequela/limitação real (ex: perda de força, movimento ou audição)", value: "sequela_limitante", score: 4 },
      { label: "Consigo trabalhar, mas sinto dores constantes", value: "dores_leves", score: 1 },
      { label: "Estou 100% recuperado, igual antes do acidente", value: "recuperado", score: -10 },
    ]
  },
  {
    id: 5,
    question: "Qual sua situação atual no INSS?",
    options: [
      { label: "Estou trabalhando (ou desempregado) e não sou aposentado", value: "ativo", score: 2 },
      { label: "Já sou aposentado", value: "aposentado", score: -10 }, // Regra de inacumulabilidade
      { label: "Ainda estou recebendo Auxílio-Doença (afastado)", value: "em_beneficio", score: 0 }, // Ainda não consolidou
    ]
  }
];

export const RESULT_CONTENT = {
  low: {
    title: "Chance Baixa / Incompatível",
    description: "Pela análise preliminar, seu caso enfrenta barreiras técnicas (como ausência de sequela cirúrgica/funcional ou inacumulabilidade).",
    action: "Falar com Equipe de Triagem",
    subtext: "Converse com nossa equipe para entender os motivos.",
    priority_label: "PRIORIDADE BAIXA",
    color_class: "text-red-600 bg-red-50 border-red-200"
  },
  medium: {
    title: "Chance Média / Em Análise",
    description: "Identificamos indícios de direito, mas é necessário confirmar a documentação médica (Laudos, CAT, Prontuários).",
    action: "Falar com Assistente Amanda",
    subtext: "Análise de viabilidade necessária.",
    priority_label: "PRIORIDADE MÉDIA",
    color_class: "text-amber-600 bg-amber-50 border-amber-200"
  },
  high: {
    title: "ALTA COMPATIBILIDADE",
    description: "Seu relato é altamente compatível com a concessão do Auxílio-Acidente (Sequela + Afastamento).",
    action: "Falar com Dr. Plácido Cintra",
    subtext: "Prioridade Máxima: Seu caso será encaminhado diretamente ao advogado.",
    priority_label: "URGENTE: PRIORIDADE ALTA",
    color_class: "text-emerald-700 bg-emerald-50 border-emerald-200"
  }
};