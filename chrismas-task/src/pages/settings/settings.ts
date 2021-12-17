import {
  AppliedFiltersModel,
  Card,
  FilterNames,
  AppliedFilterValues,
  SortFilterValues,
} from '../../core/interfaces/interface';
import { changeVisibility, isNil, removeContainer } from '../../utils';
import CardFiltersComponent from '../../core/components/card-filters.component';
import CardListComponent from '../../core/components/card-list.component';
import data from '../../toys';
import Page from '../../core/templates/page';

class SettingsPage extends Page {
  private cards: Card[] = [];
  private activeCards: number[] = [];
  private filtersElement!: CardFiltersComponent;
  private listElement!: CardListComponent;

  constructor(id: string) {
    super(id);
    this.cards = this.loadCards();
  }

  render() {
    changeVisibility('ИГРУШКИ');

    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const сontainer: HTMLElement = document.createElement('div');
    const storedFilterValues = this.loadFilterValuesFromLocalstorage();

    сontainer.innerHTML = `
        <card-filters class='card-filter-container'></card-filters>
        <card-list class='toys'></card-list>
      `;
    сontainer.classList.add('content-container');
    rootNode.append(сontainer);

    this.filtersElement = сontainer.querySelector('card-filters') as CardFiltersComponent;
    this.listElement = сontainer.querySelector('card-list') as CardListComponent;

    this.filtersElement.addEventListener('filtersUpdated', (e) =>
      this.filtersUpdateHandler((e as CustomEvent).detail.filterValues)
    );

    this.listElement.addEventListener('activeToyChange', (e) => this.activeToyChangeHandler((e as CustomEvent).detail));

    this.filtersElement.setDefaulFilterValues(storedFilterValues);
    removeContainer(rootNode);
    return this.container;
  }

  private filtersUpdateHandler(filterValues: Partial<AppliedFiltersModel>): void {
    const comparators = {
      [SortFilterValues.az]: (a: Card, b: Card) => a.name.localeCompare(b.name),
      [SortFilterValues.za]: (a: Card, b: Card) => b.name.localeCompare(a.name),
      [SortFilterValues.max]: (a: Card, b: Card) => a.count - b.count,
      [SortFilterValues.min]: (a: Card, b: Card) => b.count - a.count,
    };
    const sortComparator = comparators[filterValues.sort || SortFilterValues.az];
    const filteredCards = this.cards.filter((card: Card) => this.filterCard(card, filterValues));
    const sortedCards = filteredCards.sort(sortComparator);

    this.listElement.updateCardList(sortedCards);
    this.saveFilterValuesToLocalstorage(filterValues);
  }

  private activeToyChangeHandler({ cardNum, isActive }: { cardNum: number; isActive: boolean }): void {
    if (isActive) {
      this.activeCards.push(cardNum);
    } else {
      const index = this.activeCards.indexOf(cardNum);

      if (index > -1) {
        this.activeCards.splice(index, 1);
      }
    }

    console.log(this.activeCards);
  }

  private filterCard(card: Card, appliedFilters: Partial<AppliedFiltersModel>): boolean {
    const predicate = ([filterName, filterValue]: [FilterNames, AppliedFilterValues]): boolean => {
      const cardValue = card[filterName];

      const isNameFilter = () => typeof filterValue === 'string';
      const isFavoritesFilter = () => filterName === 'favorite';
      const isEmptyArray = () => Array.isArray(filterValue) && filterValue.length === 0;
      const isNumberFilter = () => Array.isArray(filterValue) && typeof filterValue[0] === 'number';

      if (isNil(filterValue) || isNil(cardValue) || isEmptyArray()) {
        return true;
      } else if (isNameFilter()) {
        return (cardValue as string).includes(filterValue as string);
      } else if (isFavoritesFilter()) {
        return (filterValue as boolean) && (cardValue as boolean);
      } else if (isNumberFilter()) {
        const [start, end] = filterValue as number[];

        return start <= cardValue && cardValue <= end;
      } else {
        return (filterValue as string[]).includes(cardValue as string);
      }
    };

    return Object.entries(appliedFilters).every(predicate);
  }

  private loadCards(): Card[] {
    return data.map((item, index) => {
      const { name, count, year, shape, color, size, favorite } = item;

      return { num: index, name, count: +count, year: +year, shape, color, size, favorite };
    });
  }

  private saveFilterValuesToLocalstorage(filterValues: Partial<AppliedFiltersModel>) {
    localStorage.setItem('filterValues', JSON.stringify(filterValues));
  }

  private loadFilterValuesFromLocalstorage() {
    const filterValues = localStorage.getItem('filterValues');
    return filterValues ? JSON.parse(filterValues) : null;
  }
}

export default SettingsPage;
