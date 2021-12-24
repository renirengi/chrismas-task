import { create } from 'domain';
import data from '../../../toys';
const toyPaletteTemplate = `
  <h3>Игрушки</h3>

`;
interface ToysForGames{
  num: number;
  count: number|string;
}

export class GameToyPaletteComponent extends HTMLElement {
  public connectedCallback(): void {
    const toys:ToysForGames[] = this.loadToysForGames();
    this.innerHTML = toyPaletteTemplate;
    const indexes = localStorage.activeToysCount? localStorage.activeToysCount :[...Array(20).keys()];

    this.getToyList(toys,indexes);
    }

  private getToyList(toys:ToysForGames[],indexes:number[]){
    const toysContainer: HTMLElement = document.createElement('div');
    const toysElements = toys.map((toy) => this.createToysElement(toy, indexes));

    toysContainer.classList.add('game-toy-container');

    toysContainer.append(...toysElements);
    this.append(toysContainer);
  }

  private createToysElement(toy:ToysForGames, indexes:number[]):HTMLElement{
     const { num, count } = toy;
    if(indexes.includes(num)){

      const toyElement: HTMLElement = document.createElement('div');
     toyElement.classList.add('toy-picture-container');
    const imgIndex = 1 + num;
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${imgIndex}.png`;
    const toyTemplate = `
        <img src="${url}" alt="${num}"/>
        <p class="countToys">${count}</p>
       `;
      toyElement.innerHTML = toyTemplate;
      return toyElement;
     }
     else{
       return document.createElement('div');
     }
  }

  private loadToysForGames():ToysForGames[] {
    return data.map((item, index) => {
      const { count } = item;
     return { num: index, count: +count};
    });
  }
}
