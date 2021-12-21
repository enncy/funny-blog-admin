<template>
    <div class="text-start bg-white">
        <div class="col-12">
            <ServicePanel :model="User" :api="(UserApi as any)"   v-model:data-source="models.users"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { User } from "../../../api/models/user";
import { UserApi } from "../../../api/user";
import { models } from "../../../store/models";
import ServicePanel from "../../components/service/ServicePanel.vue";


</script>

<style scope lang="less"></style>
