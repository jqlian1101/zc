import { request } from "utils/request";
import config from "./config";

// 创建模型
const createModel = params =>
    request(`${config.baseUrl}/model/save`, { ...params });

// 打开模型
const getModels = params =>
    request(`${config.baseUrl}/model/listData`, { ...params });

// 创建模型
const getModelTree = params =>
    request(`${config.baseUrl}/model/modelTree`, { ...params });

// 创建另存为
const saveModelAs = params =>
    request(`${config.baseUrl}/model/saveAs`, { ...params });

// 车辆顺序调整
const resortVehicleOrder = params =>
    request(`${config.baseUrl}/ca/sequenceAdjust`, { ...params });

// 列车基本参数（查询，包含第一列和第二列的数据）
const getVehicleBasic = params =>
    request(`${config.baseUrl}/ve1/veView`, { ...params });

// 列车基本参数（新增 修改，包含第一列和第二列的数据）
const vehicleBasicEdit = params =>
    request(`${config.baseUrl}/ve1/save`, { ...params });

// 列车牵引力特性曲线详情（包含第一列和第二列车）
const tractionView = params =>
    request(`${config.baseUrl}/vtr1/vtrView`, { ...params });

// 列车牵引力特性曲线 保存
const tractionSave = params =>
    request(`${config.baseUrl}/vtr1/save`, { ...params });

// 牵引力曲线 列表 获取
const tractionList = params =>
    request(`${config.baseUrl}/tcsd/listData`, { ...params });

// 牵引力曲线 详情 获取
const tractionLiView = params =>
    request(`${config.baseUrl}/tcsd/tcsdView`, { ...params });

// 牵引力曲线 详情 保存
const tractionLiSave = params =>
    request(`${config.baseUrl}/tcsd/save`, { ...params });

// 保存/更新车间连接参数配置
const saveAllCoupType = params =>
    request(`${config.baseUrl}/allcouptype/saveAllCoupType`, { ...params });

// 查询车间连接参数详情
const getAllCoupTypeView = params =>
    request(`${config.baseUrl}/allcouptype/getAllCoupTypeView`, { ...params });

// 根据模型id和车辆号获取车间连接端面列表
const getAllCoupTypeByModelId = params =>
    request(`${config.baseUrl}/allcouptype/getAllCoupTypeByModelId`, {
        ...params
    });

// 比对钩缓数据
const compAllcouptypeTemp = params =>
    request(
        `${config.baseUrl}/allcouptype/compAllcouptypeTemp`,
        { ...params },
        {
            method: "post"
        }
    );

// 获取车间连接端面列表
// 模型参数，图形展示
const getAllCoupTypeList = params =>
    request(
        `${config.baseUrl}/allcouptype/getAllCoupTypeByModelId`,
        { ...params },
        {
            method: "post"
        }
    );

// 根据模型id获取标准钩缓模版
const getAllcouptypeTemp = params =>
    request(
        `${config.baseUrl}/allcouptype/getAllcouptypeTemp`,
        { ...params },
        {
            method: "post"
        }
    );

// 模型参数 -- 车辆参数 获取
const getAllCarDatas = params =>
    request(
        `${config.baseUrl}/ve1/modelData`,
        { ...params },
        {
            method: "post"
        }
    );

// 模型参数 -- 车辆参数 保存
const saveAllCarDatas = params =>
    request(
        `${config.baseUrl}/ve1/updateModelData`,
        { ...params },
        {
            method: "post"
        }
    );

// 删除模型
const delModal = params =>
    request(
        `${config.baseUrl}/model/delete`,
        { ...params },
        {
            method: "post"
        }
    );

// 删除模型
const delTcsd = params =>
    request(
        `${config.baseUrl}/tcsd/delete`,
        { ...params },
        {
            method: "post"
        }
    );

// 分享模型
const shareModal = params =>
    request(
        `${config.baseUrl}/model/share`,
        { ...params },
        {
            method: "post"
        }
    );

export default {
    saveModelAs,

    // 模型树
    createModel,
    getModels,
    getModelTree,
    resortVehicleOrder,

    // 车辆基本参数
    getVehicleBasic,
    vehicleBasicEdit,
    tractionView,
    tractionSave,
    tractionLiView,
    tractionLiSave,
    tractionList,

    // 车间链接系统
    saveAllCoupType,
    getAllCoupTypeView,
    getAllCoupTypeByModelId,

    // 模型参数
    getAllCoupTypeList,
    getAllcouptypeTemp,
    compAllcouptypeTemp,
    getAllCarDatas,
    saveAllCarDatas,

    delModal,
    delTcsd,

    shareModal
};
