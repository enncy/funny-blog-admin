<template>
    <div>
        <a-card :title="title">
            <div class="mb-3">
                <a-button type="primary" @click="showModal">
                    <template #icon><Icon type="icon-plus" /></template>
                    添加设置
                </a-button>
            </div>
            <a-table :dataSource="dataSource" :columns="columns">
                <template #headerCell="{ column }"> </template>

                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'operate'">
                        <span>
                            <a>修改</a>
                            <a>删除</a>
                        </span>
                    </template>
                    <template v-else>
                        {{ transform(column.key, record[column.key]) }}
                    </template>
                </template>
            </a-table>
        </a-card>

        <a-modal
            v-model:visible="visible"
            title="添加设置"
            @ok="save"
            cancelText="取消"
            okText="添加"
        >
            <ApiForm v-model:model="modelImpl" />
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref, reactive, toRefs, toRaw } from "vue";
import { BaseApi, Constructor, handleApi, handleApiSync, Result } from "../../../api";
import { BaseModel, PropsConfig } from "../../../api/models/base";
import ApiForm from "./ApiForm.vue";

interface ServiceTableProps<M extends BaseModel, A extends BaseApi<M>> {
    model: Constructor<M>;
    api: Constructor<A>;
}
const props = withDefaults(defineProps<ServiceTableProps<BaseModel, BaseApi<any>>>(), {});
const { model, api } = toRefs(props);

const visible = ref(false);

// 实例化参数
const modelImpl = reactive(new model.value());
const apiImpl = new api.value();

// 标题
const title = modelImpl.apiTitle();
// 反射元数据
const infos = modelImpl.infos();

// 列表数据
const dataSource = ref([]);

handleApi(apiImpl.list(0, 10), (list) => {
    dataSource.value = list.data.data;
});

function showModal() {
    visible.value = true;
}

function transform(key: string, value: string) {
    const transformFunction = infos.find((info) => info.key === key)?.props?.transform;
    console.log("transformFunction", transformFunction, value);

    if (transformFunction) {
        return transformFunction(value);
    } else {
        return value;
    }
}

async function save() {
    visible.value = false;
    const res = await handleApiSync(apiImpl.save(toRaw(modelImpl)));
    if (res?.data.success) {
        dataSource.value.push(JSON.parse(JSON.stringify(toRaw(modelImpl))));
        message.success(res.data.msg);
    }
}

const columns = infos
    .map((info) => ({
        title: info.props.name,
        dataIndex: info.key,
        key: info.key,
    }))
    .concat([
        {
            title: "操作",
            dataIndex: "operate",
            key: "operate",
        },
    ]);
</script>

<style scope lang="less"></style>
