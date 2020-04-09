<template>
    <div class="container">
        <section class="hero">
            <div class="hero-inner">
                <div class="hero-copy">
                    <h1 class="hero-title mt-0 is-revealing">You Call Cockpit</h1>
                    <h3>Queue</h3>
                    <table>
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody v-if="company.sessions">
                        <tr v-for="c in company.sessions" v-bind:key="c.id">
                            <td>
                                {{c.id}}
                            </td>
                            <td>
                                <button class="button button-primary button-shadow" @click="showRoom(c.id)">Answer call</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <Video username="admin"/>
                <Logs></Logs>
            </div>
        </section>
    </div>
</template>

<script>
    import {EventBus} from '../Event';
    import axios from 'axios';
    import Video from "../components/Video";
    import Logs from "../components/Logs";
    import {BASE_URL} from "../../config";
    import {mapActions, mapState} from "vuex";
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
            ...mapState(['company'])
        },
        mounted() {
            this.loadCompanyById(this.company.id);
        },
        methods: {
            ...mapActions(['loadCompanyById']),
            showRoom(room) {
                EventBus.$emit('show_room', room);
            },
        },
    }
</script>

<style scoped>

</style>
