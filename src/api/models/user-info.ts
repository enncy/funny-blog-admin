import { ApiModel, BaseModel, Props } from "./base";

/**
 * 用户信息详情表
 */
@ApiModel("博客操作")
export class UserInfo extends BaseModel {
    @Props("用户id", {
        type: "number",
    })
    userId?: number;

    @Props("个人简介", {
        type: "textarea",
    })
    profile?: string;

    @Props("感兴趣的标签")
    favorTags?: string;

    @Props("年龄", {
        type: "number",
    })
    age?: number;

    @Props("学校")
    school?: string;

    @Props("专业")
    major?: string;

    @Props("公司")
    company?: string;

    @Props("职位")
    position?: string;
}
