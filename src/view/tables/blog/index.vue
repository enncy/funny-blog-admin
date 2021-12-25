
<template>
    <div class="text-start bg-white">
        <div class="col-12">
            <ServicePanel :model="Blog" :api="(BlogApi as any)" v-model:data-source="models.users" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref,reactive,toRefs } from 'vue';
import { BlogApi } from '../../../api/blog';
import { Blog } from '../../../api/models/blog';
import ServicePanel from '../../components/service/ServicePanel.vue';
import { models } from '../../../store/models';

</script>

<style scope lang='less'>


</style>