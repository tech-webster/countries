import * as _allCountries from "../data/countries";
import type { Country, CountryWithFlags, FilterSortOptions } from "./types";
import { withFlags } from "./flags";

const allCountriesArray: Country[] = Object.values(_allCountries);

const applyOptions = (
  countries: Country[],
  options?: FilterSortOptions
): Country[] => {
  let result = options?.filter ? countries.filter(options.filter) : [...countries];

  if (options?.sort) {
    const { by, order } = options.sort;
    result = result.sort((a, b) => {
      const aVal = a[by];
      const bVal = b[by];
      const cmp = aVal.localeCompare(bVal);
      return order === "asc" ? cmp : -cmp;
    });
  }

  return result;
};

export const getAllCountries = (options?: FilterSortOptions): Country[] =>
  applyOptions(allCountriesArray, options);

export const getAllCountriesWithFlags = (
  options?: FilterSortOptions
): CountryWithFlags[] =>
  applyOptions(allCountriesArray, options).map(withFlags);

export const getCountryByCode = (code: string): Country | undefined =>
  _allCountries[code.toUpperCase() as keyof typeof _allCountries];

export const getCountryByAlpha3 = (alpha3: string): Country | undefined =>
  allCountriesArray.find(
    (c) => c.alpha3.toLowerCase() === alpha3.toLowerCase()
  );

export const getCountryByPhone = (phone: string): Country[] =>
  allCountriesArray.filter((c) => c.phone === phone);
