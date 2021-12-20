<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in" :duration="200">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
</script>

<style scope lang="less"></style>
