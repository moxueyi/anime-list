import { Anime } from "@/types";
import { defineStore } from "pinia";
import { useAnimeStore } from ".";
import useRandStore from "../utile/randNum";
import { ref } from "vue";

const useAnimeFound = defineStore("animeFound", () => {
    const randStore = useRandStore();
    const animeStore = useAnimeStore();

    const animeList: Anime[] = animeStore.getAnimeList();

    const animeFoundList = ref<Anime[]>([]);

    function setFoundList() {
        animeFoundList.value = [];
        const randNumArr = randStore.getRandNumArr();
        randNumArr.forEach(num => {
            animeFoundList.value.push(animeList[num]);
        })
    }

    return {
        animeFoundList,
        setFoundList,
    }
})

export default useAnimeFound;