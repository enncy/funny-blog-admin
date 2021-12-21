import { ApiModel, BaseModel, Props } from "./base";

/**
 * 用户表
 */
@ApiModel("用户")
export class User extends BaseModel {
    @Props("密码")
    password?: string;

    @Props("账号", {
        searchable: true,
    })
    account?: string;

    @Props("邮箱", {
        searchable: true,
    })
    email?: string;

    @Props("昵称", {
        searchable: true,
    })
    nickName?: string;

    @Props("权限", {
        searchable: true,
        type:'select',
        options:[
            {key:'admin',value:'管理员'},
            {key:'user',value:'用户'},
            {key:'visitor',value:'游客'}
        ]
    })
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
