import { rootUrl, trees } from './game-palettes-constants';

const treePaletteTemplate = `
  <div class="trees">
    <h3>Выберите ёлку</h3>
    <div class="trees-container">
    </div>
  </div>
`;

export class TreePaletteComponent extends HTMLElement {
  public connectedCallback(): void {
    this.innerHTML = treePaletteTemplate;
    this.querySelector('.trees-container')?.append(...this.getTreesList(trees));
  }

  private getTreesList(trees: string[]): HTMLImageElement[] {
    return trees.map((url, i) => {
      const image = document.createElement('img') as HTMLImageElement;

      image.src = rootUrl + url;
      image.alt = `Tree ${i}`;
      image.addEventListener('click', () => this.treeClickHandler(rootUrl + url));

      return image;
    });
  }

  private treeClickHandler(url: string): void {
    console.log('ok')
    const detail = { url };
    this.dispatchEvent(new CustomEvent('treeUpdated', { detail }));
  }
}
