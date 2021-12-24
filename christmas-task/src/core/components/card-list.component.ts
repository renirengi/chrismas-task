import { Card } from '../interfaces';

export default class CardListComponent extends HTMLElement {
  public connectedCallback() {
    this.innerHTML = 'Загрузка...';
  }

  public updateCardList(cards: Card[], activeToys: number[]): void {
    console.log(cards);
    const toysContainer: HTMLElement = document.createElement('div');
    const cardElements = cards.map((card) => this.createCardElement(card, activeToys));

    toysContainer.classList.add('toys-container');

    if (cardElements.length == 0) {
      const sorryContainer = document.createElement('div');
      sorryContainer.classList.add('sorry-container');
      const sorry = document.createElement('h5');
      sorry.textContent = 'Извините, совпадений не обнаружено!';
      const sorryImg = document.createElement('img');
      sorryImg.setAttribute(
        'src',
        'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/tree/6.png'
      );
      sorryImg.setAttribute('alt', '0');
      sorryContainer.append(sorry);
      sorryContainer.append(sorryImg);

      toysContainer.append(sorryContainer);
    } else {
      toysContainer.append(...cardElements);
    }

    this.innerHTML = '';
    this.append(toysContainer);
  }

  private createCardElement(card: Card, activeToys: number[] = []): HTMLElement {
    const { num, name, count, year, shape, color, size, favorite } = card;
    const isActiveToy = activeToys.includes(num);
    const imgIndex = 1 + num;
    const url = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${imgIndex}.png`;
    const toyCardTemplate = `
        <h5 class="toy-name">${name}</h5>
        <ul class="lightrope">
          <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
        </ul>
        <img src="${url}" alt="${name}"/>
        <p class="c-number">Количество: ${count}</p>
        <p class="y-number">Год покупки: ${year}</p>
        <p class="shape">Форма игрушки: ${shape}</p>
        <p class="color">Цвет игрушки: ${color}</p>
        <p class="size">Размер игрушки: ${size}</p>
        <div class="tape"></div>
        <p div class="favorite">Любимая: ${favorite === true ? 'да' : 'нет'}</p>
        </div>
      `;

    const cardElement: HTMLElement = document.createElement('div');

    cardElement.classList.add('toy-container');

    if (isActiveToy) {
      cardElement.classList.add('activeToy');
    }

    cardElement.innerHTML = toyCardTemplate;

    cardElement?.addEventListener('click', () => this.activeToyClickHandler(num, cardElement));

    return cardElement;
  }

  private activeToyClickHandler(cardNum: number, target: HTMLElement) {
    const listActiveToys = document.querySelectorAll('.activeToy');
    if (!target.classList.contains('activeToy')) {
      if (listActiveToys.length <= 19) {
        target.classList.add('activeToy');
      } else {
        alert('Извините, слоты заполнены');
      }
    } else {
      target.classList.remove('activeToy');
    }

    const isActive = target.classList.contains('activeToy');
    const detail = { cardNum, isActive };

    this.dispatchEvent(new CustomEvent('activeToyChange', { detail }));
  }
}
