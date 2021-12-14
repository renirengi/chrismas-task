import './global.css';
import 'nouislider/dist/nouislider.css'

import CardFiltersComponent from './core/components/card-filters.component';
import CardListComponent from './core/components/card-list.component';
import App from './pages/app/app';

customElements.define('card-filters', CardFiltersComponent);
customElements.define('card-list', CardListComponent);


const app = new App();

app.run();

