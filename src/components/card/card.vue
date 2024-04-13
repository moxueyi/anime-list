<script setup lang="ts">
import { onMounted, ref } from 'vue';

type CardProps = {
    width?: string,
    height?: string,
    img?: string,
    backFunc: Function,
}

const card = ref<HTMLDivElement>();
const props = defineProps<CardProps>();

onMounted(() => {
    card.value!.style.width = props.width ?? '200px';
    card.value!.style.height = props.height ?? '300px';
})


</script>

<template>
    <div ref="card" class="card">
        <img :src="img" alt="" @click="backFunc()">
        <slot name="card-desc"></slot>
    </div>
</template>

<style scoped lang="less">
.card {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 20px;

    img {
        flex: 1;
        cursor: pointer;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}
</style>