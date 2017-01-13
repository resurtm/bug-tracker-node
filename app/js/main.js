import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++;
        },
        decrement (state) {
            state.count--;
        },
    },
});

const Counter = {
    computed: {
        count () {
            return this.$store.state.count;
        },
    },
    methods: {
        onClick() {
            this.$store.commit('increment');
        }
    },
    template: `
<div>
    <div>{{ count }}</div>
    <button class="btn" @click="onClick">Click!</button>
</div>
`,
};

Vue.component('todo-item', {
    props: ['task'],
    template: `<li>{{task.text}}</li>`,
});

const app = new Vue({
    el: '#main-container',
    store,
    components: {Counter},
    template: `
<div class="app">
    <counter></counter>
</div>
`,
});
