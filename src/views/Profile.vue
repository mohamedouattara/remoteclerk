<template>
    <div class="container">
        <section class="hero">
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
            <b-row>
                <b-col>
                    <h3>Integration</h3>
                    <p>Paste this code onto your website</p>
                    <code class="code">
                        System.out("test")
                    </code>
                </b-col>
            </b-row>
        </section>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        components: {},
        computed: {
            ...mapState(['company', 'user']),
        },
        methods: {
            ...mapActions(['loadCompany'])
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
        }

        .attribute {
            font-weight: bold;
        }

        tr:nth-child(odd) {
            background-color: rgba(14, 30, 37, 0.02);
        }
    }
</style>
