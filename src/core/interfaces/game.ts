import { ToyCardModel } from ".";

export interface LighropeModel {
  color: string;
  state: boolean;
}

export type ToyModel = Pick<ToyCardModel, 'num' | 'count'>;

//export type ConfigLightropeModel = Pick<LighropeModel, 'colorName'>;

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

export interface LightropeElements{
 light: string[];
}

/*
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

export type BackNamesValues = string | string | string | boolean;*/

