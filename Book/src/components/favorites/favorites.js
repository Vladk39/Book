import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/loading/card-list.js";



export class FavoritesView extends AbstractView {
    // state = {
    //     list: [],
    //     numFound: 0,
    //     loading: false,
    //     searchQuery: undefined,
    //     offset: 0,
    // }
    
    constructor(appState) {
        super();
        this.appState = appState;
        //подписываемся на изминение appState
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
        this.setTitle('My book');
    }

    destroy(){
        onChange.unsubscribe(this.appState)
        
    }


    appStateHook(path) {
        if (path === 'favorites') {
            this.render()
            // this.render() - на этапе подписаний onchange забъет стек. потому что идет постаянное обновление стейта
        }

    }

   

   

    render() {
        const main = document.createElement("div");
        main.append(new CardList(this.appState, {list : this.appState.favorites}).render())
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
        
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}