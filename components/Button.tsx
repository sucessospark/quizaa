import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-4 rounded-sm font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    // Dourado Envelhecido
    primary: "bg-brand-gold text-brand-black hover:bg-brand-goldDark shadow-lg hover:shadow-brand-gold/20 focus:ring-brand-gold border border-brand-gold",
    // Cinza Carvão
    secondary: "bg-brand-charcoal hover:bg-black text-white shadow-md focus:ring-brand-charcoal border border-brand-charcoal",
    // Outline Dourado
    outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black focus:ring-brand-gold",
    // Ghost
    ghost: "text-brand-charcoal hover:bg-slate-200"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};