import Vue from 'vue';
import Counter from './Counter.vue'
import store from './store'

new Vue({
    el: '#main-container',
    store,
    render: h => h(Counter)
});
