import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'
import data from '../../toys';
import { Card } from '../../core/interfaces/interface';
import { filter } from 'minimatch';


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
    сontainer.append(this.makeFilterContainer());
    сontainer.append(this.makeAllContainer());
    this.saveDataValue();
  }

  private makeAllContainer() {
    const toysContainer: HTMLElement = document.createElement('div');
    const cards = this.loadCards();
    const cardElements = cards.map((card, i) => this.createCardElement(card, i));

    toysContainer.classList.add('toys-container');
    toysContainer.append(...cardElements);

    return toysContainer;
  }

  private makeFilterContainer() {
    const filterContainer: HTMLElement = document.createElement('div');
    filterContainer.classList.add('filter');
    const filterCardTemplate=`
    <div class="controls-title">Фильтры по значению</div>
        <div class="shape">Форма:
          <button class="button" data-filter="шар"></button>
          <button class="button" data-filter="колокольчик"></button>
          <button class="button" data-filter="шишка"></button>
          <button class="button" data-filter="снежинка"></button>
          <button class="button" data-filter="фигурка"></button>
        </div>
        <div class="color">Цвет:
          <button class="button" data-filter="белый"></button>
          <button class="button" data-filter="желтый"></button>
          <button class="button" data-filter="красный"></button>
          <button class="button" data-filter="синий"></button>
          <button class="button" data-filter="зелёный"></button>
        </div>
        <div class="size">Размер:
          <button class="button" data-filter="большой"></button>
          <button class="button" data-filter="средний"></button>
          <button class="button" data-filter="малый"></button>
        </div>
        <div class="favorite-container">Только любимые:
          <div class="form-group">
            <input type="checkbox" class="favorite-input" id="checkbox" />
            <label for="checkbox" class="favorite-input-label"></label>
          </div>
        </div>

      </div>
      <div class="range">
        <div class="controls-title">Фильтры по диапазону</div>
        <div class="count">
          <span class="control-span">Количество экземпляров:</span>
          <div class="count-slider-container">
            <output class="slider-output">1</output>
            <div class="count-slider"></div>
            <output class="slider-output">12</output>
          </div>
        </div>
        <div class="year">
          <span class="control-span">Год приобретения:</span>
          <div class="year-slider-container">
            <output class="slider-output">1940</output>
            <div class="year-slider"></div>
            <output class="slider-output">2020</output>
          </div>
        </div>
      </div>
      <div class="sort">
        <div class="controls-title">Сортировка</div>
        <select class="sort-select">
          <option selected value="sort-name-max">По названию от «А» до «Я»</option>
          <option value="sort-name-min">По названию от «Я» до «А»</option>
          <option value="sort-count-max">По количеству по возрастанию</option>
          <option value="sort-count-min">По количеству по убыванию</option>
        </select>
        <button class="reset">Сброс фильтров</button>
      </div>
      `;
      filterContainer.innerHTML = filterCardTemplate;
      return filterContainer;
  }

  private saveDataValue(){
    const buttonGroup = document.querySelectorAll('.button');
    const dataValue = buttonGroup.forEach((el) => el.addEventListener('click', () => el.dataset.filter));
    console.log(dataValue);
    return dataValue;
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
