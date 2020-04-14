<template>
    <div class="container">
        <section>
            <b-row class="justify-content-center">
                <b-col class="col-md-6">
                    <h1 class="hero-title mt-0 is-revealing">Your account</h1>
                    <table>
                        <tbody>
                        <tr v-if="company">
                            <td class="attribute">
                                Company name
                            </td>
                            <td>
                                {{company.name}}
                            </td>
                        </tr>
                        <tr v-if="user">
                            <td class="attribute">
                                Email address
                            </td>
                            <td>
                                {{user.email}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <b-col class="col-12">
                    <h2>Integration</h2>
                    <h3>Link</h3>
                    <p>Add this link to your website or onlineshop. If a user clicks on it, it will start a new video consultation.</p>
                    <code class="code">
                        {{getCallUrl}}
                    </code>
                    <h3>Widget</h3>
                    <p>You could also add our call widget to your website. Just copy the following code to your website and you are
                    ready to go. The sample widget is displayed at the bottom right of this page.</p>

                    <figure>
                    <pre>
                    <code class="code">
                    &lt;html&gt;
                        &lt;div class="remoteclerk-popup"&gt;
                            &lt;button class="video-call-button"&gt;
                                &lt;p class="live-badge"&gt;LIVE&lt;/p&gt;
                                &lt;div class="video-icon"&gt;
                                    &lt;svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video"
                                         class="svg-inline--fa fa-video fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512"&gt;
                                        &lt;path fill="currentColor"
                                              d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"&gt;&lt;/path&gt;
                                    &lt;/svg&gt;
                                &lt;/div&gt;
                                Video Consultation
                            &lt;/button&gt;
                        &lt;/div&gt;
                    &lt;/html&gt;
                    &lt;style&gt;
                        .remoteclerk-popup {
                            background-color: white;
                            border: 1px solid #1d1d1b;
                            border-radius: 4px;
                            padding: 10px;
                            position: fixed;
                            bottom: 10px;
                            right: 10px;
                            transition: all .5s ease-in-out;
                            transform-origin: right bottom;
                            z-index: 101;
                            font-size: 12px;

                        .video-call-button {
                            outline: none;
                            border: none;
                            background: white;
                        }

                        .live-badge {
                            background: red;
                            color: white;
                            padding-bottom: 0;
                            margin-bottom: 0;
                        }

                        .video-icon {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                        svg {
                            height: 50px
                        }
                        }
                        }
                    &lt;/style&gt;
                    </code>
                </pre>
                    </figure>
                    <div class="remoteclerk-popup">
                        <button class="video-call-button" @click="openCallPage()">
                            <p class="live-badge">LIVE</p>
                            <div class="video-icon">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video"
                                     class="svg-inline--fa fa-video fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 576 512">
                                    <path fill="currentColor"
                                          d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z"></path>
                                </svg>
                            </div>
                            Video Consultation
                        </button>
                    </div>
                </b-col>
            </b-row>
        </section>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import router from '@/router';

    export default {
        components: {},
        computed: {
            ...mapState(['company', 'user']),
            getCallUrl() {
                return window.location.origin + '/#/call?companyId='+ this.company.id;
            }
        },
        methods: {
            ...mapActions(['loadCompany']),
            openCallPage() {
                router.push('/call?companyId='+ this.company.id);
            }
        },
        mounted() {
            this.loadCompany();
        },
    }
</script>
<style lang="scss" scoped>
    table {
        table-layout: fixed;
        width: 100%;

        td {
            width: 50%;
            word-wrap: break-word;
        }

        .attribute {
            font-weight: bold;
        }

        tr:nth-child(odd) {
            background-color: rgba(14, 30, 37, 0.02);
        }

    }

    .remoteclerk-popup {
        background-color: white;
        border: 1px solid #1d1d1b;
        border-radius: 4px;
        padding: 10px;
        position: fixed;
        bottom: 10px;
        right: 10px;
        transition: all .5s ease-in-out;
        transform-origin: right bottom;
        z-index: 101;
        font-size: 12px;
        box-shadow: 2px 2px 1px 0px #1d1d1b;

        .video-call-button {
            outline: none;
            border: none;
            background: white;
        }

        .live-badge {
            background: red;
            color: white;
            padding-bottom: 0;
            margin-bottom: 0;
        }

        .video-icon {
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                height: 50px
            }
        }
    }

    pre {
        text-align: left;
    }

    h3 {
        margin-top: 1rem;
    }
</style>
