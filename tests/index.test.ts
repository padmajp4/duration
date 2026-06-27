import { describe, it, expect } from 'vitest'
import { parseDuration, formatDuration, DurationError } from '../src/index'

describe('parseDuration', () => {
  it('parses milliseconds', () => expect(parseDuration('500ms')).toBe(500))
  it('parses seconds',      () => expect(parseDuration('30s')).toBe(30_000))
  it('parses minutes',      () => expect(parseDuration('5m')).toBe(300_000))
  it('parses hours',        () => expect(parseDuration('2h')).toBe(7_200_000))
  it('parses days',         () => expect(parseDuration('1d')).toBe(86_400_000))
  it('parses weeks',        () => expect(parseDuration('1w')).toBe(604_800_000))

  it('parses compound durations', () => {
    expect(parseDuration('2h30m')).toBe(9_000_000)
    expect(parseDuration('1d12h')).toBe(129_600_000)
    expect(parseDuration('1w2d3h')).toBe(788_400_000)
  })

  it('parses with spaces between units', () => {
    expect(parseDuration('2h 30m')).toBe(9_000_000)
  })

  it('throws DurationError for invalid input', () => {
    expect(() => parseDuration('abc')).toThrow(DurationError)
    expect(() => parseDuration('')).toThrow(DurationError)
    expect(() => parseDuration('100')).toThrow(DurationError)
  })
})

describe('formatDuration', () => {
  it('formats milliseconds',  () => expect(formatDuration(500)).toBe('500ms'))
  it('formats seconds',       () => expect(formatDuration(30_000)).toBe('30s'))
  it('formats minutes',       () => expect(formatDuration(300_000)).toBe('5m'))
  it('formats hours',         () => expect(formatDuration(7_200_000)).toBe('2h'))
  it('formats days',          () => expect(formatDuration(86_400_000)).toBe('1d'))
  it('formats weeks',         () => expect(formatDuration(604_800_000)).toBe('1w'))

  it('formats compound durations', () => {
    expect(formatDuration(9_000_000)).toBe('2h 30m')
    expect(formatDuration(129_600_000)).toBe('1d 12h')
  })

  it('formats zero', () => expect(formatDuration(0)).toBe('0ms'))

  it('throws RangeError for negative or non-finite values', () => {
    expect(() => formatDuration(-1)).toThrow(RangeError)
    expect(() => formatDuration(Infinity)).toThrow(RangeError)
    expect(() => formatDuration(NaN)).toThrow(RangeError)
  })
})
