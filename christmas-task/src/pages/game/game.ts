import { backgrounds } from '../../core/components/game-palettes/game-palettes-constants';
import { ViewTreeComponent } from '../../core/components/view-tree.component';
import Page from '../../core/templates/page';
import {  changeVisibility, changeSnow } from '../../utils';
import { GameToyPaletteComponent } from '../../core/components/game-palettes/game-toy-palette.component';
import { checkPrime } from 'crypto';
import { LighropeModel } from '../../core/interfaces';

const template = `
  <div class='left-side-menu'>
    <div class="snow-svg-buttons"><button class="music-button"></button><button class="snow-button"></button></div>
    <tree-palette></tree-palette>
    <back-palette></back-palette>
    <lightrope-palette></lightrope-palette>
  </div>
  <view-tree></view-tree>
  <div class="right-side-menu">
    <toy-palette></toy-palette>
    <usedTree-palette></usedTree-palette>
  </div>
`;

class GamePage extends Page {
  constructor(id: string) {
    super(id);
  }

  render() {
    changeVisibility('ЁЛОЧКА');
    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const сontainer: HTMLElement = document.createElement('div');

    сontainer.innerHTML = template;
    сontainer.classList.add('game-container');
    rootNode.append(сontainer);

    this.setViewValue();
    const backPalette = document.querySelector('back-palette') as HTMLElement;
    const treePalette = document.querySelector('tree-palette') as HTMLElement;
    const lightropePalette = document.querySelector('lightrope-palette') as HTMLElement;
    const viewTreeElement = document.querySelector('view-tree') as ViewTreeComponent;

    backPalette.addEventListener('backUpdated', (e: any) => {
      viewTreeElement.updateBackground(e.detail.url);
      this.saveViewValuesToLocalstorage(e.detail.url, 'background');
    });

    treePalette.addEventListener('treeUpdated', (e: any) => {
      viewTreeElement.updateTree(e.detail.url);
      this.saveViewValuesToLocalstorage(e.detail.url, 'tree');
    });

    lightropePalette.addEventListener('lightropeUpdated', (e: any) => {
      viewTreeElement.updateLightrope(e.detail);
      this.saveViewValuesToLocalstorage(e.detail, 'rope');
    });

    changeSnow(viewTreeElement);
    return this.container;
  }


  private saveViewValuesToLocalstorage(value: string|LighropeModel, name: string) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  private loadViewValuesFromLocalstorage(name: string): string | null | LighropeModel {
    const viewValues = localStorage.getItem(name);

    return viewValues ? JSON.parse(viewValues) : null;
  }

  private setViewValue() {
    const viewTreeElement = document.querySelector('view-tree') as ViewTreeComponent;
    if (localStorage.background) {
      const url = this.loadViewValuesFromLocalstorage('background') as string;
      viewTreeElement.updateBackground(url);
    }

    if (localStorage.tree) {
      const url = this.loadViewValuesFromLocalstorage('tree') as string;
      viewTreeElement.updateTree(url);
    }

    if (localStorage.rope) {
      const object = this.loadViewValuesFromLocalstorage('rope') as LighropeModel;
      viewTreeElement.updateLightrope(object);
    }
  }

}
export default GamePage;


