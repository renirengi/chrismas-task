export const cardFiltersTemplate = `
    <div class="button-filter">
      <p class="title">Фильтры по значению</p>
      <div class="shape">Форма:
        <button class="ball" data-filter="шар"></button>
        <button class="bell" data-filter="колокольчик"></button>
        <button class="cone" data-filter="шишка"></button>
        <button class="snow" data-filter="снежинка"></button>
        <button class="toy" data-filter="фигурка"></button>
      </div>
      <div class="color">Цвет:
        <button class="white" data-filter="белый"></button>
        <button class="yellow" data-filter="желтый"></button>
        <button class="red" data-filter="красный"></button>
        <button class="blue" data-filter="синий"></button>
        <button class="green" data-filter="зелёный"></button>
      </div>
      <div class="size">Размер:
        <button class="big" data-filter="большой"></button>
        <button class="medium" data-filter="средний"></button>
        <button class="small" data-filter="малый"></button>
      </div>
      <div class="favorite-container">
        Только любимые:
        <div class="form-group">
          <input type="checkbox" class="favorite-input" id="checkbox"/>
          <label for="checkbox" class="favorite-input-label"></label>
        </div>
      </div>
    </div>

    <div class="range">
      <p class="title">Фильтры по диапазону</p>
      <div class="count">
        <p>Количество экземпляров:</в>
        <div class="slider-container">
          <span class="min">1</span><span class="max">12</span>
          <div class="count-slider"></div>
        </div>
      </div>
      <div class="year">
        <p>Год приобретения:</p>
        <div class="slider-container">
          <span class="min">1940</span><span class="max">2020</span>
          <div class="year-slider"></div>
        </div>
      </div>
    </div>

    <div class="sort">
      <p class="title">Сортировка</p>
      <select class="sort-select">
        <option selected value="az">По названию от «А» до «Я»</option>
        <option value="za">По названию от «Я» до «А»</option>
        <option value="max">По количеству по возрастанию</option>
        <option value="min">По количеству по убыванию</option>
      </select>
      <button class="reset">Сброс фильтров</button>
    </div>
  `;
