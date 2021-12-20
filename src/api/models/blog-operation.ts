import { ApiModel, BaseModel, Props } from "./base";

/**
 * 用户操作文章信息表
 */

@ApiModel("博客操作")
export class BlogOperation extends BaseModel {
    @Props("文章id", {
        type: "number",
    })
    blogId?: number;

    @Props("操作的用户id", {
        type: "number",
    })
    userId?: number;

    @Props("点赞", {
        type: "checkbox",
    })
    favor?: boolean;

    @Props("反对", {
        type: "checkbox",
    })
    oppose?: boolean;

    @Props("收藏", {
        type: "checkbox",
    })
    collect?: boolean;

    @Props("观看", {
        type: "checkbox",
    })
    watch?: boolean;
}
