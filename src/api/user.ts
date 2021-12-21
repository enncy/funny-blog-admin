import { BaseApi } from "./index";
import { User } from "./models/user";
import { Result } from ".";
import { request, get, post } from "../utils/request";

export class UserApi extends BaseApi<User> {
    static baseUrl: string = "/user";

    constructor(){
        super(UserApi.baseUrl);
    }

    //登录
    static loginByAccount(account: string, password: string): Promise<Result<User>> {
        return get("/user/login/by/account", {
            params: { account, password },
        });
    }

    static logout(): Promise<Result<string>> {
        return get("/user/logout");
    }
}
