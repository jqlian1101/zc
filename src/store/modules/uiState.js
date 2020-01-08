import { OPEN_CAR_DETAIL, MODEL_SAVE_CONNECT_DEFINED, CLEAR_ALL_DATA_UISTATE, MODEL_SAVE_DEFINED_ELE_STATUS, MODEL_INIT_ELE_STATUS } from 'store/mutation-types.js';
import { CAR_ELE_DICT } from 'common/constants'

function distinct (arr) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (!newArr.includes(arr[i])) {
            newArr.push(arr[i])
        }
    }
    return newArr
}


// state
const state = {
    // 车辆大样图 图例数据
    carDetail: {},  // 当前大样图显示的车辆信息
    carDetailInfo: {} // key: 链接系统中的车辆id，value：{front:[], back:[],info:[]}，已定义的元件列表：前端面，后端面，车辆信息
}

// getters
const getters = {
    // 是否展示车辆明细图
    isOpenCarDetail (state) {
        return JSON.stringify(state.carDetail) !== '{}'
    },

    // 获取当前大样图车辆的连接系统列表
    curCarConnectDetail (state) {
        let connectId = state.carDetail.connectId
        if (connectId) {
            return state.carDetailInfo[connectId] || {};
        }
        return {}
    },

    // 获取当前car的车号
    curCarNum (state) {
        let { row, cal } = state.carDetail;
        if (!row || !cal) return null;
        return { row, col: cal }
    },

    carDefinedEle (state) {
        return (carNum) => {
            if (carNum) return state.carDetailInfo;
            return state.carDetailInfo[carNum] || {};
        }
    }
}

// actions
const actions = {
    // 保存当前选中的车辆信息
    saveCurCarDetail ({ commit }, data) {
        commit({ type: OPEN_CAR_DETAIL, data })
    },

    // 保存已定义的连接系统 列表
    saveDefinedConnect ({ commit }, data) {
        commit({ type: MODEL_SAVE_CONNECT_DEFINED, data })
    },

    // 保存元件定义状态
    saveDefinedEleStatus ({ commit }, data) {
        console.log('saveDefinedEleStatus : ', data)
        commit({ type: MODEL_SAVE_DEFINED_ELE_STATUS, data })
    },

    initEleStatus ({ commit }, data) {
        commit({ type: MODEL_INIT_ELE_STATUS, data })
    },

    clearAllDataUIState ({ commit }) {
        commit({ type: CLEAR_ALL_DATA_UISTATE })
    }
}

// mutations
const mutations = {
    // 保存当前选中的车辆信息
    [OPEN_CAR_DETAIL] (state, { data }) {
        state.carDetail = data || {};
    },

    // 保存已定义的连接系统 列表
    // data: { id, type, eleType元件类型 }
    // id: 车辆编号：1-1，1-2 。。。
    [MODEL_SAVE_CONNECT_DEFINED] (state, { data }) {
        let carDetailInfo = state.carDetailInfo;

        !carDetailInfo[data.id] && (carDetailInfo[data.id] = { front: [], back: [] });
        if (data.type === CAR_ELE_DICT.front.key) {  // 前端面
            carDetailInfo[data.id][CAR_ELE_DICT.front.label].push(data.eleType);
        } else if (data.type === CAR_ELE_DICT.back.key) {  // 后端面
            carDetailInfo[data.id][CAR_ELE_DICT.back.label].push(data.eleType);
        } else if (data.type === CAR_ELE_DICT.info.key) {   // 车辆参数
            carDetailInfo[data.id][CAR_ELE_DICT.info.label].push(data.eleType);
        }

        state.carDetailInfo = carDetailInfo;
    },


    // 保存已定义的 元件 列表
    // data: { id, type, eleType元件类型 }
    // id: 车辆编号：1-1，1-2 。。。
    [MODEL_SAVE_DEFINED_ELE_STATUS] (state, { data }) {
        let carDetailInfo = state.carDetailInfo;

        !carDetailInfo[data.id] && (carDetailInfo[data.id] = { front: [], back: [], info: [] });
        let _data = [];
        let id = data.id;
        let label = '';
        if (data.type === CAR_ELE_DICT.front.label) {  // 前端面
            label = CAR_ELE_DICT.front.label;
        } else if (data.type === CAR_ELE_DICT.back.label) {  // 后端面
            label = CAR_ELE_DICT.back.label
        } else if (data.type === CAR_ELE_DICT.info.label) {   // 车辆参数
            label = CAR_ELE_DICT.info.label
        }

        _data = carDetailInfo[id][label];

        if (Array.isArray(data.eleKey)) {
            _data = [..._data, ...data.eleKey]
        } else {
            if (data.isDefined) {
                _data.push(data.eleKey)
            } else {
                const delIdx = _data.findIndex((item) => item === data.eleKey);
                delIdx !== -1 && _data.splice(delIdx, 1)
            }
        }

        carDetailInfo[id][label] = distinct([..._data]);

        state.carDetailInfo = carDetailInfo;
    },

    [MODEL_INIT_ELE_STATUS] (state, { data }) {
        let carDetailInfo = state.carDetailInfo;
        if (data.carNum) {
            carDetailInfo[data.id] = { front: [], back: [], info: [] }
        } else {
            carDetailInfo = {};
        }
        state.carDetailInfo = carDetailInfo;
    },

    // 清空数据
    [CLEAR_ALL_DATA_UISTATE] (state) {
        state.carDetail = {};
        state.carDetailInfo = {};
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
