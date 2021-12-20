<template>
    <div class="p-5">
        <div class="d-flex mb-3">
            <div><a-button type="primary">Primary Button</a-button></div>
            <div><a-button type="default">Default Button</a-button></div>
            <div><a-button type="dashed">Dashed Button</a-button></div>
            <div><a-button type="text">Text Button</a-button></div>
            <div><a-button type="link">Link Button</a-button></div>
            <div><a-button type="link">Link Button</a-button></div>
        </div>

        <div class="col-6">
            <div class="mb-3">
                <a-alert message="SuccessTips" type="success" show-icon />
            </div>
            <div class="mb-3">
                <a-alert message="InformationalNotes" type="info" show-icon />
            </div>
            <div class="mb-3"><a-alert message="Warning" type="warning" show-icon /></div>
            <div class="mb-3"><a-alert message="Error" type="error" show-icon /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
</script>

<style scope lang="less"></style>
