<template>
    <div>
        <div class="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-5">
            <div class="col">
                <SimpleCard
                    title="注册人数"
                    class="bg-white text-start p-3 border-radius-base"
                >
                    <Icon class="fs-3" type="icon-user" />
                    <span class="font-v1 ms-3"> {{ userCount }} </span>
                </SimpleCard>
            </div>
            <div class="col">
                <SimpleCard
                    title="文章数量"
                    class="bg-white text-start p-3 border-radius-base"
                >
                    <Icon class="fs-3" type="icon-book " />
                    <span class="font-v1 ms-3"> {{ blogCount }} </span>
                </SimpleCard>
            </div>
            <div class="col">
                <SimpleCard
                    title="在线人数"
                    class="bg-white text-start p-3 border-radius-base"
                >
                    <Icon class="fs-3" type="icon-barchart" />
                    <span class="font-v1 ms-3">111</span>
                </SimpleCard>
            </div>
        </div>

        <div class="row row-cols-lg-2 row-cols-1 g-5 mt-4">
            <div class="col">
                <div ref="chart" class="bg-white p-4"></div>
            </div>

            <div class="col">
                <div ref="chart2" class="bg-white p-4"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick, onUnmounted } from "vue";
import SimpleCard from "../components/common/SimpleCard.vue";
import * as echarts from "echarts";
import { UserApi } from "../../api/user";
import { handleApiSync } from "../../api";
import { BlogApi } from "../../api/blog";

const userCount = ref(0);
const blogCount = ref(0);

const chart = ref();
const chart2 = ref();
var myChart: echarts.ECharts;
var myChart2: echarts.ECharts;
function resize() {
    myChart.resize();
    myChart2.resize();
}

onUnmounted(() => {
    window.removeEventListener("resize", resize);
});

onMounted(async () => {
    userCount.value = (await handleApiSync(new UserApi().count()))?.data.data || 0;
    blogCount.value = (await handleApiSync(new BlogApi().count()))?.data.data || 0;

    window.addEventListener("resize", resize);

    myChart = echarts.init(chart.value, undefined, {
        height: 400,
    });

    myChart2 = echarts.init(chart2.value, undefined, {
        height: 400,
    });

    // 绘制图表
    myChart.setOption({
        title: {
            left: "center",
            text: "数据统计",
        },
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20],
            },
        ],
    });

    // 绘制图表
    myChart2.setOption({
        title: {
            left: "center",
            text: "数据统计",
        },
        xAxis: {
            type: "category",
            data: ["A", "B", "C"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [120, 200, 150],
                type: "line",
            },
        ],
    });

    nextTick(() => {
        resize();
    });
});
</script>

<style scope lang="less"></style>
