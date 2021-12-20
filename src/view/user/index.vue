<template>
    <div class="text-start d-flex justify-content-center">
        <SimpleCard title="账号信息设置" class="bg-white p-4 col-lg-4 col-md-8 col-12">
            <a-divider></a-divider>
            <AccountSetting />
        </SimpleCard>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import SimpleCard from "../components/common/SimpleCard.vue";
import AccountSetting from "./AccountSetting.vue";
</script>

<style scope lang="less"></style>
