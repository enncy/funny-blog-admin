import { UserApi } from "./../user";
import { ApiModel, BaseModel, Props } from "./base";
import { User } from "./user";

/**
 * 文章表
 */
@ApiModel("博客")
export class Blog extends BaseModel {
    @Props("用户id", {
        type: "number",
        reference: {
            search: (searchObj: any) => new UserApi().search(searchObj),
            model: User,
        },
    })
    userId?: number;

    @Props("内容", {
        type: "textarea",
        searchable: true,
    })
    content?: string;

    @Props("标签", {
        searchable: true,
    })
    tags?: string;

    @Props("原文链接")
    originUrl?: string;

    @Props("标题", {
        searchable: true,
    })
    title?: string;
}
