import React from 'react';
import { MapPin } from 'lucide-react';
import { COMPANY } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-brand-black text-brand-gold text-[10px] md:text-xs py-1 px-4 text-center tracking-widest uppercase absolute top-0 w-full left-0 h-1">
        {/* Decorative thin gold line */}
      </div>

      <div className="container mx-auto px-4 mt-2 relative flex justify-center items-center min-h-[50px]">
        
        {/* Logo area - Centered */}
        <div className="flex flex-col items-center">
             <div className="flex items-center gap-3">
                 {/* 
                    Logo Image
                 */}
                 <div className="h-12 md:h-14 w-auto flex items-center justify-center">
                     <img 
                        src="/Logo-Site.jpg" 
                        alt="Plácido Cintra Advocacia" 
                        className="h-full w-auto object-contain"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<span class="font-serif font-bold text-2xl text-brand-black border-2 border-brand-black p-1 px-2">PC</span>';
                        }}
                     />
                 </div>
                
                 {/* Text - Visible on Tablet/Desktop for nicer centering balance, or stacked on mobile if desired. 
                     Here keeping it simple: Icon centered on mobile, Text added on larger screens */}
                 <div className="hidden sm:block text-left">
                    <h1 className="text-xl md:text-2xl font-serif text-brand-black font-bold leading-none tracking-tight">
                      Plácido Cintra
                    </h1>
                    <p className="text-[10px] md:text-xs text-brand-steel uppercase tracking-[0.2em] font-bold mt-1">
                      Advocacia Previdenciária
                    </p>
                </div>
             </div>
        </div>
        
        {/* Contact Info - Absolute Right (Desktop Only) */}
        <div className="hidden lg:flex flex-col items-end text-xs text-brand-charcoal font-sans absolute right-0 top-1/2 -translate-y-1/2">
           <div className="flex items-center gap-4 mb-1">
             <span className="font-bold text-brand-steel px-2 py-1 bg-brand-steel/10 rounded-sm">{COMPANY.oab_mg}</span>
           </div>
           <div className="flex items-center text-gray-500">
             <MapPin size={12} className="mr-1" />
             Atuação Nacional
           </div>
        </div>
      </div>
    </header>
  );
};