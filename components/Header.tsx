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

      <div className="container mx-auto px-4 mt-2 relative flex justify-between items-center min-h-[60px]">
        
        {/* Logo area - Left Aligned or Centered depending on screen */}
        <div className="flex items-center gap-4 flex-1 md:flex-none">
             {/* Logo Image - Optimized Size */}
             <div className="h-16 w-auto overflow-hidden rounded-sm">
                 <img 
                    src="/Logo-Site.jpg" 
                    alt="Plácido Cintra Advocacia" 
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="h-12 w-12 bg-brand-black flex items-center justify-center text-brand-gold font-serif font-bold text-xl border border-brand-gold">PC</div>';
                    }}
                 />
             </div>
            
             {/* Text Block - Only visible on Tablet/Desktop to keep Mobile Header clean with just the Logo Image */}
             <div className="hidden md:block text-left border-l border-gray-300 pl-4">
                <h1 className="text-xl lg:text-2xl font-serif text-brand-black font-bold leading-none tracking-tight">
                  Plácido Cintra
                </h1>
                <p className="text-[10px] lg:text-xs text-brand-steel uppercase tracking-[0.2em] font-bold mt-1">
                  Advocacia Previdenciária
                </p>
            </div>
        </div>
        
        {/* Contact Info - Right (Desktop Only) */}
        <div className="hidden lg:flex flex-col items-end text-xs text-brand-charcoal font-sans">
           <div className="flex items-center gap-4 mb-1">
             <span className="font-bold text-brand-steel px-3 py-1 bg-brand-steel/10 rounded-sm uppercase tracking-wider">{COMPANY.oab_mg}</span>
           </div>
           <div className="flex items-center text-gray-500">
             <MapPin size={14} className="mr-1 text-brand-gold" />
             Atuação em todo Brasil
           </div>
        </div>
      </div>
    </header>
  );
};