<template>
    <a-form
        name="custom-validation"
        ref="formRef"
        :model="user"
        :rules="accountRules"
        v-bind="layout"
        @finish="onSubmit"
    >
        <a-form-item has-feedback name="account" label="账号">
            <a-input
                placeholder="账号"
                size="large"
                v-model:value.trim="user.account"
                type="text"
            />
        </a-form-item>
        <a-form-item has-feedback name="password" label="密码">
            <a-input-password
                placeholder="密码"
                size="large"
                v-model:value.trim="user.password"
                type="password"
            />
        </a-form-item>
        <a-form-item has-feedback name="email" label="邮箱">
            <a-input
                placeholder="邮箱"
                size="large"
                v-model:value.trim="user.email"
                type="email"
            />
        </a-form-item>

        <a-form-item has-feedback name="nickName" label="昵称">
            <a-input
                placeholder="昵称"
                size="large"
                v-model:value.trim="user.nickName"
                type="text"
            />
        </a-form-item>

        <a-form-item>
            <div class="row gx-5">
                <div class="col-6">
                    <a-button type="default" @click="formRef.resetFields()" block>
                        重置
                    </a-button>
                </div>
                <div class="col-6">
                    <a-button type="primary" html-type="submit" block>提交 </a-button>
                </div>
            </div>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref, reactive, toRefs } from "vue";
import { handleApiSync } from "../../api";
import { User } from "../../api/models/user";
import { UserApi } from "../../api/user";
import { user } from "../../store/user";
import {
    AccountValidators,
    createForm,
    PasswordValidators,
    Validator,
} from "../../utils/form";

const formRef = ref();

const accountRules = {
    account: {
        required: true,
        validator: Validator.all(...AccountValidators),
        trigger: "blur",
    },
    password: {
        required: true,
        validator: Validator.all(...PasswordValidators),
        trigger: "blur",
    },
    email: {
        required: true,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().email())
        ),
        trigger: "blur",
    },
    nickName: {
        required: false,
        validator: Validator.all(
            Validator.regexpFilter((filter) => filter.blank().specialChar(true))
        ),
        trigger: "blur",
    },
};

const layout = {
    wrapperCol: { span: 24 },
};

const disabled = ref(false);

async function onSubmit() {
    disabled.value = true;
    const { id, account, password, email, nickName } = user;
    const res = await handleApiSync(
        new UserApi().update({ id, account, password, email, nickName })
    );
    if (res?.data.success && res?.data.data) {
        message.success(res.data.msg);
    } else {
        message.error("更新失败");
    }
    disabled.value = false;
}
</script>

<style scope lang="less"></style>
