<template>
    <div>
        <!-- 添加模型 -->
        <a-button type="primary" @click="visible = !visible">
            <template #icon><Icon type="icon-plus" /></template>
            添加设置
        </a-button>

        <a-modal
            v-model:visible="visible"
            :title="'添加' + title"
            @ok="emits('insertModel', modelImpl)"
            cancelText="取消"
            okText="添加"
        >
            <ApiForm v-model:model="modelImpl" :infos="infos" />
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { Constructor } from "../../../api";
import { BaseModel, ModelPropsInfo } from "../../../api/models/base";
import ApiForm from "./ApiForm.vue";
interface ModelInsertButtonProps<M extends BaseModel> {
    model: Constructor<M>;
    title: string;
    infos: ModelPropsInfo[];
}
const props = withDefaults(defineProps<ModelInsertButtonProps<BaseModel>>(), {});
const { model } = toRefs(props);

// 实例化模型
const modelImpl = reactive(new model.value());

const emits = defineEmits<{
    (e: "insertModel", v: BaseModel): void;
}>();

const visible = ref(false);
</script>

<style scope lang="less"></style>
