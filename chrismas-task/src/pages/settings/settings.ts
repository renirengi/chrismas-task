/* eslint-disable @typescript-eslint/ban-ts-comment */
import Page from '../../core/templates/page';
import { changeVisibility } from '../../utils';
import data from '../../toys';
import { createCardElement } from '../settings/card.component'
import { AppliedFiltersModel, Card, FilterNames, AppliedFilterValues } from '../../core/interfaces/interface';

export interface FilterElements {
  shapeFilters: HTMLElement[],
  colorFilters: HTMLElement[],
  sizeFilters: HTMLElement[],
}

class SettingsPage extends Page {

  private filterElements: FilterElements = {
    shapeFilters: [],
    colorFilters: [],
    sizeFilters: [],
  };

  // Model
  private cards: Card[] = [];
  // View
  private cardElements = [] as HTMLElement[];

  constructor(id: string) {
    super(id);
    this.cards = this.loadCards();
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
  }

  private makeAllContainer() {
    const toysContainer: HTMLElement = document.createElement('div');
    this.cardElements = this.cards.map((card, i) => this.createCardElement(card, i));

    toysContainer.classList.add('toys-container');
    toysContainer.append(...this.cardElements);

    return toysContainer;
  }

  private makeFilterContainer() {
    const filterContainer: HTMLElement = document.createElement('div');

    filterContainer.classList.add('filter');

    const filterCardTemplate = `
      <div class="controls-title">Фильтры по значению</div>
      <div class="shape">Форма:
        <button data-filter="шар"></button>
        <button data-filter="колокольчик"></button>
        <button data-filter="шишка"></button>
        <button data-filter="снежинка"></button>
        <button data-filter="фигурка"></button>
      </div>
      <div class="color">Цвет:
        <button data-filter="белый"></button>
        <button data-filter="желтый"></button>
        <button data-filter="красный"></button>
        <button data-filter="синий"></button>
        <button data-filter="зелёный"></button>
      </div>
      <div class="size">Размер:
        <button data-filter="большой"></button>
        <button data-filter="средний"></button>
        <button data-filter="малый"></button>
      </div>
      <div class="favorite-container">
        Только любимые:
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

    this.filterElements.shapeFilters = Array.from(filterContainer.querySelectorAll('.shape button'));
    this.filterElements.colorFilters = Array.from(filterContainer.querySelectorAll('.color button'));
    this.filterElements.sizeFilters = Array.from(filterContainer.querySelectorAll('.size button'));

    filterContainer.addEventListener('click', this.filterClickHandler.bind(this));
    return filterContainer;
  }

  private filterClickHandler(e: Event) {
    const target = e.target as HTMLElement;
    const {shapeFilters, colorFilters, sizeFilters} = this.filterElements;

    if ([...shapeFilters, ...colorFilters, ...sizeFilters].includes(target)) {
      target.classList.toggle('active');
    }

    this.applyFilters();
  }

   applyFilters() {
    const {shapeFilters, colorFilters, sizeFilters} = this.filterElements;
    const reducer = (acc: string[], el: HTMLElement) => el.classList.contains('active') ? [...acc, el.getAttribute('data-filter') as string] : acc;
    const shapeFilterValues = shapeFilters.reduce(reducer, [] as string[]);
    const colorFilterValues = colorFilters.reduce(reducer, [] as string[]);
    const sizeFilterValues = sizeFilters.reduce(reducer, [] as string[]);

    const filterValues: Partial<AppliedFiltersModel> = {shape: shapeFilterValues, color: colorFilterValues, size: sizeFilterValues};
    const filteredCards = this.cards.filter((card: Card) => this.filterCard(card, filterValues));
    const visibleCards = filteredCards.map((card) => card.num);
    console.log(visibleCards);

    this.cardElements.forEach((elem, i) => this.applyCardVisibility(elem, visibleCards.includes(i)));
  }

  private filterCard(card: Card, appliedFilters: Partial<AppliedFiltersModel>): boolean {
      const predicate = ([filterName, filterValue]: [FilterNames, AppliedFilterValues]): boolean => {
      const cardValue = card[filterName];
      const isNameFilter = () => typeof filterValue === 'string';
      const isFavoritesFilter = () => typeof filterValue === 'boolean';
      const isEmptyArray = () => Array.isArray(filterValue) && filterValue.length === 0;
      const isNumberFilter = () => Array.isArray(filterValue) && typeof filterValue[0] === 'number';

      if (!filterValue || !cardValue || isEmptyArray()) {
        return true;
      } else if (isNameFilter()) {
        return (cardValue as string).includes(filterValue as string);
      } else if (isFavoritesFilter()) {
        return filterValue as boolean && (cardValue as boolean);
      } else if (isNumberFilter()) {
        const [start, end] = filterValue as number[];

        return start <= cardValue && cardValue >= end;
      } else {
        return (filterValue as string[]).includes(cardValue as string);
      }
    };

    // @ts-ignore
    return Object.entries(appliedFilters).every(predicate);
  }

  private applyCardVisibility(cardElement: HTMLElement, shouldBeVisible: boolean): void {
    ///console.log(cardElement);
    const elementVisible = cardElement.style.display !== 'none';

    ///console.log(cardElement, elementVisible, shouldBeVisible)

    if (elementVisible && !shouldBeVisible) {
      cardElement.style.display = 'none';
   } else if (!elementVisible && shouldBeVisible) {
      cardElement.style.display = 'block';

    }
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
        <p class="shape">Форма игрушки: ${shape}</p>
        <p class="color">Цвет игрушки: ${color}</p>
        <p class=""size">Размер игрушки: ${size}</p>
        <div class="tape"></div>
        <p>Любимая: ${favorite === true ? 'да' : 'нет'}</p>
        </div>
      `;
    const cardElement: HTMLElement = document.createElement('div');

    cardElement.classList.add('toy-container');
    cardElement.innerHTML = toyCardTemplate;
    cardElement.style.display = 'block'

    return cardElement;
  }

  private loadCards(): Card[] {
    return data.map((item, index) => {
      const {name, count, year, shape, color, size, favorite} = item;

      return {num: index, name, count: +count, year: +year, shape, color, size, favorite}
    });
  }

  
}

export default SettingsPage;
