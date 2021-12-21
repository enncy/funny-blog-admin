<template>
    <!-- 业务分页 -->
    <a-pagination
        show-less-items
        show-quick-jumper
        show-size-changer
        :show-total="showTotal"
    />
</template>

<script setup lang="ts">
import { PaginationProps } from "ant-design-vue/es/pagination";
 
function showTotal(total: number, range: any) {
    return `当前共有 ${total} 条数据,现在显示 ${range[0]} - ${range[1]}`;
}
</script>

<style scope lang="less"></style>
