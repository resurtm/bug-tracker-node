<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'contact'}">Contact Us</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'chat'}">Support Chat</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <preloader></preloader>
            <router-view v-bind:class="{hide: workInProgress}"></router-view>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Preloader from './Preloader.vue';

    export default {
        components: {
            'preloader': Preloader
        },
        computed: {
            ...mapState([
                'workInProgress'
            ])
        }
    };
</script>
