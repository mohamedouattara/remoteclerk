<template>
    <div class="body-wrap boxed-container">
        <div class="container rooms">
            <div>
                <h2>Admin page for shop owners</h2>
                <p>Register your shop and get immediately started with your first video-consultation from your store</p>


                <h3>Things to consider</h3>
                <ul>
                    <li>Although a smartphone works perfectly fine, your should buying a tablet and a tripod for better stability during the
                        call.
                    </li>
                    <li>Make sure to set your correct opening hours. This will determine during which time the video-widget will be visible
                        on your website.
                    </li>
                    <li>Make sure you have access to your websites code to embed the video-call widget. It requires no coding skills.</li>
                </ul>
                <b-form @submit="creatCompany()" @submit.stop.prevent>
                    <div class="filter-buttons filter-group">

                        <b-form-group
                                id="input-group-1"
                                label="Company name:"
                                label-for="input-1"
                                v-model="company.name"
                        >
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
                        <button class="upload-btn black" type="submit">Upload</button>
                    </div>
                    <div class="upload-spinner" v-if="uploadSpinner">
                        <b-spinner label="Loading..."></b-spinner>
                    </div>
                </b-form>
                <h3>Rooms</h3>
                <div class="room" v-for="room in rooms" v-bind:key="room.name" @click="showRoom(room.name)">
                    {{room.name}}
                </div>
                <div class="row">
                    <Video username="admin"/>
                    <Logs></Logs>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {EventBus} from '../Event'
    import Video from "../components/Video";
    import Logs from "../components/Logs";

    export default {
        data() {
            return {
                rooms: [],
                company: {name: null, email: null}
            }
        },
        components: {Video, Logs},
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
            showRoom(room) {
                EventBus.$emit('show_room', room);
            },
            creatCompany() {

            }
        }
    }
</script>

<style scoped>
    .rooms > .room {
        border: 1px solid rgb(124, 129, 124);
        padding: 13px;
        margin: 3px 0px;
        color: ghostwhite;
        background: rgb(124, 129, 124);
    }

    .rooms {
        cursor: pointer;
    }
</style>
