import { App } from "vue";
import { createPinia } from "pinia";
import { useAnimeStore, useAnimeFound, useFilterStore } from './anime';
import useActiveNum from './utile/activeNum';
import useSearchStore from "./utile/searchSwtich";

const pinia = createPinia();

const setupStore = (app: App) => {
    app.use(pinia);
    const AnimeStore = useAnimeStore();
    console.log(AnimeStore.animes);
}

export {
    setupStore,
    useAnimeStore,
    useAnimeFound,
    useFilterStore,
    useActiveNum,
    useSearchStore,
}
