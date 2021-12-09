import Page from '../../core/templates/page'


class GamePage extends Page{
  /*static TextObject = {
    MainTitle: 'Game Page',
  };*/

  constructor(id:string) {
    super(id);
  }

  render() {
    this.changeVisibility();
    //const title = this.createHeaderTitle(GamePage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }

  changeVisibility(){
    const buttonElement = document.querySelectorAll('.active');
    buttonElement.forEach((element) => {
      if(element.textContent==='Game Page'){
        element.style.display = 'none';
      }
      else{
        element.style.display = 'block';
      }
    })
}
}

export default GamePage;
