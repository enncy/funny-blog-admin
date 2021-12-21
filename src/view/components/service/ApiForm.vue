<template>
    <a-form :model="model" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <template v-for="info of infos">
            <a-form-item :label="info.props?.name || '无'">
                <!-- 文本域 -->
                <template v-if="info.props.type === 'textarea'">
                    <a-textarea
                        :disabled="info.props.disable"
                        v-model:value="model[info.key]"
                    />
                </template>

                <!-- 选项处理 -->
                <template v-else-if="info.props.type === 'select'">
                    <a-select v-model:value="model[info.key]">
                        <template v-for="option of info.props.options" :key="option.key">
                            <a-select-option :value="option.key">
                                {{ option.value }}
                            </a-select-option>
                        </template>
                    </a-select>
                </template>

                <!-- 外键处理 -->
                <template v-else-if="info.props.reference">
                    <a-input-search
                        v-model:value="model[info.key]"
                        :disabled="info.props.disable"
                        placeholder="输入id , 或点击搜索"
                        enter-button
                        @search="visible = !visible"
                    />
                    <ReferenceSelect
                        v-model:visible="visible"
                        :reference="info.props.reference"
                        :infos="infos"
                    />
                </template>

                <!-- 其他 -->
                <template v-else>
                    <a-input
                        :disabled="info.props.disable"
                        :type="info.props.type"
                        v-model:value="model[info.key]"
                    />
                </template>
            </a-form-item>
        </template>
    </a-form>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch } from "vue";
import { Result } from "../../../api";
import { BaseModel, ModelPropsInfo, PropsConfig } from "../../../api/models/base";
import ReferenceSelect from "./ReferenceSelectModal.vue";

interface UpdateFormProps<M extends BaseModel> {
    model: M;
    infos: ModelPropsInfo[];
}

const props = withDefaults(defineProps<UpdateFormProps<BaseModel>>(), {});
const { model, infos } = toRefs(props);

const emits = defineEmits(["update:model"]);

const visible = ref(false);

watch(model, () => {
    console.log("model update", model.value);

    emits("update:model", model.value);
});
</script>

<style scope lang="less"></style>
