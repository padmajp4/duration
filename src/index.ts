const UNITS: Record<string, number> = {
  ms: 1,
  s:  1_000,
  m:  60_000,
  h:  3_600_000,
  d:  86_400_000,
  w:  604_800_000,
}

const PARSE_RE = /(\d+(?:\.\d+)?)\s*(ms|s|m|h|d|w)/g

export class DurationError extends Error {
  constructor(input: string) {
    super(`Invalid duration string: "${input}"`)
    this.name = 'DurationError'
  }
}

export function parseDuration(input: string): number {
  const str = input.trim()
  if (!str) throw new DurationError(input)

  let total = 0
  let matched = false

  PARSE_RE.lastIndex = 0
  for (const match of str.matchAll(PARSE_RE)) {
    total += parseFloat(match[1]) * UNITS[match[2]]
    matched = true
  }

  if (!matched) throw new DurationError(input)
  return Math.round(total)
}

export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new RangeError(`formatDuration expects a non-negative finite number, got ${ms}`)
  }

  if (ms === 0) return '0ms'

  const units: [string, number][] = [
    ['w', UNITS.w],
    ['d', UNITS.d],
    ['h', UNITS.h],
    ['m', UNITS.m],
    ['s', UNITS.s],
    ['ms', UNITS.ms],
  ]

  const parts: string[] = []
  let remaining = Math.round(ms)

  for (const [unit, value] of units) {
    if (remaining >= value) {
      const count = Math.floor(remaining / value)
      parts.push(`${count}${unit}`)
      remaining %= value
    }
  }

  return parts.join(' ')
}
