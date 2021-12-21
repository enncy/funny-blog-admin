import { BaseApi, Result } from ".";
import { request, get, post } from "../utils/request";
import { SystemSetting } from "./models/system.setting";

export class SystemSettingApi extends BaseApi<SystemSetting> {
    static baseUrl: string = "/system/setting";

    constructor(){
        super(SystemSettingApi.baseUrl);
    }

    // 查找设置
    static findByName(name: string): Promise<Result<SystemSetting>> {
        return get("/system/setting/find/by/name", {
            params: { name },
        });
    }
}
