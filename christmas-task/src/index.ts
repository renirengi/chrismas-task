import './global.css';
import 'nouislider/dist/nouislider.css';

import CardFiltersComponent from './core/components/card-filters.component';
import CardListComponent from './core/components/card-list.component';
import { ViewTreeComponent } from './core/components/view-tree.component';
import App from './pages/app/app';
import { TreePaletteComponent, LightropePaletteComponent, BackPaletteComponent } from './core/components/game-palettes';

customElements.define('card-filters', CardFiltersComponent);
customElements.define('card-list', CardListComponent);
customElements.define('view-tree', ViewTreeComponent);

customElements.define('tree-palette', TreePaletteComponent);
customElements.define('back-palette', BackPaletteComponent);
customElements.define('lightrope-palette', LightropePaletteComponent);

const app = new App();

app.run();
