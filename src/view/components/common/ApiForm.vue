<template>
    <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <template v-for="info of infos">
            <a-form-item :label="info.props.name || '无'">
                <a-input
                    :disabled="info.props.disable"
                    :type="info.props.type"
                    v-model:value="formState[info.key]"
                />
            </a-form-item>
        </template>
    </a-form>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch } from "vue";
import { Result } from "../../../api";
import { BaseModel, PropsConfig } from "../../../api/models/base";

interface UpdateFormProps<M extends BaseModel> {
    model: M;
}

const props = withDefaults(defineProps<UpdateFormProps<BaseModel>>(), {});
const { model } = toRefs(props);

const emits = defineEmits<{
    (e: "update:model", v: any);
}>();

const infos = model.value.infos();
const formState = reactive(model.value);

watch(formState, () => {
    emits("update:model", formState);
});
</script>

<style scope lang="less"></style>
