<script setup lang="ts">
import MyNav from './nav.vue';
import Search from './search.vue';
import { useSearchStore } from '@/store';
const searchStore = useSearchStore();

</script>

<template>
    <header>
        <KeepAlive>
            <component :is="searchStore.searchSwitch ? Search : MyNav"></component>
        </KeepAlive>
    </header>
</template>

<style scoped lang="less">
@import '@/assets/css/variable.less';

header {
    width: 100%;
    background-color: @primary-color;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
}
</style>