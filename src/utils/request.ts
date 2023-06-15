import axios, { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { store } from "@/store";
import router from "@/router/";

const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASEURL
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = store.state.user;
    console.log(user);

    if (user && user.token) {
      config.headers && (config.headers.Authorization = `Bearer ${user.token}`);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    const status = response.data.status;
    // 请求正常情况
    if (!status || status === 200) {
      return response;
    }

    // 登录失效
    if (status === 410000) {
      store.commit("setUser", null);
      router.push({
        name: "login",
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      });
      // 在内部消化掉这个业务异常 阻止往下执行
      return Promise.reject(response);
    }

    // 其他异常情况
    ElMessage.error(response.data.msg || "请求失败，请联系管理员");
    // 手动返回一个Primise异常
    return Promise.reject(response);
    // if (response.data.status && response.data.status !== 200) {
    //   ElMessage.error(response.data.msg || '请求失败，请联系管理员')
    //   return Promise.reject(response.data)
    // }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then((response) => {
    return (response.data.data || response.data) as T;
  });
};
