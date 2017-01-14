<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/contact-us">Contact Us</router-link>
                    </li>
                    <li>
                        <router-link to="/quote">Quote</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
