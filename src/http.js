import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "加载中..",
        background: "rgba(0,0,0,.7)"
    })
}

function endLoading() {
    loading.close();
}


//请求拦截
axios.interceptors.request.use(config => {
    startLoading();
    if (localStorage.getItem("kd_token")) {
        config.headers.Authorization = localStorage.getItem("kd_token");
    }
    return config;
}, error => {
    return Promise.reject(error);
});

//相应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    endLoading();
    Message.error(error.response.data);
    let { status } = error.response;
    if (status == 401) {
        localStorage.removeItem("kd_token");
        router.push("/login");
    }

    return Promise.reject(error);
});

export default axios;