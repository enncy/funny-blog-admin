<template>
    <div class="text-start row g-4">
        <div class="col-12">
        
            <ServicePanel :model="SystemSetting" :api=" (SystemSettingApi as any )"  v-model:data-source="models.users" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { watch } from "@vue/runtime-core";
import { SystemSettingApi } from "../../../api/system.setting";
import { SystemSetting } from "../../../api/models/system.setting";
import { models } from "../../../store/models";
import { routes } from "../../../route";
import ServicePanel from "../../components/service/ServicePanel.vue";




const settingRoutes = ref(JSON.stringify(routes.value, null, 4));
watch(settingRoutes, () => {
    routes.value = JSON.parse(settingRoutes.value);
});
</script>

<style scope lang="less"></style>
