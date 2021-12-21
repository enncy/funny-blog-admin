<template>
    <!-- 外键引入选择框 -->
    <a-modal
        width="1000px"
        centered
        :title="'选择' + modelImpl.apiTitle()"
        cancelText="取消"
        okText="选择"
        @ok="emits('select', selectKey)"
    >
        <div>
            <ServiceSearchInput @search-model="getReference" :model="reference.model" />
        </div>

        <a-table
            :dataSource="models"
            :columns="columns"
            :scroll="{ x: 1300, y: 1000 }"
            tableLayout="auto"
            rowKey="id"
            size="small"
            :pagination="false"
            :loading="loading"
            :row-selection="{
                onChange: onKeyChange,
                type: 'radio',
            }"
        >
        </a-table>
    </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { handleApiSync } from "../../../api";
import { BaseModel, ModelPropsInfo, ReferenceConfig } from "../../../api/models/base";
import ServiceSearchInput from "./ServiceSearchInput.vue";
interface ReferenceSelectProps {
    reference: ReferenceConfig<BaseModel>;
}

const emits = defineEmits<{
    (e: "select", id: number): void;
}>();

const props = withDefaults(defineProps<ReferenceSelectProps>(), {});
const { reference } = toRefs(props);

// 加载中
const loading = ref(false);
// 数据
const models = ref<any>([]);

// 选中选
const selectKey = ref(0);

const modelImpl = new reference.value.model()

const infos = modelImpl.infos()
console.log("infos",infos);

// 表头
const columns = ref(
    (infos as any)
        .map((info: any) => ({
            title: info.props.name,
            dataIndex: info.key,
            key: info.key,
            minWidth: 100,
        }))
        .concat([
            {
                title: "操作",
                dataIndex: "operate",
                key: "operate",
                fixed: "right",
            },
        ])
);

async function getReference(searchObj: string) {
 
    const res = await handleApiSync(reference.value.search(searchObj));

    if (res?.data.success) {
        models.value = res.data.data;
    }
}

function onKeyChange(selectedRowKeys: any) {
    console.log(selectedRowKeys);
    selectKey.value = selectedRowKeys[0];
}
</script>

<style scope lang="less"></style>
