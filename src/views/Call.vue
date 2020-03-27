<template>
    <div class="container chat_container" id="app">
        <Video :username="username"/>
        <div class="row">
            <b-col>
                <div v-if="!authenticated">
                    <b-button variant="success" @click="submitUsername()">Start Call</b-button>
                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
    import Video from '../components/Video'
    import {v4 as uuidv4} from 'uuid';
    import {EventBus} from '../Event'

    export default {
        data() {
            return {
                username: "",
                authenticated: false
            }
        },
        components: {
            Video,
        },
        methods: {
            submitUsername() {
                this.authenticated = true;
                this.username = uuidv4();
                console.log('call initiated by click');
                EventBus.$emit('show_room', uuidv4());
            },
        }
    }
</script>

<style scoped>
    .box {
        border: 1px solid gray;
    }

    .username {
        margin: 12px auto 7px auto;
        color: wheat;
    }

</style>
