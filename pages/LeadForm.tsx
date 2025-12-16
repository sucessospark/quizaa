import React, { useState } from 'react';
import { Lock, ArrowRight, User, Phone, MessageSquareText } from 'lucide-react';
import { Button } from '../components/Button';
import { LeadData } from '../types';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length < 3 || phone.length < 8) {
      alert("Por favor, preencha seu nome e um WhatsApp válido para que a equipe possa entrar em contato.");
      return;
    }
    setLoading(true);
    // Simula pequeno delay para UX
    setTimeout(() => {
        onSubmit({ name, phone });
    }, 600);
  };

  // Máscara simples de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    
    if (val.length > 2) val = `(${val.slice(0,2)}) ${val.slice(2)}`;
    if (val.length > 9) val = `${val.slice(0,9)}-${val.slice(9)}`;
    
    setPhone(val);
  };

  return (
    <div className="min-h-screen bg-brand-charcoal py-12 px-4 flex items-center justify-center fade-in">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-brand-gold relative">
        
        {/* Header Visual */}
        <div className="bg-brand-black p-6 text-center border-b border-gray-800">
           <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/20 text-brand-gold mb-3">
              <MessageSquareText size={24} />
           </div>
           <h2 className="text-white font-serif text-xl">Análise Prévia Concluída</h2>
           <p className="text-brand-steel text-xs uppercase tracking-widest mt-1">Conectando com Equipe Jurídica</p>
        </div>

        <div className="p-8">
            <p className="text-gray-600 mb-6 text-sm leading-relaxed text-center">
               Para receber o relatório detalhado da sua triagem, informe seus dados abaixo. 
               <br/><br/>
               <span className="text-brand-charcoal font-bold">Nossa assistente virtual (Amanda) e nossa equipe jurídica</span> receberão seu caso imediatamente para análise técnica.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider ml-1">Nome Completo</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            placeholder="Como gostaria de ser chamado"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider ml-1">WhatsApp para Contato</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="tel" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            placeholder="(DDD) 99999-9999"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                </div>

                <Button 
                    type="submit" 
                    fullWidth 
                    className="mt-4 shadow-xl"
                    disabled={loading}
                >
                    {loading ? "Enviando para Amanda..." : "Falar com a Equipe"}
                    {!loading && <ArrowRight size={18} />}
                </Button>
            </form>
            
            <p className="mt-6 text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                <Lock size={10} /> Seus dados estão seguros e protegidos.
            </p>
        </div>
      </div>
    </div>
  );
};