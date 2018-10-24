import { BaseAxiosInstance } from "../axios";

export const DocumentsApi = (pageNo, platform, series, accessories, dataType, success, failure) => {
    let url = `filter_documents_list?page=${pageNo}&per_page=20`
    BaseAxiosInstance.post(url, uploadContent(platform, series, accessories, dataType))
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

uploadContent = (platform, series, accessories, dataType) => {
    return {
        "platform_id": platform,
        "series": series,
        "accessories": accessories,
        "languages": null,
        "document_type_id": dataType
    }
}