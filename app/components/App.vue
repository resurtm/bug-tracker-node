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
            <router-view></router-view>
        </div>
    </div>
</template>
