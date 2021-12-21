<template>
    <div compact class="row row-cols-1 row-cols-lg-5 g-1">
        <template v-for="info of searchableInfos">
            <a-input class="col" style="width: fit-content;" v-model:value="searchObj[info.key]" :placeholder="'输入'+info.props.name">
                <template #prefix> {{ info.props.name }} </template>
            </a-input>
        </template>
        <a-button class="col" style="width: 100px;" type="primary" @click="onSearch"> 搜索 </a-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { Constructor } from "../../../api";
import { BaseModel, ModelPropsInfo } from "../../../api/models/base";

interface ServiceSearchInputProps<M extends BaseModel> {
    model: Constructor<M>;
}
const props = withDefaults(defineProps<ServiceSearchInputProps<BaseModel>>(), {});
const { model } = toRefs(props);

const modelImpl = new model.value();

// 可搜索的值
const searchableInfos: ModelPropsInfo[] = modelImpl
    .infos()
    .filter((info) => info?.props?.searchable);

let searchObj = reactive<any>({});

function onSearch() {
    // 清除无用的字段
    for (const key in searchObj) {
        if (!searchObj[key]) {
            delete searchObj[key];
        }
    }
    emits("searchModel", searchObj);
}

const emits = defineEmits<{
    (e: "searchModel", searchObj: any): void;
}>();
</script>

<style scope lang="less"></style>
