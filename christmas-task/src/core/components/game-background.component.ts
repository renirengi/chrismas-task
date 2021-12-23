import {
  TreeImageElements,
  BackgroundImageElements,
  LightropeElements,
  UsedElements,
  BackNames,
  AppliedBackNamesModel,
  BackNamesValues,
} from '../interfaces/game';
import { gameBackgroundTemplate } from './game-background.component.template';

export default class GameBackgroundComponent extends HTMLElement {

  trees:TreeImageElements = {
    tree: ['assets/tree/1.png','assets/tree/2.png','assets/tree/3.png','assets/tree/4.png', 'assets/tree/5.png','assets/tree/6.png']
  }

  background:BackgroundImageElements = {
    background: ['assets/bg/1.png', 'assets/bg/2.png', 'assets/bg/3.png', 'assets/bg/4.png', 'assets/bg/5.png', 'assets/bg/6.png', 'assets/bg/7.png', 'assets/bg/8.png', 'assets/bg/9.png', 'assets/bg/10.png'],
  }

  light:LightropeElements = {
    light: ['multi-color', 'red', 'blue', 'yellow', 'green']
  }

  private readonly defaultBackNameValues: AppliedBackNamesModel = {
    tree: '0',
    background: '0',
    light: '',
    status: false,
    };

  public usedValues: AppliedBackNamesModel = this.defaultBackNameValues;

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

  public initialize(storedBackgroundValues: Partial<AppliedBackNamesModel> | null): void {
    if (storedBackgroundValues) {
      this.usedValues = {...this.defaultBackNameValues, ...storedBackgroundValues };
    } else {
      this.usedValues = this.defaultBackNameValues;
    }

    this.applyUsedValues();
    this.emitEvent();
  }

  private applyUsedValues() {
    Object.entries(this.usedValues).forEach(([key, value]) => this.applyUsedValue(key as BackNames, value));
  }

  private applyUsedValue(key: BackNames, value: BackNamesValues) {
    const applyBackground = () => {
      const usedElements = this.usedElements[key] as HTMLElement[];
      const usedValues = value as string;
      console.log(usedElements,usedValues)
    };
  }

  private gameBackgroundClickHandler(e: Event): void {
    const target = e.target as HTMLElement;
    const { tree, background, light, status } = this.usedElements;

    if ([...tree].includes(target)) {
       const elementIndex:number= tree.indexOf(target);
      this.applyBackground(target, 'tree', elementIndex);
          } else if ([...background].includes(target)) {
      const elementIndex:number= background.indexOf(target);
      this.applyBackground(target, 'background', elementIndex);
    } else if ([...light].includes(target)) {
      const elementIndex:number= light.indexOf(target);
      this.applyBackground(target,'light', elementIndex);
    }
      else if (target===status){
        target.classList.toggle('switch-on');
        this.applyBtn(target);
      }
  }

  private applyBackground( target:HTMLElement,filterKey: BackNames, index:number){
    target.classList.toggle('used');
    const usedValue = index.toString();

    this.usedValues = {...this.usedValues, [filterKey]: usedValue };
    this.emitEvent();
  }

  private applyBtn(target:HTMLElement){
    if (target.classList.contains('switch-on')){
      const usedValue= true;
      this.usedValues = {...this.usedValues, ['status']: usedValue };
    }
    else {
      const usedValue= false;
      this.usedValues = {...this.usedValues, ['status']: usedValue };
    }
    console.log(this.usedElements);
  }

  private emitEvent() {
    const detail = { usedValues: this.usedValues };
        this.dispatchEvent(new CustomEvent('backUpdated', { detail }));
  }
}
