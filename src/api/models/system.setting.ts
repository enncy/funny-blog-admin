import { ApiModel, BaseModel, Props } from "./base";

@ApiModel('系统设置')
export class SystemSetting extends BaseModel  {
    
    @Props("名字",{
        searchable:true
    })
    name?:string

    @Props("内容",{
        type: "textarea",
        searchable:true
    })
    content?:string
}
