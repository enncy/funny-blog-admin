import { reactive } from "vue";
import { UserApi } from "../api/user";

const status = await UserApi.status();

export const user = reactive(
    status.data.success
        ? status.data.data
        : {
              account: "",
              password: "",
              nickName: "",
              email: "",
              role: "user",
              createTime: 0,
              updateTime: 0,
          }
);
