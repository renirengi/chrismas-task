import { ConfigLightropeModel, LighropeModel } from '../../interfaces';
import { lightropes } from './game-palettes-constants';

const lightropePaletteTemplate = `
  <div>
    <h3>Гирлянда</h3>
    <ul class="lighropes-container">
    </li>
    <div class="btn-container">
    <div class="switch-btn"></div>
  </div>
`;

export class LightropePaletteComponent extends HTMLElement {
  private currentState: LighropeModel = {...lightropes[0], enabled: false };

  public connectedCallback(): void {
    this.innerHTML = lightropePaletteTemplate;
    this.querySelector('.lighropes-container')?.append(...this.getLightropesList(lightropes));
    this.querySelector('.switch-btn')?.addEventListener('click', (e: Event) => this.lightropeSwitchClickHandler(e));
  }

  private getLightropesList(ropes: ConfigLightropeModel[]): HTMLElement[] {
    return ropes.map((rope) => {
      const listElement = document.createElement('li') as HTMLElement;

      listElement.style.background = rope.background || rope.colorName;
      listElement.addEventListener('click', () => this.lightropeClickHandler(rope));

      return listElement;
    });
  }

  private lightropeClickHandler(rope: ConfigLightropeModel): void {
    this.currentState = { ...this.currentState, ...rope };

    this.emitEvent();
  }

  private lightropeSwitchClickHandler(e: Event) {
    const target = e.target as HTMLElement;

    target.classList.toggle('switch-on');
    this.currentState = { ...this.currentState, enabled: target.classList.contains('switch-on') };

    this.emitEvent();
  }

  private emitEvent(): void {
    const detail = { lightrope: this.currentState };

    this.dispatchEvent(new CustomEvent('lightropeUpdated', { detail }));
  }
}
