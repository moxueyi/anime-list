import { defineStore } from "pinia";
import imagesURL from "../utile/images";
import { Anime } from "@/types/index";
import { computed } from "vue";
import useAnimeFound from "./found";
import useFilterStore from "./filter";


const useAnimeStore = defineStore('anime', () => {

    const animes: Anime[] = imagesURL.map((image) => {
        const len = (image as string).split('-')[0].split('/').length
        let style: string[] = (image as string).split('-')[4].split('_').map(item => {
            return decodeURI(item);
        });
        style[style.length - 1] = style[style.length - 1].split('.')[0].split('-')[0];

        const key = (image as string).split('-')[0].split('/')[len - 1];

        const anime: Anime = {
            key,
            name: decodeURI(key),
            category: decodeURI((image as string).split('-')[1]),
            quarter: Number((image as string).split('-')[2]),
            year: Number((image as string).split('-')[3]),
            style,
            image
        }
        return anime;
    });

    function getAnimeList(): Anime[] {
        return JSON.parse(JSON.stringify(animes));
    }

    function getAime(animes: Anime[], key: string) {
        for (let i = 0; i < animes.length; i++) {
            if (animes[i].key === key) {
                return animes[i];
            }
        }
    }

    // 类别
    const categoryList = computed(() => {
        const categoryList: string[] = [];

        animes.forEach(anime => {

            if (!categoryList.includes(anime.category)) {
                categoryList.push(anime.category);
            }
        })
        return categoryList;
    })

    // 年份
    const yearList = computed(() => {
        const yearList: number[] = [];

        animes.forEach(anime => {
            if (!yearList.includes(anime.year)) {
                yearList.push(anime.year);
            }
        })
        return yearList;
    })

    // 季度
    const quarterList = computed(() => {
        const quarterList: number[] = [];

        animes.forEach(anime => {
            if (!quarterList.includes(anime.quarter)) {
                quarterList.push(anime.quarter);
            }
        })
        return quarterList;
    })

    // 风格
    const styleList = computed(() => {

        const styleList: string[] = [];

        animes.forEach(anime => {
            anime.style.forEach(item => {
                if (!styleList.includes(item)) {
                    styleList.push(item);
                }
            })
        })
        return styleList;
    })

    let animeLen = computed(() => {
        return animes.length;
    })

    return {
        animes,
        getAnimeList,
        getAime,
        categoryList,
        yearList,
        quarterList,
        styleList,
        animeLen,
    }
})

export {
    useAnimeStore,
    useAnimeFound,
    useFilterStore,
}