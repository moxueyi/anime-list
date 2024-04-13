import { defineStore } from "pinia";
import { Anime } from "@/types";

const useFilterStore = defineStore('filter', () => {
    // 分类筛选
    function filterCategory(animes: Anime[], category: string) {
        return animes.filter((anime: Anime) => anime.category === category)
    }

    // 风格筛选
    function filterStyle(animes: Anime[], style: string) {
        return animes.filter((anime: Anime) => anime.style.includes(style))
    }

    // 时间排序
    function filterDate(animes: Anime[], backFunc: (a: Anime, b: Anime) => number): Anime[] {
        return animes.sort(backFunc)
    }

    // 查找包含关键字的Anime
    function filterKeyword(animes: Anime[], keyword: string) {
        console.log(keyword);


        return animes.filter((anime: Anime) => {
            if (anime.name.match(keyword) !== null) return true;
            if (anime.category.match(keyword) !== null) return true;
            for (const item of anime.style) {
                if (item.match(keyword) !== null) return true;
            }
        })
    }

    return {
        filterCategory,
        filterStyle,
        filterDate,
        filterKeyword,
    }
})

export default useFilterStore;