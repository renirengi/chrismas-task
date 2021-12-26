import { ToyModel } from '../../interfaces';
import { toys } from './game-palettes-constants';
import { ToyComponent } from './game-toy.component';

const toyPaletteTemplate = `
    <h3>Игрушки</h3>
    <div class="game-toy-container"></div>
  `;

export class GameToyPaletteComponent extends HTMLElement {

  private toyElements!: {[key: string]: ToyComponent};

  public connectedCallback(): void {
    this.innerHTML = toyPaletteTemplate;

    const allToys: ToyModel[] = this.loadToysForGames();
    const selectedToysIndexes: number[] = localStorage.activeToysCount
      ? JSON.parse(localStorage.activeToysCount)
      : [...Array(20).keys()];
    const selectedToys = allToys.filter((toy) => selectedToysIndexes.includes(toy.num));
    const toyElementsArray = selectedToys.map(this.createToysElement);

    this.toyElements = toyElementsArray.reduce((acc, elem, i) => ({...acc, [(selectedToys[i].num).toString()]: elem}), {});

    this.querySelector('.game-toy-container')?.append(...toyElementsArray);

    document.addEventListener('toyDropped', (e) => this.dropHandler(e as CustomEvent));
  }

  private createToysElement(toy: ToyModel): HTMLElement {
    const { num, count } = toy;
    const toyElement: HTMLElement = document.createElement('toy-component');

    toyElement.setAttribute('index', num.toString());
    toyElement.setAttribute('counter', count.toString());

    return toyElement;
  }

  private loadToysForGames(): ToyModel[] {
    return toys.map((item, index) => {
      const { count } = item;
      return { num: index, count: +count };
    });
  }

  private dropHandler(e: CustomEvent): void {
    const index = e.detail.index as number;
    const toyElement = this.toyElements[index.toString()];
    const counter = +(toyElement.getAttribute('counter') as string);

    console.log(index, toyElement, counter)

    if (counter > 0) {
      toyElement.setAttribute('counter', (counter - 1).toString());
    }
}
}
