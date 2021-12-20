import { reactive, watch } from "vue";
import { User } from "../api/models/user";

export const user = reactive<User>(
    JSON.parse(localStorage.getItem("user") || "{}") || {
        account: "",
        password: "",
        nickName: "",
        email: "",
        role: "user",
        createTime: 0,
        updateTime: 0,
    }
);

watch(user, () => {
    localStorage.setItem("user", JSON.stringify(user));
});
