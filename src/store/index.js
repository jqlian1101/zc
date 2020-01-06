import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import createPersistedState from "vuex-persistedstate"

import models from './modules/models'
import uiState from './modules/uiState'
import argCfg from './modules/argCfg'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// vuex数据缓存，防止刷新后数据丢失
const createPersisted = createPersistedState({
    storage: window.sessionStorage
})

export default new Vuex.Store({
    modules: {
        models, uiState, argCfg
    },
    strict: debug,
    // plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
    plugins: [createPersisted]
});
