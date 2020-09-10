import request from '@/utils/request'

export function getPackageIas(params) {
    return request({
        url: '/algo_sdk/package_ias',
        method: "post",
        params
    })
}


export function getSdkOpenCV(params) {
    return request({
        url: '/algo_sdk/opencv_message',
        method:"post",
        params
    })
}

export function postAlgoFilesResult(formData) {
    return request({
        url: 'algo_sdk/run_file_get_results',
        method:"post",
        data:formData,
    })
}

export function getAlgoFiles(formData) {
    return request({
        url: 'algo_sdk/get_results',
        method:"post",
        responseType: "arraybuffer",
        data:formData
    })
}


export function getAlgoFilesTaskId(params) {
  return request({
        url: 'algo_sdk/taskstatus',
        method:"get",
        params
    })
}

export function clearAlgoRunEnv(formData) {
  return request({
        url: 'algo_sdk/clear_env',
        method:"post",
        data:formData
    })
}


// data_set
export function AlgoDataSetFormatXml(formData) {
  return request({
        url: 'algo_sdk/format_xml',
        method:"post",
        data:formData
    })
}

export function AlgoDataSetFormatImage(formData) {
  return request({
        url: 'algo_sdk/image_data_set',
        method:"post",
        data:formData
    })
}

export function getAlgoDataSetTaskId(params) {
  return request({
        url: 'algo_sdk/data_set_taskstatus',
        method:"get",
        params
    })
}


export function clearDataSetEnv(formData) {
  return request({
        url: 'algo_sdk/data_set_clean_env',
        method:"post",
        data:formData
    })
}

//miss_rate

export function getMissRateTaskId(params) {
  return request({
        url: 'algo_sdk/rate_taskstatus',
        method:"get",
        params
    })
}


export function getAlgoPrecision(formData) {
    return request({
        url: 'algo_sdk/get_files_result',
        method:"post",
        data:formData
    })
}

// performamce

export function getAlgoResourceOccupation(formData) {
    return request({
        url: 'algo_sdk/resource_occupation',
        method:"post",
        data:formData
    })
}
