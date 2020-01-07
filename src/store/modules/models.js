
import { MODEL_SAVE_TREE_DATA, MODEL_SET_CUR_MODEL_ID, MODEL_SET_CUR_MODEL_NODE, CLEAR_ALL_DATA_MODELS } from 'store/mutation-types.js';
import { MODEL_TREE_TYPE } from 'common/constants';

import { handleTreeData } from 'utils/util';

import { model } from "api";

// state
const state = {
    modelsData: {},     // 每个元件的数据{ id: data }
    modelTreeCache: [],     // modelTree原始数据缓存
    modelsTree: [],      // 模型树数据
    curModelId: '',       // 当前选中模型树的id
    curTreeNodeId: ""      // 当前选中的tree节点id
}

// getters
const getters = {
    getTreeNodeByType (state) {
        let { modelTreeCache } = state;
        return (type) => {
            return modelTreeCache.filter((item) => { return item.type === type });
        }
    },

    getTreeNodeById (state) {
        let { modelTreeCache } = state;
        return (id) => {
            return modelTreeCache.find((item) => { return item.id === id }) || {};
        }
    },

    /**
     * 根据车辆编号获取车辆信息，返回数组，包含 车辆参数 和 连接系统
     */
    getTreeNodeByCarNum (state) {
        let { modelTreeCache } = state;
        return (carNum) => {
            return modelTreeCache.filter((item) => { return item.carNum === carNum });
        }
    },

    curTreeNodeInfo (state, getter) {
        return getter.getTreeNodeById(state.curTreeNodeId);
    },

    curCarNum (state, getter) {
        let curVe = getter.curTreeNodeInfo;
        if (!curVe.row || !curVe.cal) return null;
        return { row: curVe.row, cal: curVe.cal }
    },

    // 获取车辆列表数据，包含车辆信息和链接系统信息
    allCarData (state, getter) {
        if (window.__ALL_CAR_DATA__) return window.__ALL_CAR_DATA__;

        // 获取车辆参数中的车辆列表
        let clcsArr = getter.getTreeNodeByType(MODEL_TREE_TYPE['vehicle']);
        // 获取链接系统中的车辆列表
        let ljxtArr = getter.getTreeNodeByType(MODEL_TREE_TYPE['connect']);

        // 根据row和col将车辆的 车辆参数 和 链接系统 的节点数据进行合并
        let result = {};
        let row = null;
        clcsArr.map((item) => {
            if (row !== item.row) row = item.row;
            if (!result[row]) result[row] = [];

            let curConnect = ljxtArr.find((li) => li.row === item.row && li.cal === item.cal) || {};
            let json = {
                row: item.row,
                cal: item.cal,
                name: item.name,
                vehicleId: item.id,
                connectId: curConnect.id,
                vehicleData: item,
                connectData: curConnect
            }
            result[row].push(json);
        });

        for (let i in result) {
            result[i].sort((a, b) => a.cal - b.cal);
        }

        let list = Object.entries(result);

        // 按row进行排序；
        list.sort((a, b) => a[0] - b[0]);

        window.__ALL_CAR_DATA__ = list;

        return window.__ALL_CAR_DATA__;
    },

    // 通过车号获取车辆信息
    getCarDataByNum (state, getter) {
        return (row, cal) => {
            if (!row || !cal) return null;
            let allCarData = getter.allCarData;

            for (let i = 0; i < allCarData.length; i++) {
                if (allCarData[i][0] === row) {
                    let curRow = allCarData[i][1];
                    for (let j = 0; j < curRow.length; j++) {
                        if (curRow[j].cal === cal) {
                            return curRow[j];
                        }
                    }
                }
            }
            return null;
        }
    }

}

// actions
const actions = {
    // 从服务端获取treeData
    getModelData ({ commit, state }, { id, cb }) {
        id = id || state.curModelId;
        model.getModelTree({ id }).then(res => {
            if (!res) return;
            commit({ type: MODEL_SAVE_TREE_DATA, treeData: res.data || [] })
            commit({ type: MODEL_SET_CUR_MODEL_ID, id })

            typeof cb === 'function' && cb(res.data)
        })
    },

    // 保存当前选中的treeData
    saveModelTreeData ({ commit }, treeData) {
        commit({ type: MODEL_SAVE_TREE_DATA, treeData })
    },

    // 当前选中的model的id
    setCurModelId ({ commit }, id) {
        commit({ type: MODEL_SET_CUR_MODEL_ID, id })
    },

    // 当前选中的treeNode
    setCurTreeNodeId ({ commit }, id) {
        commit({ type: MODEL_SET_CUR_MODEL_NODE, id })
    },
    clearAllDataModels ({ commit }) {
        commit({ type: CLEAR_ALL_DATA_MODELS })
    }
}

// mutations
const mutations = {
    // 保存当前选中的treeData
    [MODEL_SAVE_TREE_DATA] (state, { treeData }) {
        let trees = handleTreeData(treeData);

        state.modelsTree = [...trees];
        state.modelTreeCache = [...treeData];    // 缓存数据
        window.__ALL_CAR_DATA__ = null;
    },

    // 当前选中的model的id
    [MODEL_SET_CUR_MODEL_ID] (state, { id }) {
        state.curModelId = id;
    },

    // 当前选中的treeNode
    [MODEL_SET_CUR_MODEL_NODE] (state, { id }) {
        state.curTreeNodeId = id;
    },

    // 清空数据
    [CLEAR_ALL_DATA_MODELS] (state) {
        state.modelTreeCache = [];
        state.modelsTree = [];
        state.curModelId = '';
        state.curTreeNodeId = "";
        window.__ALL_CAR_DATA__ = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
