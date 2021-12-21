<template>
    <!-- 模型更新框 -->
    <a-modal @ok="emits('updateModel', model)" cancelText="取消" okText="修改">
        <ApiForm v-model:model="model" :infos="infos" />
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { BaseModel, ModelPropsInfo } from "../../../api/models/base";
import ApiForm from "./ApiForm.vue";
interface ModelUpdateModalProps {
    model: BaseModel;
    infos: ModelPropsInfo[];
}
const props = withDefaults(defineProps<ModelUpdateModalProps>(), {});
const { model } = toRefs(props);

const emits = defineEmits<{
    (e: "updateModel", v: BaseModel): void;
}>();
</script>

<style scope lang="less"></style>
