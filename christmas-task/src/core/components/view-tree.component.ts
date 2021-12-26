import { LighropeModel } from '../interfaces';
import { getToyImageUrl } from './game-palettes/game-palettes-constants';

const template = `
    <div class="christmas-tree">
    <p class="tree-map">
    <map id="map6" name="map">
    <area alt="map6" shape="poly" coords="8,621,51,642,64,638,67,665,102,659,110,674,127,673,140,682,162,677,179,675,167,689,200,699,173,703,218,688,234,685,254,701,275,695,302,707,301,693,345,690,346,680,376,677,398,671,414,658,425,651,433,645,476,652,452,632,473,623,439,610,450,601,446,583,487,586,458,570,468,558,444,555,461,533,429,522,454,508,417,499,447,488,416,470,448,469,422,448,383,428,424,416,401,399,383,391,437,382,402,370,412,350,396,346,396,340,371,334,370,322,400,313,374,304,361,295,393,284,366,277,368,263,382,248,347,236,347,227,364,200,339,201,336,188,341,178,342,165,326,171,323,155,333,139,318,138,319,131,320,120,307,119,303,110,303,102,302,91,293,89,286,89,277,92,292,76,297,65,291,53,287,39,270,61,261,47,256,11,247,74,229,53,234,90,208,81,215,103,205,100,212,126,192,118,189,132,189,147,205,161,183,156,160,153,182,166,168,170,165,164,171,191,180,202,171,203,163,214,154,211,152,207,137,204,148,216,168,239,152,251,140,255,121,255,123,264,153,265,157,274,144,276,133,285,121,289,104,285,104,298,114,300,135,313,135,321,124,329,109,337,95,327,98,340,100,349,110,360,99,360,76,359,63,360,67,370,89,370,104,370,119,378,119,389,103,382,93,383,82,383,84,391,89,396,89,407,91,416,80,418,71,425,63,427,55,432,70,439,75,445,86,451,81,462,63,462,70,461,55,461,75,474,77,481,82,492,74,493,64,494,56,492,56,501,43,504,34,511,49,516,62,516,75,529,62,530,52,531,36,544,54,549,45,555,35,556,25,558,34,565,52,566,45,574,61,589,50,586,51,597,42,604">
    </map></p>
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
    <ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div>


  `;

interface ViewElementsModel {
  backContainer: HTMLElement;
  treeContainer: HTMLElement;
  lightrope: HTMLElement;
  map:HTMLElement;
}

export class ViewTreeComponent extends HTMLElement {
  private viewElements = {} as ViewElementsModel;

  public connectedCallback() {
    this.innerHTML = template;
    this.viewElements.backContainer = this;
    this.viewElements.treeContainer = document.querySelector('.christmas-tree') as HTMLElement;
    this.viewElements.lightrope = document.querySelector('.lightrope') as HTMLElement;
    this.viewElements.map = document.querySelector('area') as HTMLElement;
    this.addEventListener('dragenter', (e) => this.dragEnter(e));
    this.addEventListener('dragover',  (e) => this.dragEnter(e));
    this.addEventListener('dragleave', () => this.dragEnd());
    this.addEventListener('drop', (e) => this.drop(e));
  }

  public updateBackground(url: string): void {
    this.viewElements.backContainer.style.backgroundImage = `url(${url})`;
  }

  public updateTree(url: string): void {
    const img= document.createElement('img');
    img.setAttribute("usemap","#map");
    img.setAttribute("src", url);
    img.setAttribute("alt", "tree");
    this.viewElements.treeContainer.prepend(img);
    ///this.viewElements.treeContainer.style.backgroundImage = ${url});
  }

  public updateLightrope(rope: LighropeModel): void {
    const btn = document.querySelector('.switch-btn') as HTMLElement;
    this.viewElements.lightrope.removeAttribute('class');
    this.viewElements.lightrope.classList.add('lightrope');
    this.viewElements.lightrope.classList.add(rope.color);

    if(rope.state==false){
      this.viewElements.lightrope.style.visibility='hidden';
      if(btn.classList.contains('switch-on')){
        btn.classList.remove('switch-on');
      }
    }
    else if(rope.state==true){
      if(!btn.classList.contains('switch-on')){
        btn.classList.add('switch-on');
      }
      this.viewElements.lightrope.style.visibility='visible';
    }

  }

  private createToy(x: number, y: number, url: string) {
    const toy = document.createElement('div');

    toy.classList.add('toy');
    toy.style.top = `${y - 25}px`;
    toy.style.left = `${x -25}px`;
    toy.style.backgroundImage = `url(${url})`;

    return toy;
  }

  private dragEnter(e: DragEvent): void {
    e.preventDefault();
    this.classList.add('drag-over');
  }

  private drop(e: DragEvent): void {
    const {offsetX, offsetY} = e;
    const index = e.dataTransfer?.getData('text/plain') as string;

    this.viewElements.map.appendChild(this.createToy(offsetX, offsetY, getToyImageUrl(index)));

    const detail = { index };
    this.dispatchEvent(new CustomEvent('toyDropped', { detail, bubbles: true }));

    this.dragEnd();
  }

  private dragEnd(): void {
    this.classList.remove('drag-over');
  }
}
