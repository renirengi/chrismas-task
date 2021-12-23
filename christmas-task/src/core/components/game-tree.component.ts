
import { AppliedBackNamesModel, BackgroundImageElements, ChristmasTree, LightropeElements, TreeImageElements } from '../interfaces/game';



export default class CardTreeComponent extends HTMLElement {

  trees:TreeImageElements = {
    tree: ['assets/tree/1.png','assets/tree/2.png','assets/tree/3.png','assets/tree/4.png', 'assets/tree/5.png','assets/tree/6.png']
  }

  background:BackgroundImageElements = {
    background: ['assets/bg/1.png', 'assets/bg/2.png', 'assets/bg/3.png', 'assets/bg/4.png', 'assets/bg/5.png', 'assets/bg/6.png', 'assets/bg/7.png', 'assets/bg/8.png', 'assets/bg/9.png', 'assets/bg/10.png'],
  }

  light:LightropeElements = {
    light: ['multi-color', 'red', 'blue', 'yellow', 'green']
  }

  public connectedCallback() {
    //this.innerHTML = 'Загрузка...';
    const treeContainer = document.querySelector('.tree-game-container') as HTMLElement;
    treeContainer.append(this.createTreeCard());
  }

  private createTreeCard (): HTMLElement{
    const treeContainer = document.createElement('div');
    treeContainer.classList.add('tree-container-background')
    const treeCardTemplate = `
    <img class="background-game-background" src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/1.jpg" alt="0"/>
    <img class="tree-card" src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/1.png" alt="0"/>

    `
    treeContainer.innerHTML=treeCardTemplate;
    return treeContainer;

  }
}
