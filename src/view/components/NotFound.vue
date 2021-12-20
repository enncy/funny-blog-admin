<template>
    <a-result
        status="404"
        title="404"
        sub-title="Sorry, the page you visited does not exist."
    >
        <template #extra>
            <a-button type="primary" @click="$router.back()">返回上一页</a-button>
        </template>
    </a-result>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
</script>

<style scope lang="less"></style>
