import Page from '../../core/templates/page'


class SettingsPage extends Page{
  /*static TextObject = {
    MainTitle: 'Settings Page',
  };*/

  constructor(id:string) {
    super(id);
  }

  render() {
    this.changeVisibility();
    //const title = this.createHeaderTitle(SettingsPage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }

  changeVisibility(){
    const buttonElement = document.querySelectorAll('.active');
    buttonElement.forEach((element) => {
      if(element.textContent==='Settings Page'){
        element.style.display = 'none';
      }
      else{
        element.style.display = 'block';
      }
    })
  }

}

export default SettingsPage;
