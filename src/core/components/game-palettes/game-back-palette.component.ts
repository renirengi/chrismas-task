import { backgrounds, rootUrl } from './game-palettes-constants';

const backPaletteTemplate = `
  <div class="backgrounds">
    <h3>Выберите фон</h3>
    <div class="backgrounds-container">
    </div>
  </div>
`;

export class BackPaletteComponent extends HTMLElement {
  public connectedCallback(): void {
    this.innerHTML = backPaletteTemplate;
    this.querySelector('.backgrounds-container')?.append(...this.getBackList(backgrounds));
  }

  private getBackList(backgrounds: string[]): HTMLImageElement[] {
    return backgrounds.map((url, i) => {
      const image = document.createElement('img') as HTMLImageElement;

      image.src = rootUrl + url;
      image.alt = `Background ${i}`;
      image.addEventListener('click', () => this.backClickHandler(rootUrl + url));

      return image;
    });
  }

  private backClickHandler(url: string): void {
    const detail = { url };
    this.dispatchEvent(new CustomEvent('backUpdated', { detail }));
  }
}
