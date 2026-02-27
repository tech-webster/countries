# @tw-labs/countries

Comprehensive country data with utilities and an optional React hook. TypeScript-first, framework-agnostic, and tree-shakeable.

[![npm version](https://badge.fury.io/js/@tw-labs%2Fcountries.svg)](https://badge.fury.io/js/@tw-labs%2Fcountries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **195+ countries** with ISO alpha-2/alpha-3 codes, name, phone dial code, capital, continent, currency, and timezones
- **Flag support** — emoji flags, PNG (20px, 40px), and SVG via flagcdn.com
- **Tree-shakeable** — import only the countries you need via the `/data` subpath
- **Framework-agnostic core** — works in Node.js, Vue, Svelte, and anywhere else
- **React hook** — `useCountries` with filtering, sorting, and conditional flag types
- **Next.js ready** — `"use client"` built into the React entry, core works in Server Components
- **TypeScript-first** — full type safety and IntelliSense out of the box
- **Zero dependencies** — no runtime dependencies

## Installation

```bash
npm install @tw-labs/countries
# or
yarn add @tw-labs/countries
# or
pnpm add @tw-labs/countries
# or
bun add @tw-labs/countries
```

## Import Paths

| Path | Use case |
|---|---|
| `@tw-labs/countries` | Framework-agnostic utilities (Node, Vue, Svelte, Next.js server) |
| `@tw-labs/countries/react` | React hook (`useCountries`) |
| `@tw-labs/countries/data` | Named country exports — fully tree-shakeable |

---

## Core Utilities

```typescript
import {
  getAllCountries,
  getAllCountriesWithFlags,
  getCountryByCode,
  getCountryByAlpha3,
  getCountryByPhone,
  withFlags,
} from "@tw-labs/countries";
```

### `getCountryByCode(code)`

```typescript
const country = getCountryByCode("US");
// {
//   code: "US",
//   alpha3: "USA",
//   label: "United States",
//   phone: "1",
//   capital: "Washington, D.C.",
//   continent: "North America",
//   currency: { code: "USD", symbol: "$", name: "United States Dollar" },
//   timezones: ["America/New_York", "America/Chicago", ...]
// }
```

### `getCountryByAlpha3(alpha3)`

```typescript
const country = getCountryByAlpha3("GBR");
// { code: "GB", alpha3: "GBR", label: "United Kingdom", ... }
```

### `getCountryByPhone(phone)`

Returns an array since multiple countries can share a dial code.

```typescript
const countries = getCountryByPhone("1");
// [{ code: "US", ... }, { code: "CA", ... }, { code: "PR", ... }, ...]
```

### `getAllCountries(options?)`

```typescript
// All countries
const all = getAllCountries();

// Filtered
const european = getAllCountries({
  filter: (c) => c.continent === "Europe",
});

// Sorted
const sorted = getAllCountries({
  sort: { by: "label", order: "asc" },
});

// Both
const result = getAllCountries({
  filter: (c) => c.continent === "Asia",
  sort: { by: "label", order: "asc" },
});
```

### `getAllCountriesWithFlags(options?)`

Same as `getAllCountries` but each country includes flag data.

```typescript
const countries = getAllCountriesWithFlags();
// Each country has: flagEmoji, flagPng20, flagPng40, flagSvg, srcSet
```

### `withFlags(country)`

Add flag data to a single country object.

```typescript
const country = getCountryByCode("JP");
const withFlagData = withFlags(country!);
// { ...country, flagEmoji: "🇯🇵", flagPng20: "...", flagSvg: "...", ... }
```

---

## Tree-Shakeable Data Imports

For the best bundle size when you know your countries at build time:

```typescript
import { US, GB, DE, FR } from "@tw-labs/countries/data";
// Only these 4 country objects are included in your bundle
```

This is ideal for static lists, country pickers with a fixed set, or server-side code that only handles specific regions.

---

## React Hook

```typescript
import { useCountries } from "@tw-labs/countries/react";
```

The `@tw-labs/countries/react` entry has `"use client"` built in — no need to add it yourself in Next.js.

### Basic usage

```typescript
function CountryList() {
  const countries = useCountries({});

  return (
    <ul>
      {countries.map((c) => (
        <li key={c.code}>
          {c.label} (+{c.phone})
        </li>
      ))}
    </ul>
  );
}
```

### With flags

```typescript
function FlagList() {
  const countries = useCountries({ includeFlags: true });
  // TypeScript knows each country has flagEmoji, flagPng20, etc.

  return (
    <div>
      {countries.map((c) => (
        <div key={c.code}>
          <span>{c.flagEmoji}</span>
          <img src={c.flagPng40} alt={`${c.label} flag`} />
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  );
}
```

### With filtering and sorting

```typescript
function SearchableCountryPicker() {
  const [query, setQuery] = useState("");

  const countries = useCountries({
    includeFlags: true,
    filter: query
      ? (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase()) ||
          c.phone.includes(query)
      : undefined,
    sort: { by: "label", order: "asc" },
  });

  return (
    <div>
      <input
        placeholder="Search countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>{countries.length} results</p>
      {countries.map((c) => (
        <div key={c.code}>
          {c.flagEmoji} {c.label} (+{c.phone})
        </div>
      ))}
    </div>
  );
}
```

### Sort options

```typescript
useCountries({ sort: { by: "label", order: "asc" } });    // A → Z by name
useCountries({ sort: { by: "code", order: "asc" } });     // AD → ZW by alpha-2
useCountries({ sort: { by: "phone", order: "asc" } });    // by dial code
useCountries({ sort: { by: "continent", order: "asc" } }); // grouped by continent
```

---

## Next.js Usage

```typescript
// app/components/PhoneInput.tsx — Client Component
"use client"; // only needed if this file is not already a client component
import { useCountries } from "@tw-labs/countries/react";

// app/api/validate/route.ts — Server Component / Route Handler
import { getCountryByCode } from "@tw-labs/countries"; // no "use client" needed
```

---

## TypeScript Types

```typescript
import type {
  Country,
  CountryWithFlags,
  Currency,
  FilterSortOptions,
  SortBy,
} from "@tw-labs/countries";

type Currency = {
  code: string;    // "USD"
  symbol: string;  // "$"
  name: string;    // "United States Dollar"
};

type Country = {
  code: string;        // ISO alpha-2  "US"
  alpha3: string;      // ISO alpha-3  "USA"
  label: string;       // "United States"
  phone: string;       // "1"
  capital: string;     // "Washington, D.C."
  continent: string;   // "North America"
  currency: Currency;
  timezones: string[]; // ["America/New_York", ...]
};

type CountryWithFlags = Country & {
  flagEmoji: string;   // "🇺🇸"
  flagPng20: string;   // https://flagcdn.com/w20/us.png
  flagPng40: string;   // https://flagcdn.com/w40/us.png
  flagSvg: string;     // https://flagcdn.com/us.svg
  srcSet: string;      // https://flagcdn.com/w40/us.png 2x
};
```

---

## License

MIT
