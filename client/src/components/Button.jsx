import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 focus:ring-blue-500 border border-blue-500/30',
    accent: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 focus:ring-emerald-500 border border-emerald-500/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-500',
    glass: 'glass-panel hover:bg-slate-800/80 text-slate-200 border border-slate-700/60 focus:ring-blue-500',
    outline: 'border border-blue-500/40 text-blue-400 hover:bg-blue-600/10 focus:ring-blue-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 focus:ring-rose-500 border border-rose-500/30',
    ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white focus:ring-slate-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium gap-1.5',
    md: 'px-4 py-2.5 text-sm font-medium gap-2',
    lg: 'px-6 py-3.5 text-base font-semibold gap-2.5'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
