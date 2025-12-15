import React from 'react';
import { ArrowRight, Scale, CheckCircle, ExternalLink, Search, ShieldAlert, FileText, Video, Eye, FileSignature, Percent } from 'lucide-react';
import { Button } from '../components/Button';
import { COMPANY, LINKS, SECURITY_TIPS } from '../constants';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartQuiz }) => {
  
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'search': return <Search size={24} />;
      case 'money': return <ShieldAlert size={24} />;
      case 'video': return <Video size={24} />;
      default: return <CheckCircle size={24} />;
    }
  };

  return (
    <div className="fade-in bg-transparent"> {/* BG transparent because grain is on body */}
      
      {/* HERO SECTION */}
      <section className="bg-brand-black text-brand-white relative overflow-hidden min-h-[90vh] flex items-center border-b-4 border-brand-gold">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-brand-charcoal to-brand-steel/20 opacity-90 z-0"></div>
        
        <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col md:flex-row items-center">
          
          {/* Text Content */}
          <div className="md:w-3/5 lg:w-1/2 md:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/50 text-brand-gold text-[10px] uppercase tracking-[0.2em] mb-6 bg-black/40 backdrop-blur-sm">
              <Scale size={12} />
              <span>Direito Acidentário Especializado</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-[1.1] text-brand-white">
              Justiça para quem <br/>
              <span className="text-brand-gold italic">trabalhou e sofreu.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-xl border-l-2 border-brand-steel pl-6">
              O Auxílio-Acidente não é favor, é lei. Se você ficou com sequelas (pinos, placas, perda de movimento) após um acidente, descubra se tem direito à indenização.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button onClick={onStartQuiz} className="text-base px-10 py-5 shadow-brand-gold/20">
                Iniciar Análise Confidencial
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 font-sans uppercase tracking-wider">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-brand-steel border-2 border-brand-black flex items-center justify-center text-white text-[9px] font-bold">
                       {i === 3 ? '+' : ''}
                    </div>
                  ))}
               </div>
               <p>Triagem baseada na Lei 8.213/91</p>
            </div>
          </div>

          {/* Image Section - Portrait Style with CV Link */}
          <div className="md:w-2/5 lg:w-1/2 mt-12 md:mt-0 relative flex flex-col items-center">
             <div className="relative w-[350px] md:w-[450px] aspect-[3/4] mb-6">
                {/* Gold Frame Effect */}
                <div className="absolute inset-0 border-2 border-brand-gold translate-x-4 translate-y-4 z-0"></div>
                
                {/* Image Container */}
                <div className="absolute inset-0 bg-brand-charcoal overflow-hidden shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group">
                    <img 
                        src="/placido.jpg.jpg" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800';
                        }}
                        alt="Dr. Plácido Cintra" 
                        className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Name Tag */}
                    <div className="absolute bottom-0 left-0 w-full p-8 text-center md:text-left bg-gradient-to-t from-black via-black/50 to-transparent">
                        <p className="font-serif text-2xl text-brand-white">{COMPANY.attorney}</p>
                        <p className="text-xs text-brand-gold uppercase tracking-[0.2em] mt-1">Advogado Responsável Fundador • {COMPANY.oab_mg}</p>
                    </div>
                </div>
             </div>

             {/* CV Link - NOVO */}
             <a 
                href={LINKS.cv} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-steel text-sm font-bold uppercase tracking-wider hover:text-brand-gold transition-colors border-b border-transparent hover:border-brand-gold pb-1"
             >
                <FileText size={16} />
                Visualizar Currículo & Habilitações
             </a>
          </div>
        </div>
      </section>

      {/* TRANSPARÊNCIA RADICAL SECTION */}
      <section className="py-24 bg-brand-white text-brand-charcoal relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-black">Transparência Radical</h2>
             <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
             <p className="text-gray-600 text-lg leading-relaxed">
               Acreditamos que a confiança se constrói com clareza absoluta. 
               Você saberá exatamente como trabalhamos antes de assinar qualquer documento.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Card 1: Honorários */}
             <div className="bg-gray-50 p-8 border-l-4 border-brand-gold hover:shadow-lg transition-all duration-300 rounded-r-sm group">
                <div className="mb-6 bg-brand-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-colors">
                  <Percent size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-brand-black">Honorários de Êxito</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Trabalhamos no modelo <em>"Ad Exitum"</em>. Isso significa que você não paga nada para iniciar. Nossos honorários são cobrados apenas no final, como uma porcentagem do valor que você receber, <strong>se e quando</strong> ganharmos o processo.
                </p>
             </div>

             {/* Card 2: Contrato Digital */}
             <div className="bg-gray-50 p-8 border-l-4 border-brand-charcoal hover:shadow-lg transition-all duration-300 rounded-r-sm group">
                <div className="mb-6 bg-brand-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-colors">
                  <FileSignature size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-brand-black">Tudo no Papel</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Sem acordos de boca. Você receberá um contrato de prestação de serviços formal, assinado digitalmente com validade jurídica, detalhando todas as obrigações do escritório e as taxas combinadas.
                </p>
             </div>

             {/* Card 3: Acompanhamento */}
             <div className="bg-gray-50 p-8 border-l-4 border-brand-steel hover:shadow-lg transition-all duration-300 rounded-r-sm group">
                <div className="mb-6 bg-brand-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm text-brand-steel group-hover:bg-brand-steel group-hover:text-white transition-colors">
                  <Eye size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-brand-black">Monitoramento Ativo</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Você não ficará no escuro. Diferente de escritórios tradicionais que somem, nós enviamos atualizações proativas sobre o andamento do seu pedido diretamente no seu WhatsApp.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* SEGURANÇA / ANTI-GOLPE SECTION - NOVO */}
      <section className="py-20 bg-brand-charcoal text-white relative border-b border-gray-800">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                  <div className="text-brand-gold mb-2">
                    <ShieldAlert size={40} />
                  </div>
                  <h2 className="text-3xl font-serif text-brand-white mb-4">Proteja-se de Golpes</h2>
                  <p className="text-gray-400">
                    O mercado jurídico infelizmente atrai fraudadores. Saiba diferenciar um escritório sério de golpistas digitais.
                  </p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {SECURITY_TIPS.map((tip, idx) => (
                    <div key={idx} className="bg-white/5 p-6 border border-white/10 hover:border-brand-gold/50 transition-colors rounded-sm">
                       <div className="text-brand-steel mb-3">
                         {getIcon(tip.icon)}
                       </div>
                       <h3 className="font-bold text-lg mb-2 text-brand-white">{tip.title}</h3>
                       <p className="text-xs text-gray-400 leading-relaxed">{tip.text}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="py-20 bg-brand-charcoal text-white relative">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif text-brand-white mb-6">Não é sorte. É técnica.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    O INSS indefere milhares de pedidos todos os dias por falta de prova técnica. 
                    O Auxílio-Acidente não depende apenas de ter sofrido um acidente, mas de comprovar o 
                    <strong> Nexo Causal</strong> e a <strong>Redução da Capacidade</strong>.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Nossa triagem utiliza os mesmos critérios das perícias judiciais para filtrar casos viáveis. 
                    Se você teve fratura exposta, colocou pino, placa ou tem limitação de movimento, seu caso merece análise.
                </p>
            </div>
            <div className="md:w-1/2 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
                <div className="border border-gray-700 p-8 bg-brand-black/50 backdrop-blur-md relative z-10">
                    <h4 className="font-serif text-xl text-brand-gold mb-4">O que analisamos:</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-brand-steel mt-1 shrink-0" size={18} />
                            <span className="text-gray-300 text-sm">Sequelas definitivas (Pinos, Placas, Limitações).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-brand-steel mt-1 shrink-0" size={18} />
                            <span className="text-gray-300 text-sm">Vínculo com o INSS na época do acidente.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-brand-steel mt-1 shrink-0" size={18} />
                            <span className="text-gray-300 text-sm">Documentação médica (CAT, Prontuários).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="text-brand-steel mt-1 shrink-0" size={18} />
                            <span className="text-gray-300 text-sm">Impacto na profissão habitual exercida.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-brand-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-black mb-8">Descubra sua chance real</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Sem promessas vazias. Apenas análise jurídica séria baseada em fatos.
          </p>
          <Button onClick={onStartQuiz} className="w-full md:w-auto text-lg px-12 py-5 shadow-2xl mx-auto">
            INICIAR TRIAGEM TÉCNICA
          </Button>
          <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
             Tempo estimado: 2 minutos • 100% Online
          </p>
        </div>
      </section>
    </div>
  );
};
