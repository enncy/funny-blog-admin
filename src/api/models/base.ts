import "reflect-metadata";

@ApiModel("基础对象")
export class BaseModel {
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

    apiTitle(): string {
        return Reflect.getMetadata("api:model", this);
    }

    props(key: string | symbol) {
        return Reflect.getMetadata("model:props", this, key) as PropsConfig;
    }

    infos() {
        let keys = Reflect.ownKeys(this)
            .map((k) => k.toString())
            .filter((k) => !["updateTime", "createTime", "id"].includes(k));
        keys = keys.concat(["updateTime", "createTime", "id"]);

        return keys.map((k) => {
            return {
                key: k.toString(),
                value: Reflect.get(this, k),
                props: Reflect.getMetadata("model:props", this, k) as PropsConfig,
            };
        });
    }
}

export function ApiModel(name: string): ClassDecorator {
    return (target: Object) => {
        Reflect.defineMetadata("api:model", name, target);
    };
}

export interface PropsConfig {
    name?: string;
    type?: string;
    disable?: boolean;
    transform?: (str: string) => string;
}

export function Props(name: string, props?: PropsConfig): PropertyDecorator {
    props = props || {};
    props.name = name;
    return (target: Object, propertyKey: string | symbol) => {
        Reflect.defineMetadata("model:props", props, target, propertyKey);
    };
}
