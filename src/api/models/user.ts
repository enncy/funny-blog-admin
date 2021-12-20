import { ApiModel, BaseModel, Props } from "./base";

/**
 * 用户表
 */
@ApiModel('用户')
export class User extends BaseModel {
    @Props("密码")
    password?: string;

    @Props("账号")
    account?: string;

    @Props("邮箱")
    email?: string;

    @Props("昵称")
    nickName?: string;

    @Props("权限")
    role?: string;
}

/**
 * 注册表单
 */
export interface RegisterForm {
    account: string;
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

/**
 * 重置密码表单
 */
export interface ResetForm {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}
