<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="alert alert-success" role="alert" v-if="contactFormSent">
                <strong>Thank you!</strong>
                Your message has been sent successfully.
            </div>

            <warning-alert :title="errorTitle" :message="errorMessage"></warning-alert>

            <form @submit.prevent="submitForm" v-if="!contactFormSent">
                <h1>Contact Us</h1>

                <p>Feel free to write us something!</p>

                <div class="form-group" v-bind:class="{'has-error': errors.email.length > 0}">
                    <label for="contact-email" class="control-label">Email address</label>
                    <input type="email" class="form-control" id="contact-email" placeholder="Email"
                           v-model="data.email"/>
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

                <!--<div class="form-group">
                    <label for="contact-file" class="control-label">Attachment file</label>
                    <input type="file" id="contact-file"/>
                    <p class="help-block">Please attach any file you think would be useful for this inquiry.</p>
                </div>-->

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
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import axios from 'axios';
    import validate from 'validate.js';
    import {mutations as mutationTypes} from '../types'
    import WarningAlert from './WarningAlert.vue'

    const validationRules = {
        email: {
            presence: true,
            length: {
                minimum: 5,
                maximum: 50
            },
            email: true
        },
        name: {
            presence: true,
            length: {
                minimum: 2,
                maximum: 50
            }
        },
        message: {
            presence: true,
            length: {
                minimum: 10,
                maximum: 10000
            }
        },
        sendCopy: {
            presence: true,
            inclusion: {
                within: [true, false]
            }
        }
    };

    export default {
        components: {
            warningAlert: WarningAlert
        },
        data() {
            return {
                data: {
                    email: '',
                    name: '',
                    message: '',
                    sendCopy: false
                },
                errors: {
                    email: [],
                    name: [],
                    message: [],
                    sendCopy: []
                },
                hasErrors: false,
                errorTitle: '',
                errorMessage: ''
            };
        },
        computed: {
            ...mapState([
                'contactFormSent'
            ])
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
            }
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
                    this[mutationTypes.BEGIN_WORK_IN_PROGRESS]();
                    this.$data.errorTitle = '';
                    this.$data.errorMessage = '';
                    axios.post('/contact/send', this.$data.data, {
                        validateStatus: (status) => {
                            return status >= 200 && status < 300 || status == 400;
                        }
                    })
                            .then(resp => {
                                this[mutationTypes.END_WORK_IN_PROGRESS]();
                                if (resp.data.status === 'ok') {
                                    this[mutationTypes.MARK_CONTACT_FORM_AS_SENT]();
                                } else {
                                    this.$data.errorTitle = 'Oops!';
                                    this.$data.errorMessage = resp.data.message;
                                }
                            })
                            .catch(err => {
                                this[mutationTypes.END_WORK_IN_PROGRESS]();
                                this.$data.errorTitle = 'Oops!';
                                this.$data.errorMessage = err.message;
                            });
                } else {
                    this.$data.errorTitle = 'Sorry!';
                    this.$data.errorMessage = 'Please fix validation errors';
                }
            },
            ...mapMutations([
                mutationTypes.BEGIN_WORK_IN_PROGRESS,
                mutationTypes.END_WORK_IN_PROGRESS,
                mutationTypes.MARK_CONTACT_FORM_AS_SENT
            ])
        }
    };
</script>
