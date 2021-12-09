import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'


class SettingsPage extends Page{
  /*static TextObject = {
    MainTitle: 'Settings Page',
  };*/

  constructor(id:string) {
    super(id);
  }

  render() {
    changeVisibility('Settings Page');
    this.makeContainer();
    //this.clearContainer();
    //const title = this.createHeaderTitle(SettingsPage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }

  makeContainer(){
    const сontainer:HTMLElement=document.createElement('div');
    сontainer.classList.add('content-container');
    (document.querySelector('.main-container') as HTMLElement).append(сontainer);
    сontainer.append(this.makeAllContainer());
  }

  makeAllContainer() {
    const toysContainer:HTMLElement= document.createElement('div');
    toysContainer.classList.add('toys-container');
    return toysContainer;
  }


}

export default SettingsPage;
