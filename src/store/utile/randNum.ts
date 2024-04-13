import { defineStore } from "pinia";
import { useAnimeStore } from "../anime";

const useRandStore = defineStore("rand", () => {
    const animeStore = useAnimeStore()
    let arrLen = animeStore.animeLen;

    const rand = (): number => {
        return Math.floor(Math.random() * arrLen);
    }

    const getRandNumArr = (): number[] => {
        let randLen = rand();
        randLen = randLen < 3 ? 3 : randLen;
        let numArr = [];

        while (numArr.length < randLen) {
            let num = rand();
            if (numArr.indexOf(num) === -1) {
                numArr.push(num);
            }
        }

        // console.log(numArr);
        return numArr;

    }

    return {
        rand,
        getRandNumArr,
    }
})

export default useRandStore;