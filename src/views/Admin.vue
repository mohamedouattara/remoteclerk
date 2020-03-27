<template>
    <div class="container rooms">
        <div>
            <h2>Admin page for shop owners</h2>


            <p>Show list of open unique rooms/calls</p>

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
</template>

<script>
    import {EventBus} from '../Event'
    import Video from "../components/Video";
    import Logs from "../components/Logs";

    export default {
        data() {
            return {
                rooms: []
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
        border: 1px solid rgb(64, 68, 64);
        cursor: pointer;
    }
</style>
