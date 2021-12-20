import Component from '../templates/components';


class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  render() {
    this.container.append(this.createContain())
   return this.container;
  }
  createContain(){
    const footerContainer= document.createElement('div');
    footerContainer.classList.add('footer-container');

    const createFooterTemplate = `
    <a href='https://rs.school/js/'><img class="logo" src='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/d3cbbbeb3207b1a90bdb2c1ba5bb27a6492744f5/assets/svg/rss.svg' alt=0></a>
    <p>2021</p>
    <a href='https://github.com/renirengi/'><img class="github" src='https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/d3cbbbeb3207b1a90bdb2c1ba5bb27a6492744f5/assets/svg/github.svg' alt=0></a>
    `;
    footerContainer.innerHTML= createFooterTemplate;
    return footerContainer;
}
}

export default Footer;
