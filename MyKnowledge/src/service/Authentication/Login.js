import { BaseAxiosInstance } from "../axios";

export const LoginApi = (login, password, success, failure) => {
    let url = `login`
    // login='robodiego'
    // password='Buddy6jar!'
    BaseAxiosInstance.post(url, {login: login, password: password})
    .then(function (response) {
        if(response.data.result_status == 1) {
            success(manipulateLoginResponse(response))
        } else {
            failure(response)
        }
    })
    .catch(function (error) {
        console.log(error);
        failure(error)
    });
}

const manipulateLoginResponse = (response) => {
    return {
        name: response.data.result_data.user.displayName,
        token: response.headers["set-cookie"][0]
    }
}