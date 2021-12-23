import './global.css';
import 'nouislider/dist/nouislider.css'

import CardFiltersComponent from './core/components/card-filters.component';
import CardListComponent from './core/components/card-list.component';
import GameBackgroundComponent from './core/components/game-background.component';
import GameTreeComponent from './core/components/game-tree.component';
import App from './pages/app/app';

customElements.define('card-filters', CardFiltersComponent);
customElements.define('card-list', CardListComponent);
customElements.define('game-background', GameBackgroundComponent);
customElements.define('tree-game', GameTreeComponent);


const app = new App();

app.run();





