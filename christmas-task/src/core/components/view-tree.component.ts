import { LighropeModel } from '../interfaces';
import { getToyImageUrl } from './game-palettes/game-palettes-constants';

const template = `
    <div class="christmas-tree">
      <img usemap="#tree-map" alt="christmas-tree" width="515" height="967">
      <map name="tree-map">
        <area  href="https://developer.mozilla.org/docs/Web/CSS" shape="poly" coords="1,619,58,365,151,147,259,-1,297,36,369,191,495,577,481,649,305,703,170,698,107,681,58,657,23,637,7,631,25,627">
      </map>
    <div>
    <div class="lightrope">
      <ul><li></li><li></li></ul>
      <ul><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
      <ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    </div>
  `;

interface ViewElementsModel {
  backContainer: HTMLElement;
  treeContainer: HTMLElement;
  lightrope: HTMLElement;
  map: HTMLElement;
}

export class ViewTreeComponent extends HTMLElement {
  private viewElements = {} as ViewElementsModel;

  public connectedCallback() {
    this.innerHTML = template;
    this.viewElements.backContainer = this;
    this.viewElements.treeContainer = document.querySelector('.christmas-tree img') as HTMLElement;
    this.viewElements.lightrope = document.querySelector('.lightrope') as HTMLElement;
    this.viewElements.map = document.querySelector('area') as HTMLElement;

    const map = document.querySelector('.christmas-tree map area') as HTMLElement;

    map.addEventListener('dragenter', (e) => this.dragEnter(e));
    map.addEventListener('dragover', (e) => this.dragEnter(e));
    map.addEventListener('dragleave', () => this.dragEnd());
    map.addEventListener('drop', (e) => this.drop(e));

  }

  public updateBackground(url: string): void {
    this.viewElements.backContainer.style.backgroundImage = `url(${url})`;
  }

  public updateTree(url: string): void {
    this.viewElements.treeContainer.setAttribute('src', url);
  }

  public updateLightrope(rope: LighropeModel): void {
    const btn = document.querySelector('.switch-btn') as HTMLElement;
    this.viewElements.lightrope.removeAttribute('class');
    this.viewElements.lightrope.classList.add('lightrope');
    this.viewElements.lightrope.classList.add(rope.color);

    if (rope.state == false) {
      this.viewElements.lightrope.style.visibility = 'hidden';
      if (btn.classList.contains('switch-on')) {
        btn.classList.remove('switch-on');
      }
    } else if (rope.state == true) {
      if (!btn.classList.contains('switch-on')) {
        btn.classList.add('switch-on');
      }
      this.viewElements.lightrope.style.visibility = 'visible';
    }
  }

  private createToy(x: number, y: number, url: string) {
    const toy = document.createElement('div');

    toy.classList.add('toy');
    toy.style.top = `${y - 25}px`;
    toy.style.left = `${x - 25}px`;
    toy.style.backgroundImage = `url(${url})`;
    toy.setAttribute("draggable","true");

    return toy;
  }

  private dragOnMap(e:DragEvent):void {
    this.classList.add('dragged');

    const map = document.querySelector('.christmas-tree map area') as HTMLElement;
    map.addEventListener('dragenter', (e) => this.dragEnter(e));
    map.addEventListener('dragleave', () => this.dragEnd());
    map.addEventListener('drop', (e) => this.drop(e));

  }


  private dragEnter(e: DragEvent): void {
    e.preventDefault();
    this.classList.add('drag-over');
  }


  private drop(e: DragEvent): void {
    const { offsetX, offsetY } = e;
    const index = e.dataTransfer?.getData('text/plain') as string;
    console.log(index);
    this.viewElements.map.appendChild(this.createToy(offsetX, offsetY, getToyImageUrl(index)));

    const detail = { index };
    this.dispatchEvent(new CustomEvent('toyDropped', { detail, bubbles: true }));

    this.dragEnd();
  }

  private dragEnd(): void {
    this.classList.remove('drag-over');
  }
}
