import Page from '../../core/templates/page'


class GamePage extends Page{
  static TextObject = {
    MainTitle: 'Game Page',
  };

  constructor(id:string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(GamePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default GamePage;
