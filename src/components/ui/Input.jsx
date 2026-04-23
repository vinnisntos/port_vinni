import React from 'react';

export default function Input({
  label,
  error,
  icon,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full bg-[#0a0a0c] border border-white/10 px-4 py-3
            text-white font-mono text-sm
            placeholder:text-gray-600
            focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[10px] text-red-400 font-mono">
          {error}
        </p>
      )}
    </div>
  );
}
