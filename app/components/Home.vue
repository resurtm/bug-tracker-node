<template>
    <div>
        <p>Home</p>
        <p>Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.</p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: mapGetters([
            'evenOrOdd',
        ]),
    };
</script>
