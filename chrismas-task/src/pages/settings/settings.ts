import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'
import data from '../../toys';
import { myAsynFunction } from '../../view/view'


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
  data.forEach((elem) => {
    let singleToyCard:HTMLElement = this.drawToy(elem);
    toysContainer.append(singleToyCard);
  });

    return toysContainer;
  }

  drawToy(elem) {
      const toyContainer:HTMLElement= document.createElement('div');
      toyContainer.classList.add('toy-container')

      const name:HTMLElement=document.createElement('h2');
      name.textContent=elem.name;

      const count:HTMLElement=document.createElement('p');
      count.textContent=`Количество: ${elem.count}`;

      const year:HTMLElement=document.createElement('p');
      year.textContent=`Год покупки: ${elem.year}`;

      const shape:HTMLElement=document.createElement('p');
      shape.textContent=`Форма игрушки: ${elem.shape}`;

      const color:HTMLElement=document.createElement('p');
      color.textContent=`Цвет игрушки: ${elem.color}`;

      const size:HTMLElement=document.createElement('p');
      size.textContent=`Размер игрушки: ${elem.size}`;

      const favorite:HTMLElement=document.createElement('p');
      favorite.textContent=`Любимая: ${elem.favorite}`;

      toyContainer.append(name, count, year, shape, color, size, favorite);

    return toyContainer;
  }




}

export default SettingsPage;
