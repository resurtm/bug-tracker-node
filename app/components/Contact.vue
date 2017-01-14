<template>
    <div>
        <p>Contact</p>
        <button @click="INCREMENT">+</button>
        <button @click="DECREMENT">-</button>
        <button @click="INCREMENT_IF_ODD">Increment if odd</button>
        <button @click="INCREMENT_ASYNC">Increment async</button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {actions as actionTypes} from '../types'

    export default {
        methods: mapActions([
            actionTypes.INCREMENT,
            actionTypes.DECREMENT,
            actionTypes.INCREMENT_IF_ODD,
            actionTypes.INCREMENT_ASYNC,
        ]),
    };
</script>
