import { BaseModel } from "./models/base";
import { message } from "ant-design-vue";
import { AxiosResponse } from "axios";
import { get, post } from "../utils/request";
import { Page } from "./models/page";

export interface Constructor<R> {
    new (): R;
}

export class BaseApi<T extends BaseModel> implements Api<T> {
    public baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public selectById(id: number): Promise<Result<T>> {
        return get(this.baseUrl + "/get/one", { params: id });
    }
    public search(searchObj: any): Promise<Result<T[]>> {
        return get(this.baseUrl + "/search", { params: { ...searchObj } });
    }
    public list(page: number, size: number, args: any): Promise<Result<Page<T>>> {
        return get(this.baseUrl + "/list", { params: { page, size, ...args } });
    }
    public save(target: T): Promise<Result<boolean>> {
        return post(this.baseUrl + "/insert", target);
    }
    public update(target: T): Promise<Result<boolean>> {
        return post(this.baseUrl + "/update", target);
    }
    public removeById(id: number): Promise<Result<boolean>> {
        return get(this.baseUrl + "/delete", { params: { id } });
    }
    public count(): Promise<Result<number>> {
        return get(this.baseUrl + "/count");
    }
}

export interface Api<T extends BaseModel> {
    selectById(id: number): Promise<Result<T>>;

    search(searchObj: any): Promise<Result<T[]>>;

    list(page: number, size: number, args: any): Promise<Result<Page<T>>>;

    save(target: T): Promise<Result<boolean>>;

    update(target: T): Promise<Result<boolean>>;

    removeById(id: number): Promise<Result<boolean>>;

    count(): Promise<Result<number>>;
}

export interface ResultBody<T> {
    status: number;

    success: boolean;

    msg: string;

    data: T;
}

export type Result<T> = AxiosResponse<ResultBody<T>>;

export function handleApi<T>(fn: Promise<Result<T>>, callback?: (res: Result<T>) => void) {
    fn.then((result) => {
        if (result.data.success) {
            callback?.(result);
        } else {
            message.error(result.data.msg);
        }
    }).catch((err) => {
        message.error("网络错误");
    });
}

export async function handleApiSync<T>(fn: Promise<Result<T>>): Promise<Result<T> | undefined> {
    try {
        const result = await fn;
        if (result.data.success) {
            return result;
        } else {
            message.error(result.data.msg);
        }
        return result;
    } catch (e) {
        message.error("请求错误 : " + e);
    }
    return undefined;
}
