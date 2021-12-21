<template>
    <div>
        <a-card>
            <div class="mb-3 w-100 d-flex flex-wrap">
                <!-- 添加模型 -->
                <ModelInsertButton
                    class="p-1"
                    :model="model"
                    @insert-model="save"
                    :title="'添加' + title"
                    :infos="infos"
                />

                <ServiceSearchInput
                    class="ms-lg-3 p-1"
                    @search-model="search"
                    :model="model"
                />
            </div>

            <!-- 表格显示 -->
            <div>
                <a-table
                    class="mb-3"
                    :dataSource="data.dataSource"
                    :columns="data.columns"
                    :scroll="{ x: 1300, y: 1000 }"
                    tableLayout="auto"
                    rowKey="id"
                    size="small"
                    :pagination="false"
                    :loading="data.loading"
                >
                    <template #headerCell="{ column }">
                        <!-- 如果此列可以搜索，则显示搜索图标 -->
                        <template
                            v-if="
                                infos.find(
                                    (info) =>
                                        info?.key === column.key &&
                                        info?.props?.searchable
                                )
                            "
                        >
                            {{ column.title }}
                            <Icon type="icon-search" class="font-v4" />
                        </template>
                        <template v-else> {{ column.title }} </template>
                    </template>

                    <template #bodyCell="{ column, record }">
                        <!-- 操作栏 -->
                        <template v-if="column.key === 'operate'">
                            <span>
                                <a-button
                                    type="link"
                                    size="small"
                                    class="p-1 m-1"
                                    @click="
                                        (data.selectedModel = record),
                                            (data.updateVisible = !data.updateVisible)
                                    "
                                >
                                    修改
                                </a-button>
                                <a-popconfirm
                                    :title="
                                        '确定删除此数据吗'
                                    "
                                    ok-text="确定"
                                    class="p-1 m-1"
                                    cancel-text="取消"
                                    @confirm="remove(record)"
                                >
                                    <a-button type="link" danger size="small">
                                        删除
                                    </a-button>
                                </a-popconfirm>
                            </span>
                        </template>
                        <template v-else>
                            <!-- 转换显示的值 -->
                            {{ transform(column.key, record[column.key]) }}
                        </template>
                    </template>
                </a-table>

                <!-- 分页 -->
                <ServicePagination
                    class="text-center"
                    @change="listData"
                    v-model:current="pagination.current"
                    :total="pagination.total"
                    :pageSize="pagination.pageSize"
                />
            </div>
        </a-card>

        <ModelUpdateModal
            v-model:visible="data.updateVisible"
            :infos="infos"
            :title="'修改' + title"
            :model="data.selectedModel"
            @update-model="update"
        />
    </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref, reactive, toRefs, toRaw, onMounted, watch } from "vue";
import { BaseApi, Constructor, handleApi, handleApiSync, Result } from "../../../api";
import { BaseModel, ModelPropsInfo, PropsConfig } from "../../../api/models/base";
import ApiForm from "./ApiForm.vue";
import ModelInsertButton from "./ModelInsertButton.vue";
import ServiceSearchInput from "./ServiceSearchInput.vue";
import ServicePagination from "./ServicePagination.vue";
import ModelUpdateModal from "./ModelUpdateModal.vue";
import { ServicePaginationType } from "./types";

interface ServiceTableProps<M extends BaseModel, A extends BaseApi<M>> {
    model: Constructor<M>;
    api: Constructor<A>;
}

const emits = defineEmits<{
    (e: "update:dataSource", v: any[]): void;
}>();

const props = withDefaults(defineProps<ServiceTableProps<BaseModel, BaseApi<any>>>(), {});
const { model, api } = toRefs(props);

// 实例化参数
const modelImpl = new model.value();
const apiImpl = new api.value();

// 反射获取的元数据
const infos: ModelPropsInfo[] = modelImpl.infos();
const title = modelImpl.apiTitle();

const data = reactive({
    // 搜索值
    search: "",
    // 更新框
    updateVisible: false,
    // 添加框
    insertVisible: false,
    // 是否加载
    loading: false,
    // 模型实例化
    modelImpl,
    // 接口实例化
    apiImpl,

    // 当前操作的模型
    selectedModel: modelImpl,
    // 列表数据
    dataSource: [{}],
    // 表头数据
    columns: (infos as any)
        .map((info: any) => ({
            title: info.props.name,
            dataIndex: info.key,
            key: info.key,
        }))
        .concat([
            {
                title: "操作",
                dataIndex: "operate",
                key: "operate",
                fixed: "right",
                width: 100,
            },
        ]),
});

// 分页
const pagination = ref<ServicePaginationType>({
    pageSize: 10,
    current: 0,
    total: 0,
});

onMounted(listData);

watch(data.dataSource, () => {
    emits("update:dataSource", data.dataSource);
});

// 获取数据
async function listData() {
    data.loading = true;

    // 加载列表数据
    const res = await handleApiSync(
        apiImpl.list(pagination.value.current, pagination.value.pageSize, {})
    );
    if (res?.data.success) {
        data.dataSource = res.data.data.records;
        const { size, total, current } = res.data.data;
        pagination.value.pageSize = size;
        pagination.value.total = total;
        pagination.value.current = current;
    }
    data.loading = false;
}

async function search(searchObj: any) {
    data.loading = true;

    // 加载列表数据
    const res = await handleApiSync(apiImpl.search(searchObj));
    if (res?.data.success) {
        data.dataSource = res.data.data;
        pagination.value.total = res.data.data.length;
        pagination.value.current = 0;
    }
    data.loading = false;
}

// 值转换函数
function transform(key: string, value: string) {
    const transformFunction = infos.find((info: any) => info.key === key)?.props
        ?.transform;

    if (transformFunction) {
        return transformFunction(value);
    } else {
        return value;
    }
}

// 保存模型
async function save(model: BaseModel) {
    data.insertVisible = false;
    const res = await handleApiSync(apiImpl.save(model));
    if (res?.data.success) {
        data.dataSource.push(model);
        message.success(res.data.msg);
    }
}

// 更新模型
async function update(model: BaseModel) {
    data.updateVisible = false;
    console.log("model.value", model);
    const res = await handleApiSync(apiImpl.update(model));
    if (res?.data.success) {
        data.dataSource = data.dataSource.map((data: any) => {
            if (data.id === model.id) {
                return model;
            }
            return data;
        });
        message.success(res.data.msg);
    }
}

async function remove(model: BaseModel) {
    const res = await handleApiSync(apiImpl.removeById(model.id || 0));
    if (res?.data.success) {
        data.dataSource = data.dataSource.filter((data: any) => data.id !== model.id);
        message.success(res.data.msg);
    }
}
</script>

<style scope lang="less"></style>
