import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'

class MainPage extends Page {

  /*static TextObject = {
    MainTitle: 'Main Page',
  };*/

  constructor(id:string) {
    super(id);
  }


  render() {
    changeVisibility('ДОМОЙ')
    //const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }


}

export default MainPage;
