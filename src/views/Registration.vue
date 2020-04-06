<template>
    <div class="body-wrap boxed-container">
        <div class="container">
            <section class="hero">
                <b-row>
                    <b-col class="col-8">
                        <h3>Things to consider</h3>
                        <ul>
                            <li>Although a smartphone works perfectly fine, your should buying a tablet and a tripod for better stability
                                during
                                the
                                call.
                            </li>
                            <li>Make sure to set your correct opening hours. This will determine during which time the video-widget will be
                                visible
                                on your website.
                            </li>
                            <li>Make sure you have access to your websites code to embed the video-call widget. It requires no coding
                                skills.
                            </li>
                        </ul>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="col-8">
                        <b-form @submit="creatCompany()" @submit.stop.prevent>
                            <div class="filter-buttons filter-group">

                                <b-form-group
                                        id="input-group-1"
                                        label="Company name:"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-2"
                                            v-model="company.name"
                                            type="text"
                                            required
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                        id="input-group-1"
                                        label="Email address"
                                        label-for="input-1"
                                >
                                    <b-form-input
                                            id="input-1"
                                            v-model="company.email"
                                            type="email"
                                            required
                                    ></b-form-input>
                                </b-form-group>
                                <button class="button button-primary button-shadow" type="submit">Register</button>
                            </div>
                        </b-form>
                    </b-col>
                </b-row>
                <div class="room" v-for="room in rooms" v-bind:key="room.name" @click="showRoom(room.name)">
                    {{room.name}}
                </div>
                <div class="row">
                    <Video username="admin"/>
                    <Logs></Logs>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import Logs from "../components/Logs";
    import Video from "../components/Video";
    import {EventBus} from '../Event';
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import 'firebase/firestore';
    import {mapActions} from "vuex";

    export default {
        name: "Registration",
        components: {Video, Logs},
        data() {
            return {
                rooms: [],
                company: {name: null, email: null}
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
        methods: {
            ...mapActions(['registerCompany']),
            showRoom(room) {
                EventBus.$emit('show_room', room);
            },
            creatCompany() {
                this.registerCompany(this.company);
            }
        }

    }
</script>

<style scoped>

</style>
