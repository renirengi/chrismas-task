import Page from '../../core/templates/page'

class MainPage extends Page {

  /*static TextObject = {
    MainTitle: 'Main Page',
  };*/

  constructor(id:string) {
    super(id);
  }


  render() {
    this.changeVisibility()
    //const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    //this.container.append(title);
    return this.container;
  }

  changeVisibility(){
    const buttonElement = document.querySelectorAll('.active');
    buttonElement.forEach((element) => {
      if(element.textContent==="Main Page"){
        element.style.display = 'none';
      }
      else{
        element.style.display = 'block';
      }
    })
}
}

export default MainPage;
