import { defineStore } from "pinia";
import { ref } from "vue";

const useActiveNum = defineStore("activeNum", () => {
    const activeNum = ref(parseInt(localStorage.getItem('activeNum') ?? '0'));

    function setActiveNum(num: number) {
        activeNum.value = num;
        localStorage.setItem('activeNum', num.toString())
    }

    function getActiveNum() {
        return activeNum.value;
    }

    return {
        activeNum,
        setActiveNum,
        getActiveNum,
    }
})

export default useActiveNum;