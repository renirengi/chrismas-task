export interface ToyCardModel {
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
  sort: SortFilterValues;
}

export enum SortFilterValues {
  az = 'az',
  za = 'za',
  min = 'min',
  max = 'max',
}

export type FilterNames = 'name' | 'count' | 'year' | 'shape' | 'color' | 'size' | 'favorite';

export type AppliedFilterValues = string | string[] | number[] | boolean | SortFilterValues;

export type ElementNoUiSlider = {
  noUiSlider: {
    on: (a: string, b: (e: string[]) => void) => void,
    set: (a: string[]) => void
  }};

export interface FilterElements {
  name: HTMLInputElement;
  count: HTMLElement & ElementNoUiSlider;
  year: HTMLElement & ElementNoUiSlider;
  shape: HTMLElement[],
  color: HTMLElement[],
  size: HTMLElement[],
  favorite: HTMLInputElement;
  sort: HTMLSelectElement;
}
