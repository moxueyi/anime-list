<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAnimeStore, useFilterStore } from '@/store';
import { Anime } from '@/types';
import Card from '@/components/card';

const route = useRoute()
const router = useRouter()

const category = ref<string>('');
const sort = ref<number>(NaN);
const style = ref<string>('');
const keyword = ref<string>('');

const cardWidth = '100%';
const cardHeight = '250px';

const animeStore = useAnimeStore();
const filterStore = useFilterStore();
const animeList: Anime[] = animeStore.getAnimeList();;

const searchList = ref<Anime[]>();

watchEffect(() => {

    if (route.params.category) {
        category.value = route.params.category as string;
    }
    if (route.query.sort) {
        sort.value = Number(route.query.sort as string);
    }
    if (route.query.style) {
        style.value = route.query.style as string;
    }
    if (route.params.keyword) {
        keyword.value = route.params.keyword as string;
    }

    console.log(category.value, sort.value, style.value, keyword.value);
})

watch(() => category.value, (newVal) => {
    if (newVal !== '类型') {
        searchList.value = filterStore.filterCategory(animeList, newVal);
    } else {
        searchList.value = animeStore.getAnimeList();
    }
})

type sortFuncType = {
    [key: number]: (a: Anime, b: Anime) => number
}

const sortFunc: sortFuncType = {
    0: (a: Anime, b: Anime) => {
        return a.year - b.year;
    },
    1: (a: Anime, b: Anime) => {
        return b.year - a.year
    },
    2: (a: Anime, b: Anime) => {
        return a.quarter - b.quarter
    },
    3: (a: Anime, b: Anime) => {
        return b.quarter - a.quarter
    },
}

watch(() => sort.value, (newVal) => {
    if (newVal !== -1) {
        searchList.value = filterStore.filterDate(searchList.value!, sortFunc[newVal]);
    }
})


watch(() => style.value, (newVal) => {
    if (newVal !== '风格' && category.value !== '类型') {
        searchList.value = filterStore.filterStyle(filterStore.filterCategory(animeList, category.value), newVal);
    } else {
        if (category.value === '类型') {
            searchList.value = filterStore.filterStyle(animeList, newVal);
        } else {
            searchList.value = filterStore.filterCategory(animeList, category.value);
        }
    }
})

watch(() => keyword.value, (newVal) => {
    if (newVal !== '') {
        searchList.value = filterStore.filterKeyword(animeStore.getAnimeList(), newVal);
    }
})

onMounted(() => {
    if (category.value === '类型') {
        searchList.value = animeStore.getAnimeList();;
    }
})

function handleRouter(key: string) {
    return function () {
        router.push({
            path: '/detial',
            query: {
                key,
            }
        })
    }
};

</script>

<template>
    <div class="search">
        <Card v-for="item in searchList" :key="item.key" :width="cardWidth" :height="cardHeight" :img="item.image"
            :back-func="handleRouter(item.key)">

            <template #card-desc>
                <div class="desc">
                    <div class="name">{{ item.name }}</div>
                    <div class="date">{{ item.year }}年{{ item.quarter }}月季度</div>
                    <div class="style">
                        <span v-for="style in item.style">{{ style }}</span>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped lang="less">
@import '@/assets/css/variable.less';

.search {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.desc {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .name {
        font-size: 20px;
        font-weight: 600;
        color: #000;
    }

    .date {
        font-size: 18px;
        color: #666;
    }

    .style {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;

        span {
            font-size: 14px;
            color: @bg-color;
        }
    }
}
</style>