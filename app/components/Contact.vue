<template>
    <form id="contact-component" class="col-md-6 col-md-offset-3" @submit.prevent="submitForm">
        <h1>Contact Us</h1>
        <div class="form-group" v-bind:class="{'has-error': formErrors.email.length > 0}">
            <label for="contact-email" class="control-label">Email address</label>
            <input type="email" class="form-control" id="contact-email" placeholder="Email" v-model="formData.email"/>
            <span class="help-block">
                <span v-for="error in formErrors.email">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group" v-bind:class="{'has-error': formErrors.name.length > 0}">
            <label for="contact-name" class="control-label">Your name</label>
            <input type="email" class="form-control" id="contact-name" placeholder="Name" v-model="formData.name"/>
            <span class="help-block">
                <span v-for="error in formErrors.name">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group" v-bind:class="{'has-error': formErrors.message.length > 0}">
            <label for="contact-message" class="control-label">Message to us</label>
            <textarea rows="5" class="form-control" id="contact-message" placeholder="Message"
                      v-model="formData.message"></textarea>
            <span class="help-block">
                <span v-for="error in formErrors.message">{{error}}<br/></span>
            </span>
        </div>

        <div class="form-group">
            <label for="contact-file" class="control-label">Attachment file</label>
            <input type="file" id="contact-file"/>
            <p class="help-block">Please attach any file you think would be useful for this inquiry.</p>
        </div>

        <div class="checkbox" v-bind:class="{'has-error': formErrors.sendCopy.length > 0}">
            <label class="control-label">
                <input type="checkbox" v-model="formData.sendCopy"/> Send copy of the message to my email
            </label>
            <span class="help-block">
                <span v-for="error in formErrors.sendCopy">{{error}}<br/></span>
            </span>
        </div>

        <button type="submit" class="btn btn-default btn-lg">Send Message</button>
    </form>
</template>

<script>
    import {mapActions} from 'vuex';
    import {actions as actionTypes} from '../types'
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
                formData: {
                    email: '',
                    name: '',
                    message: '',
                    sendCopy: false,
                },
            };
        },
        computed: {
            formErrors() {
                let errors = validate(this.$data.formData, validationRules);
                for (let k in this.$data.formData) {
                    if (!(k in errors)) {
                        errors[k] = [];
                    }
                }
                return errors;
            },
        },
        methods: {
            submitForm() {

            },
        },
    };
</script>

<style lang="sass">
    #contact-component h1 {
        margin-bottom: 30px;
    }
</style>
