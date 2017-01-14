<template>
    <form id="contact-component" class="col-md-6 col-md-offset-3" @submit.prevent="submitForm">
        <h1>Contact Us</h1>
        <div class="form-group" v-bind:class="{'has-error': errors.email.length > 0}">
            <label for="contact-email" class="control-label">Email address</label>
            <input type="email" class="form-control" id="contact-email" placeholder="Email" v-model="data.email"/>
            <span class="help-block">
                <span v-for="error in errors.email">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group" v-bind:class="{'has-error': errors.name.length > 0}">
            <label for="contact-name" class="control-label">Your name</label>
            <input type="text" class="form-control" id="contact-name" placeholder="Name" v-model="data.name"/>
            <span class="help-block">
                <span v-for="error in errors.name">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group" v-bind:class="{'has-error': errors.message.length > 0}">
            <label for="contact-message" class="control-label">Message to us</label>
            <textarea rows="5" class="form-control" id="contact-message" placeholder="Message"
                      v-model="data.message"></textarea>
            <span class="help-block">
                <span v-for="error in errors.message">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group">
            <label for="contact-file" class="control-label">Attachment file</label>
            <input type="file" id="contact-file"/>
            <p class="help-block">Please attach any file you think would be useful for this inquiry.</p>
        </div>

        <div class="checkbox" v-bind:class="{'has-error': errors.sendCopy.length > 0}">
            <label class="control-label">
                <input type="checkbox" v-model="data.sendCopy"/>
                Send copy of the message to my email
            </label>
            <span class="help-block">
                <span v-for="error in errors.sendCopy">{{error}}<br/></span>
            </span>
        </div>

        <button type="submit" class="btn btn-default btn-lg">Send Message</button>
    </form>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {mutations as mutationTypes} from '../types'
    import validate from 'validate.js';

    const validationRules = {
        email: {
            presence: true,
            length: {
                minimum: 5,
                maximum: 50,
            },
            email: true,
        },
        name: {
            presence: true,
            length: {
                minimum: 2,
                maximum: 50,
            },
        },
        message: {
            presence: true,
            length: {
                minimum: 10,
                maximum: 10000,
            },
        },
        sendCopy: {
            presence: true,
            inclusion: {
                within: [true, false],
            },
        },
    };

    export default {
        data() {
            return {
                data: {
                    email: '',
                    name: '',
                    message: '',
                    sendCopy: false,
                },
                errors: {
                    email: [],
                    name: [],
                    message: [],
                    sendCopy: [],
                },
                hasErrors: false,
            };
        },
        watch: {
            ['data.email']() {
                this.validateForm();
            },
            ['data.name']() {
                this.validateForm();
            },
            ['data.message']() {
                this.validateForm();
            },
            ['data.sendCopy']() {
                this.validateForm();
            },
        },
        methods: {
            validateForm() {
                this.$data.errors = validate(this.$data.data, validationRules);
                this.$data.hasErrors = typeof this.$data.errors !== 'undefined';
                if (!this.$data.hasErrors) {
                    this.$data.errors = [];
                }
                for (let i in this.$data.data) {
                    if (!(i in this.$data.errors)) {
                        this.$data.errors[i] = [];
                    }
                }
            },
            submitForm() {
                this.validateForm();
                if (!this.$data.hasErrors) {
                    this[mutationTypes.MARK_CONTACT_FORM_AS_SENT]();
                }
            },
            ...mapMutations([
                mutationTypes.MARK_CONTACT_FORM_AS_SENT,
            ]),
        },
    };
</script>

<style lang="sass">
    #contact-component h1 {
        margin-bottom: 30px;
    }
</style>
