import "reflect-metadata";
import { Constructor, Result } from "..";

@ApiModel("基础对象")
export class BaseModel {
    [x: string]: any;

    constructor() {
        let t = Date.now();
        this.createTime = t;
        this.updateTime = t;
    }

    @Props("id", {
        type: "number",
        disable: true,
    })
    id?: number;

    @Props("创建时间", {
        disable: true,
        transform: (s) => new Date(s).toLocaleString(),
    })
    createTime?: number;

    @Props("更新时间", {
        disable: true,
        transform: (s) => new Date(s).toLocaleString(),
    })
    updateTime?: number;

    // 获取 Props 的值
    props(key: string | symbol) {
        return Reflect.getMetadata("model:props", this, key) as PropsConfig;
    }
    // 获取 ApiModel 的值
    apiTitle(): string {
        return BaseModel.apiTitle(this);
    }

    static apiTitle(target: BaseModel): string {
        return Reflect.getMetadata("api:model", target.constructor);
    }

    // 获取全部 Props 的值
    public infos(): ModelPropsInfo[] {
        return BaseModel.infos(this);
    }

    public static infos(target: BaseModel) {
        let keys = Reflect.ownKeys(target)
            .map((k) => k.toString())
            .filter((k) => !["updateTime", "createTime", "id"].includes(k));
        keys = keys.concat(["updateTime", "createTime", "id"]);

        return keys.map((k) => {
            return {
                key: k.toString(),
                props: Reflect.getMetadata("model:props", target, k) as PropsConfig,
            };
        });
    }
}

// 给实体进行注解
export function ApiModel(name: string): ClassDecorator {
    return (target: Object) => {
        Reflect.defineMetadata("api:model", name, target);
    };
}

// 给实体字段进行注解
export function Props(name: string, props?: PropsConfig): PropertyDecorator {
    props = props || {};
    props.name = name;
    return (target: Object, propertyKey: string | symbol) => {
        Reflect.defineMetadata("model:props", props, target, propertyKey);
    };
}

// 模型信息
export interface ModelPropsInfo {
    key: string;
    props: PropsConfig;
}

// 外键引入函数
export interface ReferenceConfig<M extends BaseModel> {
    search: (searchObj: any) => Promise<Result<BaseModel[]>>;
    model: Constructor<M>;
}

export interface PropsConfig {
    // 属性名
    name?: string;
    // 类型
    type?: string;
    // 是否禁用
    disable?: boolean;
    // 转换函数
    transform?: (str: string) => string;
    // 是否可供搜索
    searchable?: boolean;
    // 外键
    reference?: ReferenceConfig<any>;
    // 可选项 要搭配 type 为 select 的类型
    options?: {key:string,value:string}[];
}
