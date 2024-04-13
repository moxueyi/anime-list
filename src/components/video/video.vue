<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const videoRef = ref<HTMLVideoElement>();
const progress = ref(0);
const duration = ref(0);
const playRef = ref<string>('opacity: 1;');
const pauseRef = ref<string>('opacity: 0;');

const toggleVideo = () => {
    if (videoRef.value?.paused) {
        videoRef.value?.play();
        playRef.value = 'opacity: 0;';
        pauseRef.value = 'opacity: 1;';
    } else {
        videoRef.value?.pause();
        playRef.value = 'opacity: 1;';
        pauseRef.value = 'opacity: 0;';
    }
}

const updateProgress = () => {
    if (videoRef.value) {
        // currentTime不保留小数
        const currentTime = Math.floor(videoRef.value.currentTime);
        progress.value = (Math.floor(currentTime / 60) + ':' + (currentTime % 60)) as unknown as number;
    }
};

const setDuration = () => {
    if (videoRef.value) {
        duration.value = Math.floor(videoRef.value.duration);
        duration.value = (Math.floor(duration.value / 60) + ':' + (duration.value % 60)) as unknown as number;
    }
};

onMounted(() => {

    if (videoRef.value) {

        videoRef.value.addEventListener('timeupdate', updateProgress);

        videoRef.value.addEventListener('loadedmetadata', setDuration);

    }

});

</script>

<template>
    <div class="video-container">
        <video ref="videoRef" src="http://codelover.club/coursefiles/lnnpREORzoIdSs-hRgPHOKXVIzwM.mp4" loop
            @timeupdate="updateProgress" @loadedmetadata="setDuration">
        </video>
        <div class="controls">
            <div class="controls-top">
                <img src="@/assets/play-icon/return.svg" alt="" @click="router.back()">
                <img src="@/assets/play-icon/share.svg" alt="">
            </div>
            <div class="controls-center">
                <div class="play-pause" @click="toggleVideo">
                    <img :style="playRef" src="@/assets/play-icon/play-one.svg" alt="">
                    <img :style="pauseRef" src="@/assets/play-icon/pause-one.svg" alt="">
                </div>
            </div>
            <div class="controls-bottom">
                <div class="timer">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="28" r="16" fill="none" stroke="#333" stroke-width="4" />
                        <path d="M28 4L20 4" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M24 4V12" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M35 16L38 13" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path class="hour-hand" d="M24 28V22" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path class="minute-hand" d="M24 28H18" stroke="#333" stroke-width="4" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    {{ progress }}/{{ duration }}
                </div>
                <svg class="volume" width="24" height="24" viewBox="0 0 48 48" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
                        fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                    <path ref="volumeOne"
                        d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
                        stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path ref="volumeTwo"
                        d="M34.2359 41.1857C40.0836 37.6953 44 31.305 44 24C44 16.8085 40.2043 10.5035 34.507 6.97906"
                        stroke="#333" stroke-width="4" stroke-linecap="round" />
                </svg>
                <svg class="speed" width="24" height="24" viewBox="0 0 48 48" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M30.2972 18.7786C30.2972 18.7786 27.0679 27.8809 25.5334 29.47C23.9988 31.0591 21.4665 31.1033 19.8774 29.5687C18.2882 28.0341 18.244 25.5019 19.7786 23.9127C21.3132 22.3236 30.2972 18.7786 30.2972 18.7786Z"
                        fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                    <path
                        d="M38.8492 38.8492C42.6495 35.049 45 29.799 45 24C45 12.402 35.598 3 24 3C12.402 3 3 12.402 3 24C3 29.799 5.35051 35.049 9.15076 38.8492"
                        stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24 4V8" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M38.8454 11.1421L35.7368 13.6593" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M42.5223 27.2328L38.6248 26.333" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M5.47737 27.2328L9.37485 26.333" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M9.15463 11.142L12.2632 13.6593" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.video-container {
    width: 100%;
    height: 100%;
    position: relative;

    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 15px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .controls-center,
    .controls-bottom {
        display: none;
    }

    .controls-top {
        display: flex;
        justify-content: space-between;
        padding: 0 20px 0 20px;

        img {
            width: 30px;
            height: 30px;
            cursor: pointer;
            background-color: transparent;

            // 改变svg图片颜色
            filter: invert(1);
        }
    }


    &:hover {


        .controls-center {
            display: grid;
            place-items: center;
            position: relative;
            width: 70px;
            height: 70px;
            margin: 0 auto;

            border-radius: 30%;

            background-color: rgba(255, 255, 255, 0.7);

            .play-pause {
                position: relative;
                display: grid;
                place-items: center;

                img {
                    width: 50px;
                    height: 50px;
                    cursor: pointer;
                    position: absolute;
                    transition: opacity 0.3s ease-in;
                }
            }

        }

        .controls-bottom {
            display: flex;
            justify-content: space-around;

            filter: invert(1);
        }
    }
}

.timer {

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    gap: 5px;
}
</style>