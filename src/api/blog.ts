import { Blog } from "./models/blog";
import { BaseApi } from "./index";

import { Result } from ".";
import { request, get, post } from "../utils/request";

export class BlogApi extends BaseApi<Blog> {
    static baseUrl: string = "/blog";

    constructor() {
        super(BlogApi.baseUrl);
    }
}
