import React from 'react';
import { ArrowRight, Scale, CheckCircle, ExternalLink, Search, ShieldAlert, FileText, Video, Eye, FileSignature, Percent, Building2, Gavel, Award } from 'lucide-react';
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
    <div className="fade-in bg-transparent w-full overflow-x-hidden"> {/* Prevent horizontal scroll */}
      
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="bg-brand-black text-brand-white relative min-h-[85vh] flex items-center border-b-4 border-brand-gold">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-brand-charcoal to-brand-steel/10 opacity-90 z-0"></div>
        
        {/* Mobile Background Image Hint */}
        <div className="absolute inset-0 bg-[url('/placido.jpg')] bg-cover bg-center opacity-10 md:hidden z-0 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="w-full md:w-3/5 lg:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/50 text-brand-gold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 bg-black/40 backdrop-blur-sm rounded-sm">
              <Scale size={12} />
              <span>Direito Acidentário & Previdenciário</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-brand-white">
              Sua sequela tem <br/>
              <span className="text-brand-gold italic">valor de indenização.</span>
            </h1>
            
            <p className="text-base md:text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-xl mx-auto md:mx-0 border-l-0 md:border-l-2 border-brand-steel md:pl-6">
              Escritório especializado na concessão de Auxílio-Acidente. Se você sofreu acidente de trabalho, trânsito ou lazer e ficou com limitações, a lei garante seus direitos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
              <Button onClick={onStartQuiz} className="text-base px-8 py-4 md:px-10 md:py-5 shadow-brand-gold/20 w-full sm:w-auto">
                Iniciar Análise Gratuita
                <ArrowRight size={18} />
              </Button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-xs text-gray-500 font-sans uppercase tracking-wider">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-brand-steel border-2 border-brand-black flex items-center justify-center text-white text-[9px] font-bold">
                       {i === 3 ? '+' : ''}
                    </div>
                  ))}
               </div>
               <p>Atuação em todo o Brasil (Processos 100% Digitais)</p>
            </div>
          </div>

          {/* Image Section - Desktop Only for Layout Balance */}
          <div className="hidden md:flex md:w-2/5 lg:w-1/2 justify-center relative">
             <div className="relative w-[300px] lg:w-[400px] aspect-[3/4]">
                <div className="absolute inset-0 border-2 border-brand-gold translate-x-4 translate-y-4 z-0"></div>
                <div className="absolute inset-0 bg-brand-charcoal overflow-hidden shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out group">
                    <img 
                        src="/placido.jpg" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800';
                        }}
                        alt="Dr. Plácido Cintra" 
                        className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHAT IS IT (EDUCATIONAL)
      ========================================= */}
      <section className="py-16 md:py-24 bg-brand-white text-brand-charcoal">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-brand-black">O que é o Auxílio-Acidente?</h2>
                    <div className="w-20 h-1 bg-brand-gold mb-8"></div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        É um benefício previdenciário de natureza indenizatória. Diferente da aposentadoria por invalidez, 
                        <strong className="text-brand-goldDark"> você pode continuar trabalhando</strong> e recebendo salário normalmente, enquanto recebe esse valor extra do INSS todos os meses.
                    </p>
                    <ul className="space-y-4 mt-6">
                        {[
                            "Para quem sofreu qualquer tipo de acidente.",
                            "Para quem ficou com sequelas permanentes (mínimas ou graves).",
                            "Pagamento retroativo desde o fim do auxílio-doença.",
                            "Válido até a aposentadoria."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="text-brand-steel mt-1 shrink-0" size={20} />
                                <span className="text-brand-charcoal font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Stats / Graphic Representation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-6 border-l-4 border-brand-steel rounded-sm shadow-sm">
                        <Gavel className="text-brand-steel mb-3" size={32} />
                        <h3 className="font-bold text-lg mb-2">Direito Indenizatório</h3>
                        <p className="text-sm text-gray-500">Não exige que você pare de trabalhar. É um "bônus" pela redução da capacidade.</p>
                    </div>
                    <div className="bg-gray-50 p-6 border-l-4 border-brand-gold rounded-sm shadow-sm">
                        <Award className="text-brand-gold mb-3" size={32} />
                        <h3 className="font-bold text-lg mb-2">Vitalício</h3>
                        <p className="text-sm text-gray-500">Você recebe o benefício mensalmente até se aposentar.</p>
                    </div>
                    <div className="bg-brand-charcoal text-white p-6 col-span-1 sm:col-span-2 rounded-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Scale size={64} />
                        </div>
                        <h3 className="font-serif text-xl mb-2 text-brand-gold">Lei 8.213/91</h3>
                        <p className="text-sm text-gray-300">
                            "O auxílio-acidente será concedido, como indenização, ao segurado quando, após consolidação das lesões decorrentes de acidente de qualquer natureza, resultarem sequelas que impliquem redução da capacidade."
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================
          AUTHORITY (DR. PLACIDO)
      ========================================= */}
      <section className="py-20 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                  {/* Image for Mobile (Visible only on small screens) */}
                  <div className="md:hidden w-48 h-48 rounded-full overflow-hidden border-4 border-brand-gold mx-auto shadow-xl">
                      <img 
                          src="/placido.jpg" 
                          alt="Dr. Plácido Cintra" 
                          className="object-cover w-full h-full"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800'; }}
                      />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                      <h4 className="text-brand-steel font-bold tracking-widest uppercase text-sm mb-2">O Advogado</h4>
                      <h2 className="text-3xl md:text-4xl font-serif text-brand-black font-bold mb-6">Dr. André Ricardo Plácido Cintra</h2>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                          Advogado inscrito na OAB/MG sob o nº 161.704, fundador do escritório Plácido Cintra Advocacia. 
                          Especialista em Direito Previdenciário com foco na defesa dos direitos dos trabalhadores acidentados.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          Nossa missão é combater a injustiça do INSS através de processos administrativos e judiciais técnicos, 
                          garantindo que quem contribuiu a vida toda não fique desamparado no momento de maior necessidade.
                      </p>
                      
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 text-sm font-bold text-brand-charcoal flex items-center gap-2">
                              <Building2 size={16} className="text-brand-gold" />
                              Escritório Digital Nacional
                          </div>
                          <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200 text-sm font-bold text-brand-charcoal flex items-center gap-2">
                              <Scale size={16} className="text-brand-gold" />
                              +8 Anos de Experiência
                          </div>
                      </div>

                       {/* CV Link */}
                       <div className="mt-8">
                            <a 
                                href={LINKS.cv} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-brand-steel text-sm font-bold uppercase tracking-wider hover:text-brand-gold transition-colors border-b border-transparent hover:border-brand-gold pb-1"
                            >
                                <FileText size={16} />
                                Visualizar Currículo Oficial (CNA)
                            </a>
                       </div>
                  </div>

                  {/* Desktop Image */}
                  <div className="hidden md:block w-1/3 relative">
                      <div className="w-full aspect-[3/4] bg-brand-charcoal rounded-sm overflow-hidden shadow-2xl relative z-10">
                          <img 
                              src="/placido.jpg" 
                              alt="Dr. Plácido Cintra" 
                              className="object-cover w-full h-full opacity-90"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800'; }}
                          />
                          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                              <p className="text-white font-serif text-xl">{COMPANY.attorney}</p>
                              <p className="text-brand-gold text-xs uppercase">{COMPANY.oab_mg}</p>
                          </div>
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-gold z-0 rounded-sm"></div>
                  </div>
              </div>
          </div>
      </section>

      {/* =========================================
          TRANSPARENCY & METHOD (DARK)
      ========================================= */}
      <section className="py-20 bg-brand-charcoal text-white relative border-t border-brand-gold">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-brand-white">Como trabalhamos</h2>
             <p className="text-gray-400 text-lg">
               Tecnologia e humanização para acelerar o seu direito.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-gold transition-all duration-300 rounded-sm">
                <div className="mb-6 text-brand-gold">
                  <Percent size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-white">Risco Zero</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Trabalhamos no êxito (Ad Exitum). Você não paga honorários iniciais. Só recebemos se você ganhar o processo.
                </p>
             </div>

             {/* Card 2 */}
             <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-gold transition-all duration-300 rounded-sm">
                <div className="mb-6 text-brand-steel">
                  <FileSignature size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-white">Contrato Digital</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Formalização via WhatsApp e assinatura eletrônica com validade jurídica. Tudo transparente e documentado.
                </p>
             </div>

             {/* Card 3 */}
             <div className="bg-white/5 p-8 border border-white/10 hover:border-brand-gold transition-all duration-300 rounded-sm">
                <div className="mb-6 text-brand-gold">
                  <Eye size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-white">Monitoramento</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Acompanhamento processual ativo. Nós avisamos você sobre cada movimentação importante.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECURITY TIPS
      ========================================= */}
      <section className="py-16 bg-brand-black border-t border-gray-800">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldAlert className="text-brand-gold animate-pulse" size={32} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Anti-Golpe</h3>
                    </div>
                    <p className="text-gray-400 text-sm">
                        O mercado jurídico digital exige cautela. Veja como identificamos nossa autenticidade e proteja seus dados.
                    </p>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {SECURITY_TIPS.map((tip, idx) => (
                        <div key={idx} className="bg-brand-charcoal p-4 rounded-sm border border-gray-700 flex flex-col gap-2">
                            <div className="text-brand-steel">{getIcon(tip.icon)}</div>
                            <h4 className="text-white font-bold text-sm">{tip.title}</h4>
                            <p className="text-xs text-gray-500">{tip.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}
      <section className="py-20 md:py-24 bg-brand-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif text-brand-black mb-6">Não deixe seu direito prescrever</h2>
          <p className="text-gray-600 mb-10 text-lg md:text-xl">
            A análise inicial é totalmente gratuita e confidencial. Descubra agora se seu caso é viável.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={onStartQuiz} className="text-lg px-12 py-5 shadow-2xl w-full sm:w-auto">
                INICIAR TRIAGEM
            </Button>
          </div>
          <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
             Tempo estimado: 2 minutos • 100% Online
          </p>
        </div>
      </section>
    </div>
  );
};