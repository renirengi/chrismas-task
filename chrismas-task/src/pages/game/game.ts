import Page from '../../core/templates/page';
import { changeVisibility } from '../../utils'


class GamePage extends Page{
  /*static TextObject = {
    MainTitle: 'Game Page',
  };*/

  constructor(id:string) {
    super(id);
  }

  render() {
    changeVisibility('Game Page');
    //const title = this.createHeaderTitle(GamePage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }


}


export default GamePage;
