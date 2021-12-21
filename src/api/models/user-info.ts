import { UserApi } from "../user";
import { ApiModel, BaseModel, Props } from "./base";
import { User } from "./user";

/**
 * 用户信息详情表
 */
@ApiModel("博客操作")
export class UserInfo extends BaseModel {
    @Props("用户id", {
        type: "number",
        reference: {
            search: (searchObj: any) => new UserApi().search(searchObj),
            model: User,
        },
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

    @Props("学校",{
        searchable:true
    })
    school?: string;

    @Props("专业",{
        searchable:true
    })
    major?: string;

    @Props("公司",{
        searchable:true
    })
    company?: string;

    @Props("职位",{
        searchable:true
    })
    position?: string;
}
