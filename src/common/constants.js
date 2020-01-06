import Icon from 'assets/icon';

export const MENU_LIST = [
    {
        name: '模型搭建',
        key: 'model',
        icon: Icon['model'],
        activeIcon: Icon['modelActive'],
        url: '/page/model'
    },
    {
        name: '模型参数库',
        key: 'argcfg',
        icon: Icon['arg'],
        activeIcon: Icon['argActive'],
        url: '/page/arg-cfg'
    },
    {
        name: '计算与报告',
        key: 'report',
        icon: Icon['report'],
        activeIcon: Icon['reportActive'],
        url: '/page/report'
    }
];

// export const MODEL_TREE_TYPE = {
//     train: 'train',         // 列车参数
//     basic: 'basic',         // 列车基本参数
//     vehicle: 'vehicle',     // 车辆参数
//     connect: 'connect',     // 连接系统
//     circuit: 'circuit',     // 线路
//     args: 'args'            // 模型参数
// }

export const SESSION_USERINFO_KEY = '__USERINFO__';
export const SESSION_USER_MENULIST = '__USER_MENULIST__';


export const MODEL_TREE_TYPE = {
    train: 'LCCS',         // 列车参数
    basic: 'VE',         // 列车基本参数
    vehicle: 'CA',     // 车辆参数
    connect: 'CJLJXT',     // 连接系统
    circuit: 'XLCS',     // 线路
    args: 'MXCSB'            // 模型参数
}

export const MODEL_TYPE_LINK_LIST = ['LCCS', 'VE', 'CA', 'CJLJXT', 'XLCS', 'MXCSB'];

export const CONNECT_ELE_DICT = {
    hcq: 'hcq',         // 缓冲器
    xjzc: 'xjzc',       // 橡胶轴承
    ykg: 'ykg',         // 压溃管
    gzbh: 'gzbh',       // 过载保护
    fpq: 'fpq',         // 防爬器
    cjjz: 'cjjz',       // 车间减震
    fd: 'fd',           // 风挡
    diy1: 'diy1',       // 自定义1
    diy2: 'diy2'        // 自定义2
}

export const VEHICLE_ELE_DICT = {
    diy1: 'diy1',         // 用户自定义1
    diy2: 'diy2',         // 用户自定义2
    diy3: 'diy3',         // 用户自定义3
    qyxt: 'qyxt',         // 牵引系统
    zdxt: 'zdxt'          // 制动系统
}

export const CAR_ELE_DICT = {
    front: { key: 1, label: 'front' },
    back: { key: 2, label: 'back' },
    info: { key: 3, label: 'info' }
}

export const CONNECT_ELE_FIELD_DICT = {
    hcq: ['couGap', 'couRoute', 'couDeboost', 'coupdef', 'couMdfId', 'couFdhsfId', 'couQuality', 'couEquation'],         // 缓冲器
    xjzc: ['kelas', 'selas'],       // 橡胶轴承
    ykg: ['ykgTempId'],         // 压溃管
    gzbh: ['fprot', 'sprot'],       // 过载保护
    fpq: ['fanclim', 'sanclim', 'skanclim'],         // 防爬器
    cjjz: ['jzqTcsdId', 'jzqNum'],       // 车间减震
    fd: ['fdlFront'],           // 风挡
    diy1: ['diy1TcsdId', 'diy1X'],       // 自定义1
    diy2: ['diy2TcsdId', 'diy2X']        // 自定义2
}

export const VEHICLE_ELE_FIELD_DICT = {
    diy1: ['diy1TcsdData'],
    diy2: ['diy2TcsdData'],
    diy3: ['diy3TcsdData'],
    qyxt: ['tracdef', 'emNum', 'tracf', 'delayTime', 'loadTime', 'tcsd'],
    zdxt: ['brakedef', 'brakef', 'delayTime', 'loadTime', 'tcsd']
}


export const DIY_XAXIS_OPTIONS = [
    { name: "位移", id: 1 },
    { name: "速度", id: 2 },
    { name: "时间", id: 3 }
];


export const GLOBAL_MSG_CENTER_TOKEN = {
    page_jump: 'page_jump'
}
