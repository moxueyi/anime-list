import { defineStore } from "pinia";
import { ref } from "vue";

const useSearchStore = defineStore("search", () => {
    const searchSwitch = ref<boolean>(JSON.parse(localStorage.getItem('searchSwitch')!) ?? false);

    function setSwitch(bool: boolean) {
        searchSwitch.value = bool;
        localStorage.setItem("searchSwitch", JSON.stringify(bool));
    }

    return {
        searchSwitch,
        setSwitch,
    }

})

export default useSearchStore;