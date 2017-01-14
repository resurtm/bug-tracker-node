import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import {mutations as mutationTypes, actions as actionTypes} from './types'

Vue.use(Vuex);

const state = {
    count: 0,
    currentQuote: '(empty)',
};

const mutations = {
    [mutationTypes.INCREMENT]: (state) => state.count++,
    [mutationTypes.DECREMENT]: (state) => state.count--,

    [mutationTypes.CHANGE_QUOTE]: (state, newQuote) => state.currentQuote = newQuote,
};

const actions = {
    [actionTypes.INCREMENT]: ({commit}) => commit(mutationTypes.INCREMENT),
    [actionTypes.DECREMENT]: ({commit}) => commit(mutationTypes.DECREMENT),
    [actionTypes.INCREMENT_IF_ODD]: ({commit, state}) => {
        if ((state.count + 1) % 2 === 0) {
            commit(mutationTypes.INCREMENT);
        }
    },
    [actionTypes.INCREMENT_ASYNC]: ({commit}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit(mutationTypes.INCREMENT);
                resolve();
            }, 2000);
        });
    },

    [actionTypes.RECEIVE_QUOTE]: ({commit}) => {
        return axios.get('/quote').then(response => {
            commit(mutationTypes.CHANGE_QUOTE, response.data.text);
        });
    },
};

const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: true,
})
