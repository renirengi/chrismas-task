import Component from '../templates/components';
import { PageIds } from '../../pages/app/app';

const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'ДОМОЙ',
  },
  {
    id: PageIds.SettingsPage,
    text: 'ИГРУШКИ',
  },
  {
    id: PageIds.GamePage,
    text: 'ЁЛОЧКА',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderButtons() {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('link-container');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.classList.add('check');
      pageButtons.append(buttonHTML);
    });
    this.container.append(this.createSvgElement());
    this.container.append(pageButtons);
    this.container.append(this.createSearchElement());
    this.container.append(this.createToysElement());
  }

  render() {
    this.renderButtons();

    return this.container;
  }

  createSvgElement() {
    const svgElementContainer: HTMLElement = document.createElement('div');
    svgElementContainer.classList.add('svg-element-container');
    const createSvgElementTemplate = `
    <button id="music-button" class="music-button"></button>
    <audio  class="listen" class="listen" src="assets_audio_audio.mp3" autoplay="muted"></audio></audio>
    <button class="snow-button"></button>
    `;
    svgElementContainer.innerHTML = createSvgElementTemplate;
    return svgElementContainer;
  }

  createSearchElement() {
    const searchElementContainer: HTMLElement = document.createElement('div');
    searchElementContainer.classList.add('search-element-container');
    const createSearchElementTemplate = `
    <input type="text" id="input" class="input input-search" autocomplete="off">
    <div class="delete">&#10060</div>
    `;
    searchElementContainer.innerHTML = createSearchElementTemplate;
    return searchElementContainer;
  }

  createToysElement() {
    const toysElementContainer: HTMLElement = document.createElement('div');
    toysElementContainer.classList.add('toy-element-container');
    const createToySearchElementTemplate = `
      <div class="count-toys">
        ${this.loadActiveToys().length}
      </div>
      `;
    toysElementContainer.innerHTML = createToySearchElementTemplate;
    return toysElementContainer;
  }

  private loadActiveToys(): number[] {
    const countToys = localStorage.getItem('activeToysCount');

    return countToys ? JSON.parse(countToys) : [];
  }
}

export default Header;
