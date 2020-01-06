import { request } from 'utils/request';
import config from './config';


/** ---------------------------- 压溃管 ---------------------------- */
// 获取压溃管模版列表
const getYKGTempList = (params) => request(`${config.baseUrl}/ykgtemp/ykgTempData`, { ...params });

// 保存压溃管模版
const saveYKGTemp = (params) => request(`${config.baseUrl}/ykgtemp/saveYkgTemp`, { ...params });

// 删除压溃管模版
const delYKGTemp = (params) => request(`${config.baseUrl}/ykgtemp/delYkgTemp`, { ...params });

// 根据id查询压溃管信息详情
const getYKGTempView = (params) => request(`${config.baseUrl}/ykgtemp/getYkgTempView`, { ...params });


/** ---------------------------- 缓冲器 ---------------------------- */
/**
 * 分段函数法
 */
// 查询缓冲器分段函数法模版列表
const getCoupFdhsfTempList = (params) => request(`${config.baseUrl}/coupFdhsfTemp/getCoupFdhsfTempData`, { ...params });

// 查询缓冲器分段函数法模版详情
const getCoupFdhsfTempView = (params) => request(`${config.baseUrl}/coupFdhsfTemp/getCoupFdhsfTempView`, { ...params });

// 删除分段函数法模版
const delCoupFdhsfTemp = (params) => request(`${config.baseUrl}/coupFdhsfTemp/delCoupFdhsfTemp`, { ...params });

// 保存缓冲器分段函数法模版信息
const saveCoupFdhsfTemp = (params) => request(`${config.baseUrl}/coupFdhsfTemp/saveCoupFdhsfTemp`, { ...params });


/**
 * 描点法
 */
// 查询缓冲器描点法模版列表
const getCoupMdfTempList = (params) => request(`${config.baseUrl}/coupMdfTemp/getCoupMdfTempData`, { ...params });

// 查询缓冲器描点法模版详情
const getCoupMdfTempView = (params) => request(`${config.baseUrl}/coupMdfTemp/getCoupMdfTempView`, { ...params });

// 删除描点法模版
const delCoupMdfTemp = (params) => request(`${config.baseUrl}/coupMdfTemp/delCoupMdfTemp`, { ...params });

// 保存缓冲器描点法模版信息
const saveCoupMdfTemp = (params) => request(`${config.baseUrl}/coupMdfTemp/saveCoupMdfTemp`, { ...params });


export default {
    // 压溃管
    getYKGTempList,
    delYKGTemp,
    saveYKGTemp,
    getYKGTempView,

    // 缓冲器 分段函数法
    getCoupFdhsfTempList,
    getCoupFdhsfTempView,
    delCoupFdhsfTemp,
    saveCoupFdhsfTemp,

    // 缓冲器 描点法
    getCoupMdfTempList,
    getCoupMdfTempView,
    delCoupMdfTemp,
    saveCoupMdfTemp
}
