<template>
    <form @submit.prevent="chooseNickName" id="nick-name-input-component">
        <div class="form-group">
            <label>Enter your nick name:</label>
            <input type="text" class="form-control" v-model="nickName" placeholder="Nick name"/>
        </div>
        <button type="submit" class="btn btn-info btn-block">Select</button>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                nickName: ''
            }
        },
        methods: {
            chooseNickName() {
                this.$emit('selected', this.$data.nickName);
            }
        }
    }
</script>

<style lang="sass" rel="stylesheet/scss">
    #nick-name-input-component {
        width: 450px;
        margin: 0 auto;
        padding: 100px;
        button {
            margin-top: 15px;
        }
    }
</style>
