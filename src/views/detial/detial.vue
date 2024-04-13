<script setup lang="ts">
import { Anime } from '@/types';
import { Ref, onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAnimeStore, useFilterStore } from '@/store';
import myVideo from '@/components/video';


const animeStore = useAnimeStore();
const filterStore = useFilterStore();
const styleList = animeStore.styleList;

const route = useRoute();
const router = useRouter();

let key = ref<string>();
let anime = ref<Anime>();
const infoShow = ref<HTMLDivElement>();
const showInfoIcon = ref<SVGElement>();

let moreAnimeStyleNumber = ref<number[]>([]);
setInterval(() => {
    generate();
}, 8000)

const generate = () => {
    let num1 = Math.floor(Math.random() * styleList.length);
    let num2 = Math.floor(Math.random() * styleList.length);
    let num3 = Math.floor(Math.random() * styleList.length);

    moreAnimeStyleNumber.value = [num1, num2, num3];
}

onMounted(() => {
    key.value = route.query.key as string;
    anime.value = animeStore.getAime(animeStore.getAnimeList(), key.value);
    generate();
})

watchEffect(() => {
    key.value = route.query.key as string;
    anime.value = animeStore.getAime(animeStore.getAnimeList(), key.value);
})

const handelShowInfo = () => {
    if (infoShow.value?.style.height === '0px') {
        infoShow.value.style.height = '220px';

        showInfoIcon.value!.style.transform = 'rotateZ(180deg)';
    } else {
        infoShow.value!.style.height = '0px';
        showInfoIcon.value!.style.transform = 'rotateZ(0deg)';
    }
}

const moreAnimeList = ref<Ref<Anime[]>[]>([]);
const anileList = animeStore.getAnimeList();

watch(() => moreAnimeStyleNumber.value, (newVal) => {
    moreAnimeList.value = [];

    newVal.forEach(numb => {
        moreAnimeList.value.push(ref(filterStore.filterStyle(anileList, styleList[numb])));
    })
})

function handleRouter(key: string) {
    router.push({
        path: '/detial',
        query: {
            key,
        }
    })
};
</script>

<template>
    <div class="detial">
        <div class="detial-header">
            <myVideo></myVideo>
        </div>
        <div class="detial-content">
            <div class="name">
                <div>{{ anime?.name }}</div>
                <svg ref="showInfoIcon" style="transition: transform .5s ease-out;" @click="handelShowInfo" width="24"
                    height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36 19L24 31L12 19H36Z" fill="none" stroke="#333" stroke-width="4"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <div ref="infoShow" style="height: 0px; overflow: hidden; transition: height .5s ease-in-out;">
                <div class="info">
                    <div class="img"><img :src="anime?.image" alt=""></div>
                    <div class="date"> <span>时间 : </span>
                        {{ anime?.year }}年{{ anime?.quarter }}月</div>
                    <div class="style"><span>类型 : </span>
                        <div v-for="item in anime?.style">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="more-anime">
            <div class="more-title">更多动漫</div>
            <div class="more-anime-list" v-for="(item, index) in moreAnimeList">
                <span class="anime-style-name">
                    {{ styleList[moreAnimeStyleNumber[index]] }}
                </span>
                <div class="anime-style-list">
                    <img class="anime-style-item" alt="" v-for="animeitem in item.value" :src="animeitem.image"
                        @click="handleRouter(animeitem.key)">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.detial {
    position: relative;
    width: 100%;
    height: 100%;
}

.detial-header {
    width: 100%;
}

.detial-content {
    display: flex;
    flex-direction: column;
    padding: 10px;
    position: relative;

    .name {
        margin: 10px 0 20px;
        font-size: 26px;
        font-weight: bold;
        position: relative;
        display: flex;

        div {
            flex: 1;
        }

        svg {
            cursor: pointer;
            width: 40px;
            height: 40px;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        writing-mode: vertical-lr;
        text-orientation: mixed;

        img {
            height: 220px;
        }

        .date,
        .style {
            span {
                font-size: 18px;
                font-weight: 600;
            }
        }

        .style {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
    }

}

.more-anime {
    display: flex;
    flex-direction: column;
    padding: 10px;

    .more-title {
        font-size: 21px;
        font-weight: bold;
        margin-bottom: 10px;
    }

}

.more-anime-list {
    display: flex;
    flex-direction: column;

    .anime-style-name {
        font-size: 19px;
        font-weight: bold;
        margin-top: 20px;
    }

    .anime-style-list {
        display: flex;
        flex-direction: row;

        overflow-x: auto;
        width: 100%;
        height: 150px;
        gap: 10px;

        .anime-style-item {
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>
