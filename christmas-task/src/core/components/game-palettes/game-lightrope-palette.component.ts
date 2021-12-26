import { LighropeModel } from '../../interfaces';
//import { lightropes } from './game-palettes-constants';

const lightropePaletteTemplate = `
  <div>
    <h3>Гирлянда</h3>
    <div class="lighropes-container">
      <div id="multicolor" class="light-type"></div>
      <div id="red" class="light-type"></div>
      <div id="blue" class="light-type"></div>
      <div id="yellow" class="light-type"></div>
      <div id="green" class="light-type"></div>
    </div>
    <div class="btn-container">
    <div class="switch-btn"></div>
  </div>
`;

export class LightropePaletteComponent extends HTMLElement {
  private lightropeState:LighropeModel = {
    color:'multicolor',
    state: false};

  public connectedCallback(): void {
    this.innerHTML = lightropePaletteTemplate;
    this.querySelectorAll('.light-type').forEach((el)=> el.addEventListener('click', ()=> {
      const colorname=el.id;
       const rope=colorname?.toString();
      if(rope!==undefined)
      {this.lightropeClickHandler(`${rope}-light`)}
    }));
     this.querySelector('.switch-btn')?.addEventListener('click', () => this.lightropeSwitchClickHandler());
  }

   private lightropeClickHandler(rope: string): void {
    this.lightropeState.color=rope;
    this.emitEvent();
  }

  private lightropeSwitchClickHandler() {
    const target=this.querySelector('.switch-btn') as HTMLElement;
    target.classList.toggle('switch-on');
    if(target.classList.contains('switch-on')){
      this.lightropeState.state=true;
      console.log(this.lightropeState);
    }
    else{
      this.lightropeState.state=false;
    }
  this.emitEvent();
  }

  private emitEvent(): void {
    const detail = this.lightropeState;

    this.dispatchEvent(new CustomEvent('lightropeUpdated', { detail }));
  }


}
