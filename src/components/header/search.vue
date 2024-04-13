<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useActiveNum, useAnimeStore } from '@/store';
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/store';

const searchStore = useSearchStore();
const activeStore = useActiveNum();
const router = useRouter();
const animeStore = useAnimeStore();

type optionType = {
    name: string,
    value: string[],
}
const optionNameList = ['类型', '排序方式', '风格'];


const options = ref<optionType[]>([
    {
        name: optionNameList[0],
        value: animeStore.categoryList,
    }, {
        name: optionNameList[1],
        value: ['按年升序', '按年降序', '按月升序', '按月降序'],
    }, {
        name: optionNameList[2],
        value: animeStore.styleList,
    }
]);

const optionMenuList = ref<string[]>([]);
const optionMenuNumber = ref<number>(NaN);

const upIcon = ref<SVGElement[]>();


const textInput = ref<string>();


const handleOption = (value: string[] | number[], index: number) => {

    if (!Number.isNaN(optionMenuNumber.value) && optionMenuNumber.value !== index) {
        iconChange(optionMenuNumber.value);
    }

    if (optionMenuList.value.length > 0 && optionMenuNumber.value === index) {
        optionMenuList.value = [];
        iconChange(optionMenuNumber.value);
        optionMenuNumber.value = NaN;
    } else {
        optionMenuList.value = (value as string[]);

        iconChange(index);
        optionMenuNumber.value = index;
    }
}

const iconChange = (index: number) => {
    if (upIcon.value![index].style.transform !== 'rotate(180deg)') {
        upIcon.value![index].style.transform = 'rotate(180deg)';
    } else {
        upIcon.value![index].style.transform = 'rotate(0deg)';
    }
}

const routerName = computed(() => {
    if (activeStore.getActiveNum() === 0) {
        return 'found';
    } else if (activeStore.getActiveNum() === 1) {
        return 'channel';
    }
    return 'my';
})

const handleCancel = () => {
    searchStore.setSwitch(false);
    router.push({
        name: routerName.value,
    });
}

const handleMenu = (item: string) => {
    // console.log(item);
    // console.log(optionMenuNumber.value);
    if (options.value[optionMenuNumber.value].name === item.toString()) {
        options.value[optionMenuNumber.value].name = optionNameList[optionMenuNumber.value];
    } else {
        options.value[optionMenuNumber.value].name = item.toString();
    }

    const r = () => {
        return {
            path: '/search/' + options.value[0].name,
            query: {
                sort: options.value[1].value.indexOf(options.value[1].name),
                style: options.value[2].name,
            }
        }
    }

    router.push(r());
}

watchEffect(() => {
    console.log(textInput.value);
})

const handleInput = () => {
    if (textInput.value) {
        router.push({
            name: 'searchKeyword',
            params: {
                keyword: textInput.value,
            }
        });
    }
}


</script>

<template>
    <div class="search">
        <div class="search-bar">
            <div class="search-input">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
                        fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                    <path
                        d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431"
                        stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <input type="text" v-model="textInput" name="" id="" placeholder="您可以输入名称或风格类型："
                    @keydown.enter="handleInput">
            </div>
            <div class="cancel" @click="handleCancel">取消</div>
        </div>

        <div class="search-filter">
            <div class="search-option">
                <div class="option-item" v-for="(item, index) in options" @click="handleOption(item.value, index)">
                    <span>{{ item.name }}</span>
                    <svg ref="upIcon" width="24" height="24" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 30L25 18L37 30" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <div class="search-option-menu" v-if="optionMenuList.length > 0">
                <div class="menu-item" v-for="(item) in optionMenuList" @click="handleMenu(item)"> {{ item
                    }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
@import '@/assets/css/variable.less';

.search {
    height: auto;
    width: 100%;
    position: relative;
}

.search-bar {
    display: flex;
    width: 100%;
    height: 7dvh;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .search-input {
        display: flex;
        width: 70%;
        height: 60%;
        border-radius: 10px;
        background-color: @fr-color;
        padding: 0 10px 0 10px;
        gap: 10px;

        transition: box-shadow 0.2s ease-in-out;

        svg {
            width: 30px;
            height: 100%;
        }

        input {
            flex: 1;
            height: 100%;
            background-color: @fr-color;
            font-size: 16px;
        }

        &:hover {
            box-shadow: 0 0 5px 1px @fr-color;
        }
    }

    .cancel {
        font-size: 20px;
        font-weight: 600;
        color: @error-color;
        user-select: none;
        cursor: pointer;
    }
}

.search-filter {
    width: 100%;

    .search-option {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        border-top: 1px solid @fr-color;
        padding: 10px 0 10px 0;
        font-size: 18px;

        .option-item {
            display: flex;
            align-items: center;

            cursor: pointer;

            svg {
                transition: transform 0.2s ease-in-out;
            }
        }
    }

    .search-option-menu {
        display: flex;
        flex-wrap: wrap;
        column-gap: 10px;
        row-gap: 10px;
        padding: 20px;

        .menu-item {
            padding: 10px;
            border-radius: 10px;
            color: @fr-color;
            background-color: @bg-color;
            font-size: 13px;

            user-select: none;

            cursor: pointer;

            transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;


            &:hover {
                background-color: @fr-color;
                color: @bg-color;
            }

            &:active {
                background-color: @bg-color;
                color: @fr-color;
            }
        }
    }
}
</style>