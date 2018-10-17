import { BaseAxiosInstance } from "../axios";

export const LoginApi = (login, password, success, failure) => {
    let url = `login`
    BaseAxiosInstance.post(url, {login, password})
    .then(function (response) {
        console.log(response);
        success(response)
    })
    .catch(function (error) {
        console.log(error);
        failure(error)
    });
}