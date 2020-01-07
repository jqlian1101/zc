import { OPEN_CAR_DETAIL, MODEL_SAVE_CONNECT_DEFINED, CLEAR_ALL_DATA_UISTATE } from 'store/mutation-types.js';
import { CAR_ELE_DICT } from 'common/constants'

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
