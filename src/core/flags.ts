import type { Country, CountryWithFlags } from "./types";

export const toFlagEmoji = (code: string): string =>
  String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => 127397 + c.charCodeAt(0)),
  );

export const toFlagUrls = (
  code: string,
): Pick<CountryWithFlags, "flagPng20" | "flagPng40" | "flagSvg" | "srcSet"> => {
  const lower = code.toLowerCase();
  return {
    flagPng20: `https://flagcdn.com/w20/${lower}.png`,
    flagPng40: `https://flagcdn.com/w40/${lower}.png`,
    flagSvg: `https://flagcdn.com/${lower}.svg`,
    srcSet: `https://flagcdn.com/w40/${lower}.png 2x`,
  };
};

export const withFlags = (country: Country): CountryWithFlags => ({
  ...country,
  flagEmoji: toFlagEmoji(country.code),
  ...toFlagUrls(country.code),
});
