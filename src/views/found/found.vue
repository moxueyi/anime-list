<script setup lang="ts">
import Card from '@/components/card';
import { useAnimeFound } from '@/store';
import { useRouter } from 'vue-router';


const animeFound = useAnimeFound();
const cardWidth = '100%';
const cardHeight = '250px';

const router = useRouter();

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

const refresh = () => {
    animeFound.setFoundList();
}

</script>

<template>
    <div class="found">
        <Card v-for="item in animeFound.animeFoundList" :key="item.key" :width="cardWidth" :height="cardHeight"
            :img="item.image" :back-func="handleRouter(item.key)">

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

    <div class="refresh" @click="refresh">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 8V24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 24L6 40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M42 24C42 14.0589 33.9411 6 24 6C18.9145 6 14.3216 8.10896 11.0481 11.5M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519"
                stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
    <div class="end" v-if="animeFound.animeFoundList.length === 0">没有任何数据，尝试右下角刷新</div>
    <div class="end" v-else>到底了哦</div>
</template>


<style scoped lang="less">
@import '@/assets/css/variable.less';


.found {
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

.refresh {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: @link-color;
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: grid;
    place-items: center;
    cursor: pointer;

    &:hover {
        svg {
            transform-origin: center;

            animation: rotate 2s linear infinite;

            @keyframes rotate {
                0% {
                    transform: rotate(0deg);

                }

                100% {

                    transform: rotate(360deg);

                }
            }
        }
    }
}

.end {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 20px;
}
</style>