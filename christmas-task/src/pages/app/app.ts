import MainPage from "../main/main";
import SettingsPage from "../settings/settings";
import GamePage from "../game/game";
import Page from "../../core/templates/page";
import Header from '../../core/components/header';
import Main from '../../core/components/main';
import Footer from '../../core/components/footer';



export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'settings-page',
  GamePage = 'game-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId = 'current-page';
  private header: Header;
  private main: Main;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.SettingsPage) {
      page = new SettingsPage(idPage);
    } else if (idPage === PageIds.GamePage) {
      page = new GamePage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header-container');
    this.main = new Main ('main', 'main-container');
    this.footer = new Footer ('footer', 'footer-container');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.main.render());
    App.container.append(this.footer.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
    console.log("самооценка 200б Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки.10б, Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой +10. Добавление игрушек в избранное +20,Сортировка +20, Фильтры в указанном диапазоне от и до +30, Фильтры по значению +30, Можно отфильтровать игрушки по нескольким фильтрам разного типа +20, Сохранение настроек в local storage +10, Поиск +28(нет курсора в поле поиска), Дополнительный функционал на выбор +20(снег,хеддер,футер, гирлянда)")
  }
}



export default App;
