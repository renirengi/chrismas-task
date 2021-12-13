

export function createCardElement(card: Card, cardIndex: number): HTMLElement {
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
