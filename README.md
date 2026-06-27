# @padmaj/duration

Parse and format duration strings. Zero dependencies. TypeScript-first. Works in Node and browser.

## Install

```bash
npm install @padmaj/duration
```

## Usage

### Parse a duration string → milliseconds

```ts
import { parseDuration } from '@padmaj/duration'

parseDuration('500ms')   // → 500
parseDuration('30s')     // → 30000
parseDuration('5m')      // → 300000
parseDuration('2h')      // → 7200000
parseDuration('1d')      // → 86400000
parseDuration('1w')      // → 604800000

// Compound durations
parseDuration('2h30m')   // → 9000000
parseDuration('1d12h')   // → 129600000
parseDuration('2h 30m')  // → 9000000 (spaces OK)
```

### Format milliseconds → duration string

```ts
import { formatDuration } from '@padmaj/duration'

formatDuration(500)          // → '500ms'
formatDuration(30000)        // → '30s'
formatDuration(9000000)      // → '2h 30m'
formatDuration(129600000)    // → '1d 12h'
formatDuration(0)            // → '0ms'
```

## Supported units

| Unit | Meaning |
|---|---|
| `ms` | milliseconds |
| `s` | seconds |
| `m` | minutes |
| `h` | hours |
| `d` | days |
| `w` | weeks |

## API

### `parseDuration(input: string): number`

Parses a duration string and returns milliseconds. Throws `DurationError` if the input is empty or contains no recognizable units.

### `formatDuration(ms: number): string`

Formats milliseconds into a human-readable duration string. Throws `RangeError` if the value is negative, `NaN`, or `Infinity`.

### `DurationError`

Extends `Error`. Thrown by `parseDuration` on invalid input.

```ts
import { parseDuration, DurationError } from '@padmaj/duration'

try {
  parseDuration('abc')
} catch (e) {
  if (e instanceof DurationError) {
    console.error('Bad duration:', e.message)
  }
}
```

## License

MIT
