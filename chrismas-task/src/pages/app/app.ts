import MainPage from "../main/main";
import SettingsPage from "../settings/settings";
import GamePage from "../game/game";
import Page from "../../core/templates/page";


export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'settings-page',
  GamePage = 'game-page',
}

class App {
  private static container: HTMLElement = document.body;
  private initialPage: MainPage;

  static renderNewPage(idPage:string) {
   App.container.innerHTML = '';
   let page: Page | null = null;

   if (idPage === PageIds.MainPage) {
     page = new MainPage(idPage);
   } else if (idPage === PageIds.SettingsPage){
     page = new SettingsPage(idPage);
   } else if (idPage === PageIds.GamePage){
     page = new GamePage(idPage);
   }

   if (page) {
     const pageHTML = page.render();
     document.body.append (pageHTML);
   }
  }

  private enableRouteChange(){
    window.addEventListener('hashchange', () => {
     const hash = window.location.hash.slice(1);
     App.renderNewPage(hash);
    });
  }

  constructor () {
    this.initialPage = new MainPage('main-page');
  }

  run() {
    App.renderNewPage('game-page');
    this.enableRouteChange();
  }
}

export default App;
