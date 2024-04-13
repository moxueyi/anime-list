<script setup lang="ts">
import { useAnimeStore, useFilterStore } from '@/store';
import Card from '@/components/card';
import { RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const animeStore = useAnimeStore();
const filterStore = useFilterStore();
const animeList = animeStore.getAnimeList();
const styleList = animeStore.styleList;

const cardWidth = '100%';
const cardHeight = '100%';

const channelKeyList: string[] = [];

styleList.forEach((style) => {
    let filterList = filterStore.filterStyle(animeList, style);
    for (const item of filterList) {
        if (!channelKeyList.includes(item.key) || channelKeyList.includes(item.key) && filterList.length < 2) {
            channelKeyList.push(item.key);
            return;
        }
    }
})

function handleClick(style: string) {
    return function () {
        // 跳转子路由并携带路由参数
        router.push(
            {
                path: '/channel/' + style,
            }
        )
    }
}

</script>

<template>
    <div class="channel" v-show="route.path === '/channel'">
        <div class="channel-item" v-for="(style, index) in styleList">
            <Card :width="cardWidth" :height="cardHeight"
                :img="animeStore.getAime(animeList, channelKeyList[index])?.image" :back-func="handleClick(style)">
            </Card>
            <div class="text">
                <span>{{ style }}</span>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<style scoped lang="less">
.channel {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
    overflow: auto;
    padding: 10px;
}

.channel-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    cursor: pointer;

}

.text {

    pointer-events: none;

    position: absolute;
    font-size: 28px;
    font-weight: bold;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    span {
        user-select: none;
    }
}
</style>