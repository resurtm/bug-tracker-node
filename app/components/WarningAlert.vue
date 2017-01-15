<template>
    <div class="alert alert-danger" role="alert" v-if="title.length > 0 || message.length > 0">
        <strong v-if="title.length > 0">{{title}}</strong>
        <span v-if="message.length > 0">{{message}}</span>
    </div>
</template>

<script>
    export default {
        props: ['title', 'message']
    }
</script>
