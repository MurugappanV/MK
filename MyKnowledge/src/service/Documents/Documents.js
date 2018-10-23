import { BaseAxiosInstance } from "../axios";

export const DocumentsApi = (pageNo, platform, series, accessories, success, failure) => {
    let url = `filter_documents_list?page=${pageNo}&per_page=20`
    BaseAxiosInstance.post(url, uploadContent(platform, series, accessories))
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

uploadContent = (platform, series, accessories) => {
    return {
        "platform_id": platform,
        "series": series,
        "accessories": accessories,
        "languages": 2
    }
}