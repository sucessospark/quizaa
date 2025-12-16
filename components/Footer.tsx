import React from 'react';
import { COMPANY, LINKS } from '../constants';
import { ShieldCheck, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black text-gray-400 py-12 md:py-16 mt-auto border-t-4 border-brand-gold">
      <div className="container mx-auto px-4">
        
        {/* Grid ajustado para mobile (1 coluna) e desktop (3 colunas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <h3 className="text-brand-gold font-serif text-xl mb-6">{COMPANY.name}</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-300">
              Escritório de advocacia registrado com sólida atuação em Direito Previdenciário. 
              Combatemos a desinformação com técnica jurídica e transparência absoluta.
            </p>
            <div className="flex items-center gap-2 text-brand-gold text-sm font-bold border border-brand-gold/30 p-2 inline-block rounded-sm">
              <ShieldCheck size={16} />
              <span>{COMPANY.google_reviews}</span>
            </div>

            {/* ATENDIMENTO ONLINE SECTION */}
            <div className="mt-8 p-4 bg-brand-charcoal border border-gray-700 rounded-sm w-full md:w-auto">
                <p className="text-xs text-brand-white uppercase tracking-widest mb-3 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Atendimento Online
                </p>
                <Button 
                    variant="secondary" 
                    fullWidth 
                    className="text-xs py-3 border-brand-gold/50 text-brand-gold hover:text-brand-black hover:bg-brand-gold"
                    onClick={() => window.open(LINKS.whatsapp_team, '_blank')}
                >
                    <MessageCircle size={16} />
                    Falar com a Equipe Agora
                </Button>
            </div>
          </div>

          {/* Contact & Registration */}
          <div className="text-sm space-y-4">
            <h4 className="text-brand-white font-serif text-lg mb-4">Registro & Contato</h4>
            
            <div className="space-y-2">
              <p><strong className="text-brand-steel">CNPJ:</strong> {COMPANY.cnpj}</p>
              <p><strong className="text-brand-steel">OAB/MG:</strong> 161.704</p>
            </div>

            <div className="pt-4 space-y-2 border-t border-gray-800">
              <p className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                <Phone size={14} /> {COMPANY.phone_display}
              </p>
              <p className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                <Mail size={14} /> {COMPANY.email}
              </p>
            </div>
          </div>

          {/* Addresses */}
          <div className="text-sm">
             <h4 className="text-brand-white font-serif text-lg mb-4">Endereços</h4>
             <ul className="space-y-4">
               <li className="flex gap-3">
                 <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                 <div>
                   <strong className="block text-brand-white">Sede Franca/SP</strong>
                   <span className="text-xs">{COMPANY.location_main}</span>
                 </div>
               </li>
               <li className="flex gap-3">
                 <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                 <div>
                   <strong className="block text-brand-white">Filial Sacramento/MG</strong>
                   <span className="text-xs">{COMPANY.location_branch}</span>
                 </div>
               </li>
               {/* Endereço Fiscal removido conforme solicitado */}
             </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-brand-charcoal p-6 rounded-sm mb-8 text-xs leading-relaxed text-gray-400 border border-gray-800">
          <p className="mb-2"><strong>Aviso Legal:</strong> Este site tem caráter informativo e educacional, não configurando consultoria jurídica ou promessa de resultado. A análise realizada pelo simulador é baseada em critérios objetivos da Lei 8.213/91, mas cada caso depende de perícia médica e análise documental detalhada.</p>
          <p>Não solicitamos pagamentos antecipados via WhatsApp para liberação de benefícios.</p>
        </div>

        <div className="border-t border-gray-800 pt-8 text-xs text-center flex flex-col md:flex-row justify-between items-center text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.</p>
          <p className="font-serif italic text-brand-steel">"A justiça é a constância e perpétua vontade de dar a cada um o que é seu."</p>
        </div>
      </div>
    </footer>
  );
};