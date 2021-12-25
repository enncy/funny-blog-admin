<template>
    <div>
        <div class="fw-bold mb-2">
            {{ title }}
        </div>

        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
interface SimpleCardProps {
    title: string;
}
const props = withDefaults(defineProps<SimpleCardProps>(), {});
const {} = toRefs(props);
</script>

<style scope lang="less"></style>
