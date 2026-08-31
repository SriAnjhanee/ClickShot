import React from 'react';

interface ClickShotLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ClickShotLogo: React.FC<ClickShotLogoProps> = ({
  className = '',
  showTagline = true,
  variant = 'dark',
  size = 'md',
}) => {
  // If variant is explicitly 'image', use the uploaded logo image
  if (variant === 'image') {
    const heightClass = {
      sm: 'h-7',
      md: 'h-9',
      lg: 'h-12',
      xl: 'h-16',
    }[size];

    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src="/logo.jpg" 
          alt="ClickShot - Shoot. Edit. Deliver. Instant Reels." 
          className={`${heightClass} w-auto object-contain mix-blend-multiply`}
        />
      </div>
    );
  }

  // Vectorized High-Fidelity SVG Logo for ultra-crisp display at all scale factors
  const textFill = variant === 'light' ? '#FFFFFF' : '#0A0A0A';
  const taglineFill = variant === 'light' ? '#E4E4E7' : '#18181B';
  const accentRed = '#E11D48';

  const dimensions = {
    sm: { width: 140, height: showTagline ? 38 : 28 },
    md: { width: 180, height: showTagline ? 48 : 34 },
    lg: { width: 230, height: showTagline ? 62 : 44 },
    xl: { width: 290, height: showTagline ? 78 : 56 },
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 90"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-auto transition-transform duration-300"
      >
        {/* "ClickSh" */}
        <text
          x="10"
          y="56"
          fontFamily="'Plus Jakarta Sans', Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="50"
          letterSpacing="-1.5"
          fill={textFill}
        >
          ClickSh
        </text>

        {/* Camera Aperture Ring inside the 'o' */}
        <g transform="translate(243, 40)">
          {/* Outer circle */}
          <circle cx="0" cy="0" r="16" stroke={accentRed} strokeWidth="3" fill="none" />
          {/* Aperture blades */}
          <path d="M-13 -3 L3 -13 L-2 -1" fill={accentRed} opacity="0.95" />
          <path d="M-3 -13 L13 -3 L1 -2" fill={accentRed} opacity="0.95" />
          <path d="M13 -3 L3 13 L2 1" fill={accentRed} opacity="0.95" />
          <path d="M3 13 L-13 3 L-1 2" fill={accentRed} opacity="0.95" />
          <path d="M-13 3 L-3 -13 L-2 -1" fill={accentRed} opacity="0.95" />
          {/* Inner hexagon center */}
          <polygon points="-4,-2 0,-4.5 4,-2 4,2 0,4.5 -4,2" fill={accentRed} />
        </g>

        {/* "t" */}
        <text
          x="269"
          y="56"
          fontFamily="'Plus Jakarta Sans', Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="50"
          letterSpacing="-1.5"
          fill={textFill}
        >
          t
        </text>

        {/* Tagline: "SHOOT. EDIT. DELIVER. INSTANT REELS ." */}
        {showTagline && (
          <g>
            <text
              x="14"
              y="79"
              fontFamily="'Plus Jakarta Sans', Inter, system-ui, sans-serif"
              fontWeight="700"
              fontSize="10.5"
              letterSpacing="2.2"
              fill={taglineFill}
            >
              SHOOT. <tspan fill={accentRed}>EDIT.</tspan> DELIVER. INSTANT REELS.
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
