import {
  TreeImageElements,
  BackgroundImageElements,
   LightropeElements,
  UsedElements,
  ChristmasTree,
  BackNames,
  BackNamesValues,

} from '../interfaces/interface';
import { gameBackgroundTemplate } from './game-background.component.template';

export default class GameBackgroundComponent extends HTMLElement {

  trees:TreeImageElements = {
    tree: ['assets/tree/1.png','assets/tree/2.png','assets/tree/3.png','assets/tree/4.png', 'assets/tree/5.png','assets/tree/6.png']
  }
  background:BackgroundImageElements = {
    background: ['assets/bg/1.png', 'assets/bg/2.png', 'assets/bg/3.png', 'assets/bg/4.png', 'assets/bg/5.png', 'assets/bg/6.png', 'assets/bg/7.png', 'assets/bg/8.png', 'assets/bg/9.png', 'assets/bg/10.png'],
  }

  private readonly defaultBackNamesValues: BackNamesValues = {
    tree: ['0'],
    background: ['0'],
    light: LightropeElements,
    status: false,
    };

  public usedValues: BackNamesValues = this.defaultBackNamesValues;

  private usedElements = {} as UsedElements;

  public connectedCallback() {
    this.innerHTML = gameBackgroundTemplate;

    const tree = Array.from(this.querySelectorAll('.tree-container')) as HTMLElement[];
    const background = Array.from(this.querySelectorAll('.background-container')) as HTMLElement[];
    const light = Array.from(this.querySelectorAll('.light-container')) as HTMLElement[];
    const status = this.querySelector('.switch-btn') as HTMLElement;

    this.usedElements = { tree, background, light, status }

    this.addEventListener('click', this.gameBackgroundClickHandler.bind(this));
  }

  private gameBackgroundClickHandler(e: Event): void {
    const target = e.target as HTMLElement;
    const { tree, background, light, status } = this.usedElements;

    if ([...tree].includes(target)) {
      console.log(1)
      const elementIndex:number= tree.indexOf(target);
      this.applyBackground(target, 'tree', tree);
    } else if ([...background].includes(target)) {
      console.log(2)
      const elementIndex:number= background.indexOf(target);
      this.applyBackground(target, 'background', background);
    } else if ([...light].includes(target)) {
      console.log(3)
      this.applyBackground(target, 'light', light);
    }
  }

  private applyBackground(target: HTMLElement, filterKey: BackNames, array:HTMLElement[]){
    target.classList.toggle('used');
    const reducer = (acc: string[], el: HTMLElement) =>
      el.classList.contains('used') ? [...acc, array.indexOf(el).toLocaleString() as string] : acc;

      const usedElements=this.usedElements[filterKey];

    const usedValue = usedElements.reduce(reducer, [] as string[]);

    this.usedValues = { ...this.usedValues, [filterKey]: usedValue };

    this.emitEvent();
  }

  private emitEvent() {
    const detail = { usedValues: this.usedValues };
        this.dispatchEvent(new CustomEvent('backUpdated', { detail }));
  }
}
