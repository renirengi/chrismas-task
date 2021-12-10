/* eslint-disable @typescript-eslint/no-unused-vars */
import Page from '../../core/templates/page'
import { changeVisibility } from '../../utils'
import data from '../../toys';


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
    this.drawAllToys();
    return toysContainer;
  }

  drawAllToys() {
    const toys = data.forEach((elem:any) => {
      const toyContainer:HTMLElement= document.createElement('div');
      toyContainer.classList.add('toy-container')

      const name:HTMLElement=document.createElement('p');
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

      toyContainer.append(name);
      toyContainer.append(count);
      toyContainer.append(year);
      toyContainer.append(shape);
      toyContainer.append(color);
      toyContainer.append(size);
      toyContainer.append(favorite);

      console.log(toyContainer);
    })

    return toys;
  }




}

export default SettingsPage;
