import Page from '../../core/templates/page'
import { changeVisibility, removeContainer, changeSnow } from '../../utils'

class MainPage extends Page {

  /*static TextObject = {
    MainTitle: 'Main Page',
  };*/

  constructor(id:string) {
    super(id);
  }


  render() {
    changeVisibility('ДОМОЙ')
    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const template = `
    <div class="main-home-container">
    <h1>Помогите бабушке нарядить ёлку</h1>
    <a href= "#settings-page" class="main-title">Начать</a>
    </div>
    `
    rootNode.innerHTML=template;
    const buttonElement = document.querySelector('.main-title') as HTMLElement;
    buttonElement.addEventListener('click', () => {
      const mainHomeContainer=document.querySelector('.main-container') as HTMLElement;
      mainHomeContainer.innerHTML=''});
    removeContainer(rootNode);

    return this.container;
  }



}

export default MainPage;
