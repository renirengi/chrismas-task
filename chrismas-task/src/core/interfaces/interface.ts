export interface Card {
  num: number;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface AppliedFiltersModel {
  name: string;
  count: number[];
  year: number[];
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
}

export type FilterNames = 'name' | 'count' | 'year' | 'shape' | 'color' | 'size' | 'favorite';
export type AppliedFilterValues = string | string[] | number[] | boolean;
