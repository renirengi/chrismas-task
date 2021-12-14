import { AppliedFiltersModel, FilterElements, FilterNames } from '../interfaces/interface';
import noUiSlider from 'nouislider';
import { makeCountRange, makeYearRange } from './card-filters-range.component'

const cardFiltersTemplate = `
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

export default class CardFiltersComponent extends HTMLElement {

  public filterValues: Partial<AppliedFiltersModel> = {};

  private filterElements = {} as FilterElements;

  public connectedCallback() {
    this.innerHTML = cardFiltersTemplate;
    makeYearRange();
    makeCountRange()

    const name = this.querySelector('.search-element-container input') as HTMLElement;
    const count = Array.from(this.querySelectorAll('.count-slider-container output')) as HTMLElement[];
    const year = Array.from(this.querySelectorAll('.year-slider-container output')) as HTMLElement[];
    const shape = Array.from(this.querySelectorAll('.shape button')) as HTMLElement[];
    const color = Array.from(this.querySelectorAll('.color button')) as HTMLElement[];
    const size = Array.from(this.querySelectorAll('.size button')) as HTMLElement[];
    const favorite = this.querySelector('.favorite-input') as HTMLElement;

    this.filterElements = { name, count, year, shape, color, size, favorite };

    this.addEventListener('click', this.filterClickHandler.bind(this));
  }

    private filterClickHandler(e: Event): void {
    const target = e.target as HTMLElement;
    const { shape, color, size, year, count } = this.filterElements;

    if ([...shape].includes(target)) {
      this.applyColorFilter(target, 'shape');
    } else if ([...color].includes(target)) {
      this.applyColorFilter(target, 'color');
    } else if ([...size].includes(target)) {
      this.applyColorFilter(target, 'size');
    }
    else if ([...count].includes(target)) {
    console.log (23243);
    }
    else if ([...year].includes(target)) {
      this.applyColorFilter(target, 'year');
    }
  }

  private applyColorFilter(target: HTMLElement, filterKey: FilterNames): void {
    target.classList.toggle('active');
    const reducer = (acc: string[], el: HTMLElement) =>
      el.classList.contains('active') ? [...acc, el.getAttribute('data-filter') as string] : acc;

    const filterElements = this.filterElements[filterKey] as HTMLElement[];
    const filterValue = filterElements.reduce(reducer, [] as string[]);

    this.filterValues = {...this.filterValues, [filterKey]: filterValue};

    this.emitEvent();
  }



  private emitEvent() {
    const detail = {filterValues: this.filterValues};

    this.dispatchEvent(new CustomEvent('filtersUpdated', {detail}));
  }
}
