<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from '@/components/card';
import { useAnimeStore, useFilterStore } from '@/store';

const router = useRouter();
const route = useRoute();
const style = ref<string>('');
const cardWidth = '100%';
const cardHeight = '250px';

const animeStore = useAnimeStore();
const filterStore = useFilterStore();
const animeList = animeStore.getAnimeList();


const handleBack = () => {
    router.back();
}

onMounted(() => {
    style.value = route.params.style as string;
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
}

</script>

<template>
    <div class="channel-detial">
        <Card v-for="item in filterStore.filterStyle(animeList, style)" :key="item.key" :width="cardWidth"
            :height="cardHeight" :img="item.image" :back-func="handleRouter(item.key)">

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
        <div class="back" @click="handleBack">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M44 40.8361C39.1069 34.8632 34.7617 31.4739 30.9644 30.6682C27.1671 29.8625 23.5517 29.7408 20.1182 30.303V41L4 23.5453L20.1182 7V17.167C26.4667 17.2172 31.8638 19.4948 36.3095 24C40.7553 28.5052 43.3187 34.1172 44 40.8361Z"
                    fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
            </svg>
        </div>
    </div>
</template>

<style scoped lang="less">
@import '@/assets/css/variable.less';

.channel-detial {
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

.back {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: @link-color;
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: grid;
    place-items: center;
    cursor: pointer;
}
</style>