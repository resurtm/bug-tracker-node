import Vue from 'vue'
import Vuex from 'vuex'

import {mutations as mutationTypes, actions as actionTypes} from './types'

Vue.use(Vuex);

const state = {
    workInProgress: false,
    contactFormSent: false,
};

const mutations = {
    [mutationTypes.BEGIN_WORK_IN_PROGRESS]: (state) => state.workInProgress = true,
    [mutationTypes.END_WORK_IN_PROGRESS]: (state) => state.workInProgress = false,

    [mutationTypes.MARK_CONTACT_FORM_AS_SENT]: (state) => state.contactFormSent = true,
};

const actions = {};

const getters = {};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: true,
})
