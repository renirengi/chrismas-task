import {
  AppliedFiltersModel,
  ElementNoUiSlider,
  FilterElements,
  FilterNames,
  SortFilterValues,
} from '../interfaces/interface';
import { cardFiltersTemplate } from './card-filters.component.template';
import noUiSlider, { Options } from 'nouislider';

export default class CardFiltersComponent extends HTMLElement {

  private readonly countSliderConfig = {
    start: [1, 12],
    snap: true,
    connect: true,
    behaviour: 'drag',
    range: { min: 1, '9.1%': 2, '18.2%': 3, '27.3%': 4, '36.4%': 5, '45.5%': 6, '54.6%': 7, '63.7%': 8, '72.8%': 9, '81.9%': 10, '91%': 11, max: 12 },
  }

  private readonly yearSliderConfig = {
    start: [1940, 2020],
    snap: true,
    connect: true,
    behaviour: 'drag',
    range: {
      min: 1940,
      '10%': 1948,
      '20%': 1956,
      '30%': 1964,
      '40%': 1972,
      '50%': 1980,
      '60%': 1988,
      '70%': 1996,
      '80%': 2004,
      '90%': 2012,
      max: 2020,
    },
  };

  private readonly defaultFilterValues = { sort: SortFilterValues.az };

  public filterValues: Partial<AppliedFiltersModel> = this.defaultFilterValues;

  private filterElements = {} as FilterElements;

  public connectedCallback() {
    this.innerHTML = cardFiltersTemplate;

    const name = this.querySelector('.search-element-container input') as HTMLElement;

    const shape = Array.from(this.querySelectorAll('.shape button')) as HTMLElement[];
    const color = Array.from(this.querySelectorAll('.color button')) as HTMLElement[];
    const size = Array.from(this.querySelectorAll('.size button')) as HTMLElement[];
    const favorite = this.querySelector('.favorite-input') as HTMLInputElement;
    const count = this.initSlider('.count-slider', this.countSliderConfig);
    const year = this.initSlider('.year-slider', this.yearSliderConfig);
    const sort = this.querySelector('.sort-select') as HTMLSelectElement;

    this.filterElements = { name, count, year, shape, color, size, favorite, sort };

    this.addEventListener('click', this.filterClickHandler.bind(this));
    count.noUiSlider.on('update', (e) => this.sliderSlideHandler(e, 'count'));
    year.noUiSlider.on('update', (e) => this.sliderSlideHandler(e, 'year'));
  }

  public setDefaulFilterValues(storedFilterValues: Partial<AppliedFiltersModel> | null): void {
    this.filterValues = storedFilterValues || this.defaultFilterValues;
    this.emitEvent();
  }

  private sliderSlideHandler(values: string[], filterKey: FilterNames): void {
    const [min, max] = values;

    this.filterValues = { ...this.filterValues, [filterKey]: [+min, +max] };
    this.emitEvent();
  }

  private filterClickHandler(e: Event): void {
    const target = e.target as HTMLElement;
    const { shape, color, size, sort, favorite } = this.filterElements;

    if ([...shape].includes(target)) {
      this.applyColorFilter(target, 'shape');
    } else if ([...color].includes(target)) {
      this.applyColorFilter(target, 'color');
    } else if ([...size].includes(target)) {
      this.applyColorFilter(target, 'size');
    } else if (target === sort) {
      if (sort.value !== this.filterValues.sort) {
        this.filterValues = { ...this.filterValues, sort: sort.value as SortFilterValues };
        this.emitEvent();
      }
    } else if (target === favorite) {
      if (favorite.checked !== this.filterValues.favorite) {
        this.filterValues = { ...this.filterValues, favorite: favorite.checked };
        this.emitEvent();
      }
    }
  }

  private applyColorFilter(target: HTMLElement, filterKey: FilterNames): void {
    target.classList.toggle('active');
    const reducer = (acc: string[], el: HTMLElement) =>
      el.classList.contains('active') ? [...acc, el.getAttribute('data-filter') as string] : acc;

    const filterElements = this.filterElements[filterKey] as HTMLElement[];
    const filterValue = filterElements.reduce(reducer, [] as string[]);

    this.filterValues = { ...this.filterValues, [filterKey]: filterValue };

    this.emitEvent();
  }

  private emitEvent() {
    const detail = { filterValues: this.filterValues };

    this.dispatchEvent(new CustomEvent('filtersUpdated', { detail }));
  }

  private initSlider(selector: string, config: Options): HTMLElement & ElementNoUiSlider {
    const yearSlider = this.querySelector(selector) as HTMLElement;
    const [minSpan, maxSpan] = Array.from(yearSlider.parentNode?.querySelectorAll('span') as NodeListOf<HTMLSpanElement>);
    const updateLables = ([min, max]: string[]) => {
      minSpan.innerText = (+min).toString();
      maxSpan.innerText = (+max).toString();
    };

    noUiSlider.create(yearSlider, config);

    (yearSlider as HTMLElement & ElementNoUiSlider).noUiSlider.on('update', (e) => updateLables(e));

    return yearSlider as HTMLElement & ElementNoUiSlider;
  }
}
