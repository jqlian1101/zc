/**
 * 模型树，车辆参数 api列表
 */

import { request } from 'utils/request';
import config from './config';

// 车辆参数 详情
const vehicleView = (params) => request(`${config.baseUrl}/ca/view`, { ...params }, {
    method: 'post'
});

// 车辆参数 编辑
const vehicleEdit = (params) => request(`${config.baseUrl}/ca/save`, { ...params }, {
    method: 'post'
});

// 车辆参数 复制
const vehicleCopy = (params) => request(`${config.baseUrl}/ca/caCopy`, { ...params }, {
    method: 'post'
});


// 车辆参数_牵引系统查询
const tractionView = (params) => request(`${config.baseUrl}/tr/view`, { ...params }, {
    method: 'post'
});

// 车辆参数_牵引系统编辑
const tractionEdit = (params) => request(`${config.baseUrl}/tr/save`, { ...params }, {
    method: 'post'
});

// 车辆参数_制动系统查询
const brakesView = (params) => request(`${config.baseUrl}/br/view`, { ...params }, {
    method: 'post'
});

// 车辆参数_制动系统编辑
const brakesEdit = (params) => request(`${config.baseUrl}/br/save`, { ...params }, {
    method: 'post'
});

// 车辆参数_用户自定义查询
const diyView = (params) => request(`${config.baseUrl}/diy/view`, { ...params }, {
    method: 'post'
});

// 车辆参数_用户自定义编辑
const diySave = (params) => request(`${config.baseUrl}/diy/save`, { ...params }, {
    method: 'post'
});






export default {
    vehicleView,
    vehicleEdit,
    vehicleCopy,

    tractionView,
    tractionEdit,

    brakesView,
    brakesEdit,

    diySave,
    diyView
}
