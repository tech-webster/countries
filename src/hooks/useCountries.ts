import { useMemo } from "react";
import type { Country, CountryWithFlags, FilterSortOptions } from "../core/types";
import { getAllCountries, getAllCountriesWithFlags } from "../core/utils";

type UseCountriesOptions<T extends boolean> = FilterSortOptions & {
  includeFlags?: T;
};

export const useCountries = <T extends boolean = false>(
  options: UseCountriesOptions<T> = {},
): T extends true ? CountryWithFlags[] : Country[] => {
  const { includeFlags, filter, sort } = options;

  return useMemo(() => {
    if (includeFlags) {
      return getAllCountriesWithFlags({ filter, sort }) as T extends true
        ? CountryWithFlags[]
        : Country[];
    }
    return getAllCountries({ filter, sort }) as T extends true ? CountryWithFlags[] : Country[];
  }, [includeFlags, filter, sort]);
};
