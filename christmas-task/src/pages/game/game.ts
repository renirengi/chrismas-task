import Page from '../../core/templates/page';
import { changeVisibility } from '../../utils'

///import GameBackgroundComponent from '../../core/components/game-background.component';


class GamePage extends Page{
  ///private usedElements!: GameBackgroundComponent;

  constructor(id:string) {
    super(id);

  }

  render() {
    changeVisibility('ЁЛОЧКА');
    //console.log(this.usedElements);
    /*const rootNode = document.querySelector('.main-container') as HTMLElement;
    const template = `
    <div class="game-container">
      <div class="left-side-menu">
       <div class="snow-svg-buttons">
         <button class="music-button"></button>
         <button class="snow-button"></button>
       </div>
        <div class="trees">
          <h3>Выберите ёлку</h3>
          <div class="trees-container">
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/1.png" alt="0"/>
            </div>
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/2.png" alt="0"/>
            </div>
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/3.png" alt="0"/>
            </div>
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/4.png" alt="0"/>
            </div>
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/5.png" alt="0"/>
            </div>
            <div class="tree-container">
              <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/6.png" alt="0"/>
            </div>
          </div>
        </div>
        <div class="backgrounds">
          <h3>Выберите фон</h3>
          <div class="backgrounds-container">
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/1.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/2.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/3.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/4.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/5.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/6.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/7.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/8.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/9.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/bg/10.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://st3.depositphotos.com/6064568/13013/v/600/depositphotos_130133486-stock-illustration-christmas-town-illustration-xmas-snowy.jpg" alt="0"/>
          </div>
          <div class="background-container">
            <img src="https://img5.goodfon.ru/wallpaper/nbig/1/ba/tekstura-snezhinki-zima-novyi-god-rozhdestvo-goluboi-fon-dom.jpg" alt="0"/>
          </div>
          </div>
        </div>
        <div class="lightrope-container">
          <h3>Гирлянда</h3>
          <div class="light-container">
            <div class="multicolor-light"></div>
            <div class="red-light"></div>
            <div class="blue-light"></div>
            <div class="yellow-light"></div>
            <div class="green-light"></div>
          </div>
          <div class="btn-container">
          <div class="switch-btn"></div>
          </div>
        </div>
      </div>
      <div class="tree-game-container"></div>
      <div class="right-side-menu">
        <div class="used-toys-container">
          <h3>Игрушки</h3>
          <div class="used-toy-container"></div>
        </div>
        <div class="used-trees-container">
          <h3>Вы нарядили</h3>
          <div class="used-tree-container"></div>
        </div>
      </div>
    `;
    rootNode.innerHTML=template;*/

    return this.container;
  }




}


export default GamePage;
