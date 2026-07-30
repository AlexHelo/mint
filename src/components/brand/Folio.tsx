/**
 * El sello de folio (docs/marca.md §5): Mint's ownable motif. A thin-stroke
 * circle ringed by radial ticks (one every 12°, 30 total) that fill with
 * progress, with an optional folio number in the middle. Drawn with SVG,
 * no raster assets. At small sizes render without the label.
 */

const TICKS = 30

interface FolioProps {
  size: number
  /** 0..1 fraction of ticks filled. */
  progress?: number
  /** Folio label in the middle, e.g. "LIC-2026-014". Omit under ~48px. */
  label?: string
  tone?: 'mint' | 'indigo' | 'dual' | 'white'
  className?: string
}

const STROKE: Record<NonNullable<FolioProps['tone']>, string> = {
  mint: '#00C07A',
  indigo: '#2D4CC8',
  dual: '', // per-tick, half mint half indigo
  white: '#FFFFFF',
}

export function Folio({ size, progress = 1, label, tone = 'mint', className }: FolioProps) {
  const c = size / 2
  const rOuter = c - 1
  const tick = Math.max(3, size * 0.045)
  const rInner = Math.max(1, rOuter - tick)
  const filled = Math.round(Math.min(1, Math.max(0, progress)) * TICKS)

  const tickColor = (i: number) =>
    tone === 'dual' ? (i < TICKS / 2 ? '#2D4CC8' : '#00C07A') : STROKE[tone]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden
      className={className}
    >
      <circle
        cx={c}
        cy={c}
        r={Math.max(0.5, rInner - tick * 0.9)}
        stroke={tone === 'dual' ? '#0A1628' : STROKE[tone]}
        strokeWidth={1.5}
      />
      {Array.from({ length: TICKS }, (_, i) => {
        // start at 12 o'clock, clockwise
        const a = (i / TICKS) * 2 * Math.PI - Math.PI / 2
        const x1 = c + rInner * Math.cos(a)
        const y1 = c + rInner * Math.sin(a)
        const x2 = c + rOuter * Math.cos(a)
        const y2 = c + rOuter * Math.sin(a)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={tickColor(i)}
            strokeWidth={1.5}
            opacity={i < filled ? 1 : 0.25}
          />
        )
      })}
      {label && size >= 48 ? (
        <text
          x={c}
          y={c}
          textAnchor="middle"
          dominantBaseline="central"
          fill={tone === 'dual' ? '#0A1628' : STROKE[tone]}
          fontFamily="Sora, system-ui, sans-serif"
          fontWeight={600}
          fontSize={size * 0.11}
          letterSpacing="0.02em"
        >
          {label}
        </text>
      ) : null}
    </svg>
  )
}
