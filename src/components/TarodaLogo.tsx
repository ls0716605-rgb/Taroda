import React from 'react';

interface TarodaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const TarodaLogo: React.FC<TarodaLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract Verified Domain Shield Emblem */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} flex-shrink-0`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(14,165,233,0.3)]">
          {/* Outer Protective Hexagon Shield */}
          <polygon
            points="18,2 32,8 32,22 18,34 4,22 4,8"
            className="stroke-cyan-400"
            strokeWidth="2.2"
            strokeLinejoin="round"
            fill="url(#taroda-shield-gradient)"
          />
          {/* Inner Authentication Keyhole & Domain Node */}
          <path
            d="M18 10C15.7909 10 14 11.7909 14 14C14 15.48 14.81 16.77 16 17.46V23C16 24.1 16.9 25 18 25C19.1 25 20 24.1 20 23V17.46C21.19 16.77 22 15.48 22 14C22 11.7909 20.2091 10 18 10Z"
            fill="url(#taroda-key-gradient)"
          />
          {/* Verified Cryptographic Pulse Dot */}
          <circle cx="18" cy="14" r="1.8" className="fill-slate-950" />
          {/* Subtly intersecting alignment arcs */}
          <path
            d="M10 20C12 24 15 26 18 26C21 26 24 24 26 20"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          <defs>
            <linearGradient id="taroda-shield-gradient" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B1E38" />
              <stop offset="1" stopColor="#050B14" />
            </linearGradient>
            <linearGradient id="taroda-key-gradient" x1="14" y1="10" x2="22" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
            TARODA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
            Domain & Email Security
          </span>
        )}
      </div>
    </div>
  );
};
