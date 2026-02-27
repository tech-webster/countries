export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type Country = {
  code: string;
  alpha3: string;
  label: string;
  phone: string;
  capital: string;
  continent: string;
  currency: Currency;
  timezones: string[];
};

export type CountryWithFlags = Country & {
  flagEmoji: string;
  flagPng20: string;
  flagPng40: string;
  flagSvg: string;
  srcSet: string;
};

export type SortBy = "label" | "code" | "phone" | "continent";

export type FilterSortOptions = {
  filter?: (country: Country) => boolean;
  sort?: {
    by: SortBy;
    order: "asc" | "desc";
  };
};
