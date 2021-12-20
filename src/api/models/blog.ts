import { ApiModel, BaseModel, Props } from "./base";

/**
 * 文章表
 */
@ApiModel("博客")
export class Blog extends BaseModel {
    @Props("用户id", {
        type: "number",
    })
    userId?: number;

    @Props("内容", {
        type: "textarea",
    })
    content?: string;

    @Props("标签")
    tags?: string;

    @Props("原文链接")
    originUrl?: string;

    @Props("标题")
    title?: string;
}
