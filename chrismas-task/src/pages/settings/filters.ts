
import { AppliedFiltersModel, AppliedFilterValues, Card, FilterNames } from "../../core/interfaces/interface";
import data from "../../toys";
import { FilterElements } from "./settings";



export class FiltersComponent extends HTMLElement{

  private filterElements: FilterElements = {
    shapeFilters: [],
    colorFilters: [],
    sizeFilters: [],
  }

  // Model
  private cards: Card[] = [];
  // View
  private cardElements = [] as HTMLElement[];

  filteredCardElements = [] as HTMLElement[];

  constructor(id: string) {
    super();
    this.cards = this.loadCards();
  }

  render(){
    return
  }

  private filteredOnShape(){

  }


  private loadCards(): Card[] {
    return data.map((item, index) => {
      const {name, count, year, shape, color, size, favorite} = item;

      return {num: index, name, count: +count, year: +year, shape, color, size, favorite}
    });
  }
}

