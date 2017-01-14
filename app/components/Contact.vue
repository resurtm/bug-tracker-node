<template>
    <div>
        <p>Contact</p>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementIfOdd">Increment if odd</button>
        <button @click="incrementAsync">Increment async</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        methods: mapActions([
            'increment',
            'decrement',
            'incrementIfOdd',
            'incrementAsync',
        ]),
    };
</script>
