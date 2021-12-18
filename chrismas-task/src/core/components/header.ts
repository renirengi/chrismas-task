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

    const rootNode = document.querySelector('.main-container') as HTMLElement;
    console.log(rootNode)
  }

  render() {
    this.renderButtons();


    return this.container;
  }

   createSvgElement(){
    const svgElementContainer:HTMLElement = document.createElement('div');
    svgElementContainer.classList.add('svg-element-container');
    const createSvgElementTemplate=`
    <button id="music"></button>
    <button id="snow"></button>
    `;
    svgElementContainer.innerHTML=createSvgElementTemplate;
    return svgElementContainer;
   }

   createSearchElement(){
    const searchElementContainer:HTMLElement = document.createElement('div');
    searchElementContainer.classList.add('search-element-container');
    const createSearchElementTemplate=`
    <input type="text" id="input" autocomplete="off">
    `
    searchElementContainer.innerHTML=createSearchElementTemplate;
    return searchElementContainer;
  }

  createToysElement(){
    const toysElementContainer:HTMLElement = document.createElement('div');
    toysElementContainer.classList.add('toy-element-container');
    const createToySearchElementTemplate=`
    <div class="count-toys">0</div>
    `
    toysElementContainer.innerHTML=createToySearchElementTemplate;
    return toysElementContainer;

  }
}

export default Header;
