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

      <div className="container mx-auto px-4 flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
            {/* Logo area - Image based */}
            <div className="h-12 w-auto flex items-center">
                 {/* 
                    INSTRUCTION: Save your logo as 'logo.png' in the 'public' folder.
                    The logic below handles the fallback if the image is missing.
                 */}
                 <img 
                    src="/logo.png" 
                    alt="Plácido Cintra Advocacia" 
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                        // Fallback text if logo.png is not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<span class="font-serif font-bold text-xl text-brand-black border-2 border-brand-black p-1">PC</span>';
                    }}
                 />
            </div>
            
            {/* Mobile Text (Show if logo is small or for SEO) */}
            <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-serif text-brand-black font-bold leading-none tracking-tight">
                  Plácido Cintra
                </h1>
                <p className="text-[10px] md:text-xs text-brand-steel uppercase tracking-[0.2em] font-bold mt-1">
                  Advocacia Previdenciária
                </p>
            </div>
        </div>
        
        <div className="hidden md:flex flex-col items-end text-xs text-brand-charcoal font-sans">
           <div className="flex items-center gap-4 mb-1">
             <span className="font-bold text-brand-steel">{COMPANY.oab_mg}</span>
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