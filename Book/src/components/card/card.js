import { DivComponent } from "../../common/div-component";
import "./card.css" ;


export class Card extends DivComponent{
    constructor (appState, cardstate){
        super();
        this.appState = appState;
        this.cardstate = cardstate;
       
    }

    #addToFavorites(){
        this.appState.favorites.push(this.cardstate)
    }

    #deleteFromFavorites(){
        this.appState.favorites = this.appState.favorites.filter(
            b => b.key !== this.cardstate.key
        )
    }

    render(){
     
        this.el.classList.add("card");
        const existInFavorites = this.appState.favorites.find(
            b => b.key == this.cardstate.key
        )
        this.el.innerHTML = `
        <div class='card__image'>
            <img src="https://covers.openlibrary.org/b/olid/${this.cardstate.cover_edition_key}-M.jpg" alt="обложка"/>
        </div>
        <div class="card__info">
            <div class"card__tag">
                ${this.cardstate.subject ? this.cardstate.subject[0] : "не задано"}
            </div>
            <div class="card__name">
                ${this.cardstate.title}
            </div>
            <div class="card__author">
                ${this.cardstate.author_name ? this.cardstate.author_name[0] : "Не задано"}
            </div>
            <div class="card__footer">
                <button class="button__add ${existInFavorites ? 'button__active' : ''}">
                ${existInFavorites
                    ? '<img src="/static/favorites.svg" />'
                    : '<img src="/static/favwhite.svg" />'
                }
                </button>
            </div>
        </div>
        </div>
      
        `;

        if(existInFavorites){
			this.el.querySelector('button').addEventListener('click', this.#deleteFromFavorites.bind(this))
		} else{
            this.el.querySelector('button').addEventListener('click', this.#addToFavorites.bind(this))
        }
      
        return this.el;
    }
}

