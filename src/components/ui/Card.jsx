import React from 'react';

export default function Card({ children, className = '', glow = false, ...props }) {
  return (
    <div
      className={`
        relative bg-[#0f0f12] border border-white/5 p-6
        hover:border-purple-500/30 transition-all duration-300
        ${glow ? 'hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
