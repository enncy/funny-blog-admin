<template>
    <div>
        <div class="font-v2">
            {{ title }}
        </div>
        <a-divider style="margin: 12px;"></a-divider>

        <div class="p-2">
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
