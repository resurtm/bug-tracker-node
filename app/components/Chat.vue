<template>
    <div id="chat-component">
        <h1>Support Chat</h1>

        <div class="row">
            <div class="col-md-9">
                <textarea class="form-control" rows="16"></textarea>
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

        <div class="row compose-message">
            <div class="col-md-9">
                <textarea class="form-control"></textarea>
            </div>

            <div class="col-md-3">
                <button class="btn btn-lg btn-primary btn-block">Send Message</button>
            </div>
        </div>
    </div>
</template>

<script>
    import socketio from 'socket.io-client'

    export default {
        data() {
            return {
                socketioClient: null
            };
        },
        mounted() {
            this.$data.socketioClient = socketio('//' + process.env.SOCKETIO_SERVER_HOST +
                    ':' + process.env.SOCKETIO_SERVER_PORT);
            this.$data.socketioClient.on('message', (data) => {
                console.log(data);
            });
        },
        beforeDestroy() {
            this.$data.socketioClient = socketio.disconnect();
            this.$data.socketioClient = null;
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
