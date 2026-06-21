import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const baseStyles =
    'font-mono uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2';

  const variants = {
    primary:
      'bg-purple-600 text-black hover:bg-purple-400 shadow-[4px_4px_0px_0px_rgba(139,92,246,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]',
    secondary:
      'border border-white/10 text-white hover:bg-white/5',
    outline:
      'border border-purple-500/50 text-purple-400 hover:bg-purple-500/10',
    ghost: 'text-gray-400 hover:text-purple-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-xs',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}