import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'
import data from '../../toys';
import { Card } from '../../core/interfaces/interface';


class SettingsPage extends Page{
  /*static TextObject = {
    MainTitle: 'Settings Page',
  };*/

  constructor(id:string) {
    super(id);
  }

  render() {
    changeVisibility('Settings Page');
    this.makeContainer();
    //this.clearContainer();
    //const title = this.createHeaderTitle(SettingsPage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }

  private makeContainer() {
    const сontainer: HTMLElement = document.createElement('div');
    сontainer.classList.add('content-container');
    (document.querySelector('.main-container') as HTMLElement).append(сontainer);
    сontainer.append(this.makeAllContainer());
  }

  private makeAllContainer() {
    const toysContainer: HTMLElement = document.createElement('div');
    const cards = this.loadCards();
    const cardElements = cards.map((card, i) => this.createCardElement(card, i));

    toysContainer.classList.add('toys-container');
    toysContainer.append(...cardElements);

    return toysContainer;
  }

  private createCardElement(card: Card, cardIndex: number): HTMLElement {
    const { name, count, year, shape, color, size, favorite } = card;
    const imgIndex = cardIndex + 1;
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${imgIndex}.png`;
    const toyCardTemplate = `
        <h2>${name}</h2>
        <img src="${url}" alt="${name}"/>
        <p>Количество: ${count}</p>
        <p>Год покупки: ${year}</p>
        <p>Форма игрушки: ${shape}</p>
        <p>Цвет игрушки: ${color}</p>
        <p>Размер игрушки: ${size}</p>
        <div class="tape"></div>
        <p>Любимая: ${favorite===true? 'да': 'нет'}</p>
        </div>
      `;
    const cardElement: HTMLElement = document.createElement('div');

    cardElement.classList.add('toy-container');
    cardElement.innerHTML = toyCardTemplate;

    return cardElement;
  }

  private loadCards(): Card[] {
    return data as Card[];
  }
}

export default SettingsPage;
