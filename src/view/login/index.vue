<template>
    <SignLayout>
        <a-card class="login">
            <h4 class="fw-bold">登录</h4>
            <a-divider></a-divider>
            <a-form
                class="funny-form"
                name="custom-validation"
                ref="formRef"
                :model="accountForm"
                :rules="accountRules"
                v-bind="layout"
                @finish="onSubmit"
            >
                <a-form-item has-feedback name="account">
                    <a-input
                        placeholder="账号"
                        size="large"
                        v-model:value.trim="accountForm.account"
                        type="text"
                    />
                </a-form-item>
                <a-form-item has-feedback name="password">
                    <a-input
                        placeholder="密码"
                        size="large"
                        v-model:value.trim="accountForm.password"
                        type="password"
                    />
                </a-form-item>
                <a-form-item>
                    <div class="mt-4 d-flex flex-wrap">
                        <a-button
                            type="primary"
                            size="large"
                            html-type="submit"
                            block
                            :disabled="disabled"
                        >
                            登录
                        </a-button>
                    </div>
                </a-form-item>
            </a-form>
        </a-card>
    </SignLayout>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";

import { ref } from "vue";

import { handleApiSync } from "../../api";
import { UserApi } from "../../api/user";
import { router } from "../../route";

import {
    AccountValidators,
    createForm,
    PasswordValidators,
    Validator,
} from "../../utils/form";
import SignLayout from "../components/layout/SignLayout.vue";

interface AccountLoginForm {
    type: string;
    account: string;
    password: string;
}

const accountForm = createForm<AccountLoginForm>({
    type: "password",
    account: "",
    password: "",
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
};

const layout = {
    wrapperCol: { span: 24 },
};

const disabled = ref(false);

async function onSubmit() {
    disabled.value = true;
    let { account, password } = accountForm;

    const res = await handleApiSync(UserApi.loginByAccount(account, password));

    if (res?.data.success) {
        message.success(res.data.msg);
        setTimeout(() => {
            router.push("/");
        }, 1000);
    }

    disabled.value = false;
}
</script>

<style scope lang="less">
.login {
    min-width: 20%;
}
</style>
