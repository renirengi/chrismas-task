export interface LighropeModel {
  colorName: string;
  background?: string;
  animation?: () => void;
  enabled: boolean;
}

export type ConfigLightropeModel = Pick<LighropeModel, 'colorName' | 'animation' | 'background'>;

export interface TreeImageElements {
  tree: string[];
}

export interface BackgroundImageElements {
  background: string[];
}

export interface AppliedBackNamesModel {
  tree: string;
  background: string;
  light: string;
  status: boolean;
}

/*export enum LightropeElements{
  multicolor = "multicolor",
  red = "red",
  blue = "blue",
  yellow = "yellow",
  green = "green"
}*/

export interface LightropeElements{
 light: string[];
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

export type BackNamesValues = string | string | string | boolean;

