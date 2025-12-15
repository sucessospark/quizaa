import { LINKS } from '../constants';
import { CrmPayload } from '../types';

export const sendToWebhook = async (payload: CrmPayload) => {
  // Verifica se a URL do N8N está configurada corretamente
  if (!LINKS.webhook_n8n || LINKS.webhook_n8n.includes("SEU-N8N")) {
    console.warn("Webhook N8N não configurado ou inválido em constants.ts. Dados não enviados para n8n.");
    return;
  }

  console.log("Enviando evento para n8n...", payload);

  try {
    const response = await fetch(LINKS.webhook_n8n, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: "quiz_completed",
        data: payload
      }),
    });

    if (!response.ok) {
      console.error(`Erro N8N: ${response.status} - ${response.statusText}`);
    } else {
      console.log("Evento enviado para N8N com sucesso!");
    }
  } catch (error) {
    console.error('Erro de conexão com N8N:', error);
  }
};