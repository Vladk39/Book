import { AbstractView } from "../../common/view.js";
import onChange from 'on-change';
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/loading/card-list.js";
import { Search } from "../../components/search/search.js";


export class MainView extends AbstractView {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0,
    }
    
    constructor(appState) {
        super();
        this.appState = appState;
        //подписываемся на изминение appState
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
        this.setTitle('search Book');
    }

    destroy(){
        onChange.unsubscribe(this.appState)
        onChange.unsubscribe(this.state)
    }


    appStateHook(path) {
        if (path === 'favorites') {
            this.render()
            // this.render() - на этапе подписаний onchange забъет стек. потому что идет постаянное обновление стейта
        }

    }

    async stateHook(path) {
        if (path === 'searchQuery') {
            
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            console.log(data)
            this.state.numFound =data.numFound;
            this.state.list = data.docs;
            // this.render() - на этапе подписаний onchange забъет стек. потому что идет постаянное обновление стейта
        }
        if( path ===`list` || path ===`loading`){
            this.render();
        }

    }

    async loadList(q, offset){
        const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`)
        return res.json();
    }

   

    render() {
        const main = document.createElement("div");
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render())
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
        
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}