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

export interface TreeImageElements {
  tree: string[];
}

export interface BackgroundImageElements {
  background: string[];
}

export enum LightropeElements{
  multicolor = "multicolor",
  red = "red",
  blue = "blue",
  yellow = "yellow",
  green = "green"
}


export interface ChristmasTree {
  background: TreeImageElements;
  tree: TreeImageElements;
  light: BackgroundImageElements;
  status: boolean;
 }

export interface UsedElements{
  background: HTMLElement[];
  tree: HTMLElement[];
  light: HTMLElement[];
  status: HTMLElement;
}

export type BackNames = 'tree' | 'background' | 'light' | 'status';

export type BackNamesValues = string | string | LightropeElements | boolean;

