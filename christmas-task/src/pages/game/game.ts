import {
  AppliedBackNamesModel,
  TreeImageElements,
  BackgroundImageElements,
  LightropeElements,
  UsedElements,
  BackNames,
  BackNamesValues,
} from '../../core/interfaces/game';
import Page from '../../core/templates/page';
import { changeVisibility } from '../../utils';
import CardTreeComponent from '../../core/components/game-tree.component';
import GameBackgroundComponent from '../../core/components/game-background.component';


class GamePage extends Page{
  private usedElement!: GameBackgroundComponent;
  private treeElement!: CardTreeComponent;
  constructor(id:string) {
    super(id);

  }

  render() {
    changeVisibility('ЁЛОЧКА');

    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const сontainer: HTMLElement = document.createElement('div');

    сontainer.innerHTML = `
        <game-background class='left-side-menu'></game-background>
        <tree-game class='tree-game-container'></tree-game>
      `;
    сontainer.classList.add('game-container');
    rootNode.append(сontainer);

    this.usedElement = сontainer.querySelector('game-background') as GameBackgroundComponent;

    this.usedElement.addEventListener('backUpdated',(e)=> {
      this.backgroundUpdateHandler((e as CustomEvent).detail);
    });

   return this.container;
  }

  private backgroundUpdateHandler(usedValues:Partial<AppliedBackNamesModel>):void{
     console.log(usedValues.usedValues.background)
    }


}


export default GamePage;
