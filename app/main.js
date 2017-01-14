import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Home from './components/Home.vue'
import Contact from './components/Contact.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/contact-us', component: Contact},
    ],
});

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
