import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import store from './store'
import App from './components/App.vue'
import Home from './components/Home.vue'
import Contact from './components/Contact.vue'
import Chat from './components/Chat.vue'

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {name: 'home', path: '/', component: Home},
        {name: 'contact', path: '/contact-us', component: Contact},
        {name: 'chat', path: '/chat', component: Chat},
    ],
});

const app = new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
