import Page from '../../core/templates/page'
import { changeVisibility, removeContainer, changeSnow } from '../../utils'

class MainPage extends Page {

   constructor(id:string) {
    super(id);
  }


  render() {
     changeVisibility('ДОМОЙ')
    const rootNode = document.querySelector('.main-container') as HTMLElement;
    const template = `
    <div class="main-home-container">
    <div class="title-container">
    <h1>Помогите бабушке нарядить ёлку</h1>
    </div>
    <a href= "#settings-page" class="main-title">Начать</a>
    </div>
    `
    rootNode.innerHTML=template;
    const buttonElement = document.querySelector('.main-title') as HTMLElement;
    buttonElement.addEventListener('click', () => {
      const mainHomeContainer=document.querySelector('.main-container') as HTMLElement;
      mainHomeContainer.innerHTML=''});
    removeContainer(rootNode);
    const node = document.querySelector('body') as HTMLElement;
    const music = document.querySelector('#music-button') as HTMLElement;

    music.addEventListener('click', () => this.addMusic());

    changeSnow(node);
    this.setAudioValue();
    return this.container;
  }

 private addMusic():void{
   const musicId= document.querySelector('audio') as HTMLAudioElement;
    musicId.classList.toggle('listen');
    if(!musicId.classList.contains('listen')){
       musicId.play();
        this.saveAudioToLocalstorage (true,"music");
    }
    else{
      musicId.pause();
      this.saveAudioToLocalstorage (false,"music");
    }

   }

   private saveAudioToLocalstorage(value: boolean, name: string) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  private loadAudioFromLocalstorage(name: string): boolean | null{
    const viewValues = localStorage.getItem(name);

    return viewValues ? JSON.parse(viewValues) : null;
  }

  private setAudioValue():void{
    console.log(this.loadAudioFromLocalstorage("music"))
    if(this.loadAudioFromLocalstorage("music")==true){
      this.addMusic()
    }
  }
}

export default MainPage;
