import { LINKS } from '../constants';
import { UserResponses, ResultType, CrmPayload } from '../types';

export const sendToWebhook = async (data: {
  responses: UserResponses;
  result: ResultType;
  timestamp: string;
}) => {
  if (LINKS.webhook_n8n.includes("SEU-N8N")) {
    console.warn("Webhook URL não configurada em constants.ts");
    return;
  }

  // Preparar Payload para o CRM (Estrutura de Banco de Dados)
  const crmPayload: CrmPayload = {
    lead_source: 'site_auxilio_acidente',
    lead_score: Object.values(data.responses).reduce((a, b) => a + b, 0), // Soma total
    classification: data.result,
    answers_json: JSON.stringify(data.responses),
    timestamp: data.timestamp,
    device_info: {
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`
    }
  };

  try {
    const response = await fetch(LINKS.webhook_n8n, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crmPayload),
    });

    if (!response.ok) {
      console.error('Erro ao enviar dados para n8n:', response.statusText);
    }
  } catch (error) {
    console.error('Erro de conexão com n8n:', error);
  }
};