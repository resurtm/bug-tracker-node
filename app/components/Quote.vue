<template>
    <div>
        <p>Quote: {{ currentQuote }}</p>
        <button @click="RECEIVE_QUOTE">Receive quote</button>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {actions as actionTypes} from '../types'

    export default {
        computed: mapState([
            'currentQuote',
        ]),
        methods: mapActions([
            actionTypes.RECEIVE_QUOTE,
        ]),
    };
</script>
