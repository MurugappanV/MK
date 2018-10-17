import { BaseAxiosInstance } from "../axios";

export const SettingsApi = (success, failure) => {
    let url = `filters`
    BaseAxiosInstance.get(url)
    .then(function (response) {
        console.log("settings response", response);
        if(response.data.result_status == 1) {
            success(response.data.result_data)
        } else {
            failure(error)
        }
    })
    .catch(function (error) {
        console.log("settings error", error);
        failure(error)
    });
}

