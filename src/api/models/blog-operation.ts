import { BlogApi } from "../blog";
import { UserApi } from "../user";
import { ApiModel, BaseModel, Props } from "./base";
import { Blog } from "./blog";
import { User } from "./user";

/**
 * 用户操作文章信息表
 */

@ApiModel("博客操作")
export class BlogOperation extends BaseModel {
    @Props("文章id", {
        type: "number",
        reference: {
            search: (obj: any) => new BlogApi().search(obj),
            model: Blog,
        },
    })
    blogId?: number;

    @Props("操作的用户id", {
        type: "number",
        reference: {
            search: (obj: any) => new UserApi().search(obj),
            model: User,
        },
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
