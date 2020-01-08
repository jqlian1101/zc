import { request } from 'utils/request';
import config from './config';

// 获取参数列表
const getArgsList = (params) => request(`${config.baseUrl}/resultrecord/getParamList`, { ...params });

// 根据参数获取车辆列表
const getCaListBYCode = (params) => request(`${config.baseUrl}/resultrecord/getCaListBYCode`, { ...params });

// 计算
const getCalculateResults = (params) => request(`${config.baseUrl}/resultrecord/getCalculateResults`, { ...params }, { showLoading: false });

// 获取计算结果详情
const getResultInfo = (params) => request(`${config.baseUrl}/resultrecord/getResultInfo`, { ...params });

// 保存计算结果
const saveResultRecord = (params) => request(`${config.baseUrl}/resultRecord/saveResultRecord`, { ...params });

// 获取记录列表
const getRecordList = (params) => request(`${config.baseUrl}/resultRecord/getRecordList`, { ...params });

// 获取记录详情
const getRecordInfo = (params) => request(`${config.baseUrl}/resultRecord/getRecordInfo`, { ...params });

// 获取报告模板列表
const getReportTempList = (params) => request(`${config.baseUrl}/resultRecord/getReportTempList`, { ...params });

export default {
    getArgsList,
    getCaListBYCode,
    getCalculateResults,
    getResultInfo,

    saveResultRecord,
    getRecordList,
    getRecordInfo,
    getReportTempList
}
