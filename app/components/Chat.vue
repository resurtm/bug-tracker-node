<template>
    <div id="chat-component">
        <h1>Support Chat</h1>

        <nick-name-input v-bind:class="{hide: nickName.length > 0}" v-on:selected="nickNameSelected"></nick-name-input>

        <div class="row" v-bind:class="{hide: nickName.length === 0}">
            <div class="col-md-9">
                <textarea class="form-control" rows="16" v-model="messageHistoryText"></textarea>
            </div>

            <div class="col-md-3">
                <ul class="list-group">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        </div>

        <form class="row compose-message" @submit.prevent="sendMessage"
              v-bind:class="{hide: nickName.length === 0}">
            <div class="col-md-9">
                <input type="input" class="form-control" v-model="messageText"/>
            </div>

            <div class="col-md-3">
                <button class="btn btn-primary btn-block" type="submit">Send Message</button>
            </div>
        </form>
    </div>
</template>

<script>
    import socketio from 'socket.io-client'
    import NickNameInput from './NickNameInput.vue'

    export default {
        components: {
            NickNameInput: NickNameInput
        },
        data() {
            return {
                nickName: '',
                messageText: '',
                messageHistory: [],
                socketioClient: null
            };
        },
        computed: {
            messageHistoryText() {
                return this.$data.messageHistory.join("\n");
            }
        },
        mounted() {
            this.$data.socketioClient = socketio(`//${process.env.SOCKETIO_SERVER_HOST}:${process.env.SOCKETIO_SERVER_PORT}`);

            this.$data.socketioClient.on('message', (data) => {
                this.$data.messageHistory.push(data.messageText);
            });
        },
        beforeDestroy() {
            this.$data.socketioClient.disconnect();
            this.$data.socketioClient = null;
        },
        methods: {
            sendMessage() {
                this.$data.socketioClient.emit('message', {messageText: this.$data.messageText});
                this.$data.messageHistory.push(this.$data.messageText);
                this.$data.messageText = '';
            },
            nickNameSelected(nickName) {
                this.$data.nickName = nickName;
            }
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss">
    #chat-component {
        .compose-message {
            margin-top: 20px;
        }
    }
</style>
