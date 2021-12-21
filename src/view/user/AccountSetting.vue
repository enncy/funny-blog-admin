<template>
    <a-form
        name="custom-validation"
        ref="formRef"
        :model="accountForm"
        :rules="accountRules"
        v-bind="layout"
        @finish="onSubmit"
    >
        <a-form-item has-feedback name="account" label="账号">
            <a-input
                placeholder="账号"
                size="large"
                v-model:value.trim="accountForm.account"
                type="text"
            />
        </a-form-item>
        <a-form-item has-feedback name="password" label="密码">
            <a-input
                placeholder="密码"
                size="large"
                v-model:value.trim="accountForm.password"
                type="password"
            />
        </a-form-item>
        <a-form-item has-feedback name="email" label="邮箱">
            <a-input
                placeholder="邮箱"
                size="large"
                v-model:value.trim="accountForm.email"
                type="email"
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
import { ref, reactive, toRefs } from "vue";
import { user } from "../../store/user";
import {
    AccountValidators,
    createForm,
    PasswordValidators,
    Validator,
} from "../../utils/form";

interface AccountLoginForm {
    account: string;
    password: string;
    email: string;
}
const formRef = ref();
const accountForm = createForm<AccountLoginForm>({
    account: user.account || "",
    password: user.password || "",
    email: user.email || "",
});

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
};

const layout = {
    wrapperCol: { span: 24 },
};

const disabled = ref(false);

function onSubmit() {
    console.log();
}
</script>

<style scope lang="less"></style>
