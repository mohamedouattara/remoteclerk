<template>
    <b-container>
        <section class="hero">
            <b-row class="justify-content-center">
                <b-col class="col-8">
                    <h1 class="hero-title mt-0 is-revealing">Cockpit</h1>
                    <Video username="admin"/>
                    <Logs></Logs>
                    <h3>Queue</h3>
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">State</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody v-if="company.sessions">
                        <tr v-for="c in company.sessions" v-bind:key="c.id">
                            <td>
                                {{c.id}}
                            </td>
                            <td>
                                {{c.state}}
                            </td>
                            <td>
                                {{getCreatedAtDateTime(c.createdAt)}}
                            </td>
                            <td>
                                <button v-if="c.state === 'ACTIVE'" class="button button-primary button-shadow"
                                        @click="showRoom(c.id)">Answer
                                    call
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </section>
    </b-container>
</template>

<script>
    import {EventBus} from '../Event';
    import axios from 'axios';
    import Video from "../components/Video";
    import Logs from "../components/Logs";
    import {BASE_URL} from "../../config";
    import {mapActions, mapState} from "vuex";
    import * as moment from "moment";

    export default {
        components: {Video, Logs},
        data() {
            return {
                rooms: []
            }
        },
        sockets: {
            connect: () => {
                console.log('socket connected')
            },
            client_room_created: function (data) {
                console.log('received new room');
                this.rooms.push(data);
                console.log(JSON.stringify(data))
            }
        },
        computed: {
            ...mapState(['company']),
        },
        mounted() {
            this.loadCompanyById(this.company.id);
        },
        methods: {
            ...mapActions(['loadCompanyById']),
            showRoom(room) {
                EventBus.$emit('show_room', room);
            },
            getCreatedAtDateTime(c) {
                return moment.unix(c.seconds).format('YYYY-MM-DD HH:mm');
            },},
    }
</script>

<style scoped>

</style>
