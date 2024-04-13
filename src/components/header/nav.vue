<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useActiveNum } from '@/store';
import { useSearchStore } from '@/store';
const searchStore = useSearchStore();

const activeStore = useActiveNum();

const buttonList = {
    '发现': '/',
    '频道': '/channel',
    '我的': '/my',
}

const router = useRouter();

const handleRouter = (path: string, index: number) => {
    router.push(path);
    activeStore.setActiveNum(index);
}

const handleSearch = () => {
    searchStore.setSwitch(true);
    router.push('/search/类型?sort=-1&style=风格');
}

</script>

<template>
    <nav>
        <div class="left">
            <div class="clendar">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect class="clendar-rect" x="4" y="4" width="40" height="40" rx="2" fill="none" stroke="#333"
                        stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 14H44" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <line x1="44" y1="11" x2="44" y2="23" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M12 22H16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 22H26" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32 22H36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 29H16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 29H26" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32 29H36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 36H16" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M22 36H26" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32 36H36" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <line x1="4" y1="11" x2="4" y2="23" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
        <div class="center">
            <div v-for="(item, key, index) in buttonList" :key="key">
                <button v-if="index === activeStore.getActiveNum()" class="active" type="button"
                    @click="handleRouter(`${item}`, index)">{{ key }}</button>
                <button v-else type="button" @click="handleRouter(`${item}`, index)">{{ key }}</button>
                <span></span>
            </div>
        </div>
        <div class="right">
            <div class="search" @click="handleSearch">
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
            </div>
        </div>
    </nav>
</template>

<style scoped lang="less">
@import '@/assets/css/variable.less';

nav {
    display: grid;
    grid-template-columns: 1.5fr 3fr 1.5fr;
    height: 7dvh;
    width: 100%;
    position: relative;
}

.left,
.center,
.right {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        cursor: pointer;
        user-select: none;
    }
}

.center {
    gap: 10px;
    white-space: nowrap;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        span {
            width: 0px;
            height: 0px;
            position: absolute;
            bottom: 0;

            transition: all 0.2s ease-in-out;
        }

        &:hover {
            span {
                width: 100%;
                height: 3px;
                border-radius: 1.5px;
                background-color: #fff;
            }
        }
    }

    button {
        font-size: 18px;
        padding: 10px;
        background-color: transparent;
        align-self: center;
        justify-self: center;

        &:active {
            color: @fr-color;
        }
    }

    .active+span {
        width: 100%;
        height: 3px;
        border-radius: 1.5px;
        background-color: #fff;
    }

}


.clendar {

    &:hover {
        .clendar-rect {
            stroke-dasharray: 160;
            stroke-dashoffset: 160;
            animation: rect 2s linear infinite;

            @keyframes rect {
                0% {
                    stroke-dashoffset: 160;
                }

                100% {
                    stroke-dashoffset: -160;
                }
            }
        }
    }

}

.search {
    svg {
        &:hover {
            animation: upAndDown 1s linear infinite;

            @keyframes upAndDown {

                0% {
                    transform: translateY(0px);

                }

                25% {
                    transform: translateY(-5px);
                }

                50% {
                    transform: translateY(0px);
                }

                75% {
                    transform: translateY(5px);
                }

                100% {
                    transform: translateY(0px);
                }
            }
        }
    }
}
</style>