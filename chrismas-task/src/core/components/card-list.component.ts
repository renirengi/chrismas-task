import { Card } from '../interfaces/interface';

export default class CardListComponent extends HTMLElement {
  public connectedCallback() {
    this.innerHTML = 'Загрузка...';
  }

  public updateCardList(cards: Card[]): void {
    const toysContainer: HTMLElement = document.createElement('div');
    const cardElements = cards.map((card) => this.createCardElement(card));

    toysContainer.classList.add('toys-container');
    toysContainer.append(...cardElements);

    this.innerHTML = '';
    this.append(toysContainer);
    cardElements.forEach( (elem) => elem.addEventListener('click', () => {

      const tapeElement = elem.querySelector('.tape') as HTMLElement;
      tapeElement.classList.toggle('activeToy');
      this.saveChangedArray();
    }))
  }

  private saveChangedArray(){
    const changeArray = Array.from(document.querySelectorAll('.activeToy'));
    localStorage.setItem ('changeArray', JSON.stringify(changeArray.length));
    return changeArray.length;
  }


  private createCardElement(card: Card): HTMLElement {
    const { name, count, year, shape, color, size, favorite } = card;
    const imgIndex = +card.num+1;
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${imgIndex}.png`;
    const toyCardTemplate = `
        <h5>${name}</h5>
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
    ///cardElement.style.display = 'block';

    return cardElement;
  }
}
