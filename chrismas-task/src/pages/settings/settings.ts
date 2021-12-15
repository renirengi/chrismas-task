
import Page from '../../core/templates/page';
import { changeVisibility } from '../../utils';
import data from '../../toys';
import { AppliedFiltersModel, Card, FilterNames, AppliedFilterValues } from '../../core/interfaces/interface';
import CardFiltersComponent from '../../core/components/card-filters.component';
import CardListComponent from '../../core/components/card-list.component';

class SettingsPage extends Page {
  private cards: Card[] = [];
  private filtersElement!: CardFiltersComponent;
  private listElement!: CardListComponent;

  constructor(id: string) {
    super(id);
    this.cards = this.loadCards();
  }

  render() {
    changeVisibility('Settings Page');

    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const сontainer: HTMLElement = document.createElement('div');

    сontainer.innerHTML = `
        <card-filters></card-filters>
        <card-list></card-list>
      `;
    сontainer.classList.add('content-container');
    rootNode.append(сontainer);

    this.filtersElement = сontainer.querySelector('card-filters') as CardFiltersComponent;
    this.listElement = сontainer.querySelector('card-list') as CardListComponent;

    this.filtersElement.addEventListener('filtersUpdated', (e) =>
      this.filtersUpdateHandler((e as CustomEvent).detail.filterValues)
    );

    this.listElement.updateCardList(this.cards);

    return this.container;
  }

  private filtersUpdateHandler(filterValues: Partial<AppliedFiltersModel>): void {
    const filteredCards = this.cards.filter((card: Card) => this.filterCard(card, filterValues));

    this.listElement.updateCardList(filteredCards);
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
        return (filterValue as boolean) && (cardValue as boolean);
      } else if (isNumberFilter()) {
        const [start, end] = filterValue as number[];
        console.log(start, end, cardValue, start <= cardValue && cardValue <= end)
        return start <= cardValue && cardValue <= end;
      } else {
        return (filterValue as string[]).includes(cardValue as string);
      }
    };


    // @ts-ignore
    return Object.entries(appliedFilters).every(predicate);
  }

  private loadCards(): Card[] {
    return data.map((item, index) => {
      const { name, count, year, shape, color, size, favorite } = item;

      return { num: index, name, count: +count, year: +year, shape, color, size, favorite };
    });
  }
}

export default SettingsPage;
