<template>
    <b-container>
        <section>
            <b-row class="justify-content-center">
                <b-col class="col-12">
                    <h1 class="hero-title mt-0 is-revealing">Cockpit</h1>
                    <Video username="admin"/>
                    <Logs></Logs>
                    <h3>Queue</h3>
                    <b-table striped hover :items="company.sessions" :fields="fields" :responsive="true">
                        <template v-slot:cell(actions)="row">
                            <b-button v-if="row.item.state === 'ACTIVE'" variant="success"
                                    @click="showRoom(row.item)"><font-awesome-icon class="phone-icon" icon="phone-alt"></font-awesome-icon></b-button>
                        </template>
                    </b-table>
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
                fields: ['id',{
                    key: 'createdAt', label: 'createdAt', formatter: value => {
                        return this.getCreatedAtDateTime(value)
                    }
                }, 'state',  { key: 'actions', label: 'Actions' }],
            }
        },
        sockets: {
            connect: () => {
                console.log('socket connected')
            },
            client_room_created: function (data) {
                console.log('received new session');
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
            ...mapActions(['loadCompanyById', 'setCurrentSession']) ,
             showRoom(session) {
                EventBus.$emit('show_room', session.id);
                this.setCurrentSession(session);
            },
            getCreatedAtDateTime(c) {
                return moment.unix(c.seconds).format('YYYY-MM-DD HH:mm');
            },
        },
    }
</script>

<style scoped>

</style>
