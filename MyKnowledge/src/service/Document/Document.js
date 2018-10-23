import { BaseAxiosInstance } from "../axios";

export const DocumentApi = (documentId, success, failure) => {
    let url = `documents/${documentId}`
    BaseAxiosInstance.get(url)
    .then(function (response) {
        console.log(response);
        if(response.data.result_status == 1) {
            success(response.data.result_data)
        } else {
            failure(response)
        }
    })
    .catch(function (error) {
        console.log(error);
        failure(error)
    });
}