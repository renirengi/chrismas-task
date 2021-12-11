import Component from '../templates/components';
import { PageIds } from '../../pages/app/app';

const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'Main Page',
  },
  {
    id: PageIds.SettingsPage,
    text: 'Settings Page',
  },
  {
    id: PageIds.GamePage,
    text: 'Game Page',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      buttonHTML.classList.add('active');
      pageButtons.append(buttonHTML);

    });
    this.container.append(pageButtons);
    this.container.append(this.createSearchElement());
  }

  render() {
    this.renderPageButtons();

    return this.container;
  }

   createSearchElement(){
    const searchElementContainer:HTMLElement = document.createElement('div');
    searchElementContainer.classList.add('search-element-container');
    const createSearchElementTemplate=`
    <input type="text" id="input" placeholder="Введите название игрушки..">
    `
    searchElementContainer.innerHTML=createSearchElementTemplate;
    return searchElementContainer;

  }
}

export default Header;
