import { request } from "utils/request";
import config from "./config";

/** ---------------------------- 压溃管 ---------------------------- */
// 获取压溃管模版列表
const getYKGTempList = params =>
    request(
        `${config.baseUrl}/ykgtemp/ykgTempData`,
        { ...params },
        { needUserInfo: true }
    );

// 保存压溃管模版
const saveYKGTemp = params =>
    request(
        `${config.baseUrl}/ykgtemp/saveYkgTemp`,
        { ...params },
        { needUserInfo: true }
    );

// 删除压溃管模版
const delYKGTemp = params =>
    request(
        `${config.baseUrl}/ykgtemp/delYkgTemp`,
        { ...params },
        { needUserInfo: true }
    );

// 根据id查询压溃管信息详情
const getYKGTempView = params =>
    request(
        `${config.baseUrl}/ykgtemp/getYkgTempView`,
        { ...params },
        { needUserInfo: true }
    );

// 删除压溃管模版前校验是否应用
const delYkgTempBfSearch = params =>
    request(
        `${config.baseUrl}/ykgtemp/delYkgTempBfSearch`,
        { ...params },
        { needUserInfo: true }
    );

/** ---------------------------- 缓冲器 ---------------------------- */
/**
 * 分段函数法
 */
// 查询缓冲器分段函数法模版列表
const getCoupFdhsfTempList = params =>
    request(
        `${config.baseUrl}/coupFdhsfTemp/getCoupFdhsfTempData`,
        { ...params },
        { needUserInfo: true }
    );

// 查询缓冲器分段函数法模版详情
const getCoupFdhsfTempView = params =>
    request(
        `${config.baseUrl}/coupFdhsfTemp/getCoupFdhsfTempView`,
        { ...params },
        { needUserInfo: true }
    );

// 删除分段函数法模版
const delCoupFdhsfTemp = params =>
    request(
        `${config.baseUrl}/coupFdhsfTemp/delCoupFdhsfTemp`,
        { ...params },
        { needUserInfo: true }
    );

// 保存缓冲器分段函数法模版信息
const saveCoupFdhsfTemp = params =>
    request(
        `${config.baseUrl}/coupFdhsfTemp/saveCoupFdhsfTemp`,
        { ...params },
        { needUserInfo: true }
    );

/**
 * 描点法
 */
// 查询缓冲器描点法模版列表
const getCoupMdfTempList = params =>
    request(
        `${config.baseUrl}/coupMdfTemp/getCoupMdfTempData`,
        { ...params },
        { needUserInfo: true }
    );

// 查询缓冲器描点法模版详情
const getCoupMdfTempView = params =>
    request(
        `${config.baseUrl}/coupMdfTemp/getCoupMdfTempView`,
        { ...params },
        { needUserInfo: true }
    );

// 删除描点法模版
const delCoupMdfTemp = params =>
    request(
        `${config.baseUrl}/coupMdfTemp/delCoupMdfTemp`,
        { ...params },
        { needUserInfo: true }
    );

// 保存缓冲器描点法模版信息
const saveCoupMdfTemp = params =>
    request(
        `${config.baseUrl}/coupMdfTemp/saveCoupMdfTemp`,
        { ...params },
        { needUserInfo: true }
    );

export default {
    // 压溃管
    getYKGTempList,
    delYKGTemp,
    saveYKGTemp,
    getYKGTempView,
    delYkgTempBfSearch,

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
};
