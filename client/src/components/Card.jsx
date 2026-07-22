import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  action,
  badge,
  badgeColor = 'blue',
  className = '',
  hoverEffect = true,
  glow = false
}) => {
  const badgeClasses = {
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    red: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
  };

  return (
    <div
      className={`relative rounded-2xl ${
        hoverEffect ? 'glass-card' : 'glass-panel'
      } ${glow ? 'glow-blue' : ''} p-5 lg:p-6 transition-all duration-300 ${className}`}
    >
      {(title || Icon || badge || action) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="font-semibold text-slate-100 text-base lg:text-lg">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {badge && (
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${badgeClasses[badgeColor]}`}>
                {badge}
              </span>
            )}
            {action}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
