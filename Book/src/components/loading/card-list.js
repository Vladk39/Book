import { DivComponent } from "../../common/div-component";
import "./card-list.css" ;
import { Card } from "../../components/card/card.js";


export class CardList extends DivComponent{
    constructor (appState, parentState){
        super();
        this.appState = appState;
        this.parentState = parentState;
       
    }
  

    render(){
        if(this.parentState.loading ){
            this.el.innerHTML= `<div class="card_list_loader">Загрузка...</div>`
            return this.el;
        }
        this.el.innerHTML = `
        <h1>Найдено книг: ${this.parentState.numFound}</h1>
      
        `;
        const cardGrid = document.createElement('div');
        cardGrid.classList.add("card_grid");
        this.el.append(cardGrid)
      
        for(const card of this.parentState.list){
            cardGrid.append(new Card(this.appState, card).render());
        }
        return this.el;
    }
}


// ${this.appState.loading ? "LOADING..." : "FINISH"}