import { getToyImageUrl } from "./game-palettes-constants";

const template = `
  <div class="counter">0</div>
`;

export class ToyComponent extends HTMLElement {

  static get observedAttributes() {
    return ['index', 'counter'];
  }

  private counter = 0;
  private counterElement!: HTMLElement;

  public constructor() {
    super();
  }

  public connectedCallback(): void {
    this.innerHTML = template;


    this.counterElement = this.querySelector('.counter') as HTMLElement;
    this.setCounter(this.counter);

    this.addEventListener('dragstart', (e) => this.dragStartHandler(e));
    this.addEventListener('dragend', () => this.dragStopHandler());
  }

  public attributeChangedCallback(name: 'index'|'counter', _oldValue: string, newValue: string): void {
    switch (name) {
      case 'index':
        this.style.backgroundImage = `url(${getToyImageUrl(newValue)})`;
        break;
      case 'counter':
        this.setCounter(+newValue);
        break;
    }
  }

  private setCounter(counter: number): void {
    this.counter = counter;

    if (this.counterElement) {
      this.counterElement.innerHTML = counter.toString();
    }

    if (counter > 0) {
      this.setAttribute('draggable', 'true');
    } else {
      this.style.background = 'none';
      this.removeAttribute('draggable');
    }
  }

  private dragStartHandler(e: DragEvent): void {
    const index = this.getAttribute('index') as string;

    e.dataTransfer?.setData('text/plain', index);
    this.classList.add('dragged');
  }

  private dragStopHandler(): void {
    this.classList.remove('dragged');
  }

}
