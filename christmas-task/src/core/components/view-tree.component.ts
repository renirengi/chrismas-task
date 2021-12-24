import { LighropeModel } from '../interfaces';

const template = `
    <div class="christmas-background">
    <div class="christmas-tree"><div>
    <li class="lightrope"><li></li><li></li><li></li><li></li><li></li></li>
    </div>
  `;

interface ViewElementsModel {
  backContainer:HTMLElement;
  treeContainer: HTMLElement;
  lightrope: HTMLElement;
}

export class ViewTreeComponent extends HTMLElement {
  private viewElements = {} as ViewElementsModel;

  public connectedCallback() {
    this.innerHTML = template;
    this.viewElements.backContainer = document.querySelector('.christmas-background') as HTMLElement;
    this.viewElements.treeContainer = document.querySelector('.christmas-tree') as HTMLElement;
    this.viewElements.lightrope = document.querySelector('.lightrope') as HTMLElement;
  }

  public updateBackground(url: string): void {
    this.viewElements.backContainer.style.backgroundImage = `url(${url})`;
  }

  public updateTree(url: string): void {
    this.viewElements.treeContainer.style.backgroundImage = `url(${url})`;
  }

  public updateLightrope(rope: LighropeModel): void {
    console.log('Do something', rope);
  }

}
