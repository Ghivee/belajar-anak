// Tokoh orisinal aplikasi: Ombak (paus kecil) dan Perak (burung laut perak).

interface CharProps {
  size?: number
  sleeping?: boolean
  className?: string
}

export function Ombak({ size = 160, sleeping = false, className }: CharProps) {
  return (
    <svg viewBox="0 0 200 140" width={size} height={size * 0.7} className={className} aria-label="Ombak si paus kecil">
      {/* semburan air */}
      {!sleeping && (
        <g fill="#a8d5e2">
          <circle cx="88" cy="14" r="6" />
          <circle cx="76" cy="22" r="5" />
          <circle cx="100" cy="22" r="5" />
        </g>
      )}
      {/* ekor */}
      <path d="M160 70 C180 50 195 45 196 55 C190 62 186 68 182 74 C188 80 192 88 190 94 C180 94 170 86 160 80 Z" fill="#6b9fc0" />
      {/* badan */}
      <path d="M20 80 C20 45 55 30 95 32 C135 34 165 55 165 78 C165 104 130 118 92 118 C50 118 20 108 20 80 Z" fill="#7fb2d1" />
      {/* perut */}
      <path d="M35 92 C55 112 120 116 150 96 C140 110 115 116 92 116 C65 116 45 108 35 92 Z" fill="#e8f3f7" />
      {/* sirip */}
      <path d="M85 98 C90 112 100 120 110 118 C106 110 100 102 95 96 Z" fill="#6b9fc0" />
      {/* mata */}
      {sleeping ? (
        <path d="M46 70 Q54 76 62 70" stroke="#2f4858" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <circle cx="54" cy="68" r="8" fill="#2f4858" />
          <circle cx="57" cy="65" r="2.6" fill="#fff" />
        </g>
      )}
      {/* pipi dan senyum */}
      <circle cx="44" cy="84" r="6" fill="#f4b6b6" opacity="0.7" />
      <path d="M38 92 Q50 100 64 92" stroke="#2f4858" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function Perak({ size = 140, sleeping = false, className }: CharProps) {
  return (
    <svg viewBox="0 0 180 160" width={size} height={size * 0.89} className={className} aria-label="Perak si burung laut">
      {/* sayap belakang */}
      <path d="M95 70 C120 30 160 20 175 30 C160 40 150 55 140 75 Z" fill="#c9d6df" />
      {/* badan */}
      <ellipse cx="90" cy="95" rx="45" ry="38" fill="#eef2f5" />
      {/* lempeng biru di perut */}
      <path d="M70 110 Q90 118 110 110" stroke="#5b8fa8" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M74 122 Q90 128 106 122" stroke="#5b8fa8" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* leher dan kepala */}
      <path d="M60 80 C50 60 52 40 66 32 C80 26 92 34 92 48 C92 60 84 70 80 82 Z" fill="#eef2f5" />
      {/* jambul */}
      <path d="M70 30 C66 18 70 10 78 8 C76 16 78 22 82 28 Z" fill="#c9d6df" />
      {/* topeng mata biru */}
      <path d="M62 44 C70 38 84 38 90 46 C84 50 70 52 62 44 Z" fill="#5b8fa8" />
      {sleeping ? (
        <path d="M70 46 Q75 50 80 46" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <circle cx="76" cy="45" r="4" fill="#fff" />
          <circle cx="77" cy="45" r="2" fill="#2f4858" />
        </g>
      )}
      {/* paruh */}
      <path d="M90 50 L104 54 L90 58 Z" fill="#f2c57c" />
      {/* sayap depan */}
      <path d="M85 85 C60 60 20 55 6 66 C25 72 40 85 55 105 C70 108 82 100 85 85 Z" fill="#dfe7ec" />
      <path d="M30 70 L40 84 M45 72 L52 90" stroke="#5b8fa8" strokeWidth="3" strokeLinecap="round" />
      {/* ekor */}
      <path d="M130 110 C150 120 160 135 158 145 C145 138 132 128 122 120 Z" fill="#c9d6df" />
    </svg>
  )
}

export function Fish({ color = '#f2a65a', size = 72 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 60" width={size} height={size * 0.6} aria-hidden="true">
      <path d="M70 30 L96 10 L96 50 Z" fill={color} opacity="0.85" />
      <ellipse cx="42" cy="30" rx="34" ry="22" fill={color} />
      <circle cx="22" cy="25" r="5" fill="#2f4858" />
      <circle cx="23.5" cy="23.5" r="1.6" fill="#fff" />
    </svg>
  )
}

export function Coral({ color = '#f4a6a6', size = 40 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 40 50" width={size} height={size * 1.25} aria-hidden="true">
      <path
        d="M20 50 L20 30 M20 32 L10 18 M10 18 L6 8 M10 18 L14 6 M20 30 L30 16 M30 16 L34 6 M30 16 L26 4 M20 30 L20 12"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
