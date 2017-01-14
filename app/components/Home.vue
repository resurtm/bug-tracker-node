<template>
    <div>
        <p>Home</p>
        <p>Clicked: {{ count }} times, count is {{ evenOrOdd }}.</p>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapState([
                'count',
            ]),
            ...mapGetters([
                'evenOrOdd',
            ]),
        }
    };
</script>
