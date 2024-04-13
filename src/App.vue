<script setup lang="ts">
import MyHeader from '@/components/header';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
const route = useRoute();


</script>

<template>
    <div class="container">
        <MyHeader v-if="route.path !== '/detial'"></MyHeader>
        <main>
            <RouterView></RouterView>
        </main>
    </div>
</template>

<style lang="less">
@import '@/assets/css/variable.less';

#app {
    height: 100dvh;
    width: 100dvw;
    background-color: @bg-color;

    display: grid;
    place-items: center;

    position: fixed;
}

.container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 414px;
    height: 736px;
    background-color: @fr-color;
    overflow: hidden;

    @media screen and (max-width: 414px) {
        height: 100%;
        width: 100%;
    }

    main {
        flex: 1;
        overflow: auto;
    }
}
</style>