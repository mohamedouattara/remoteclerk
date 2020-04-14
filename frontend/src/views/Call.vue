<template>
    <b-container>
        <Video :username="roomName"/>
        <b-row class="justify-content-md-center">
            <b-col class="col-md-6 col-12">
                <div v-if="!authenticated">
                    <h3>Get the same shopping experience from home as in the store!</h3>
                    <img src="@/assets/sample_img.png">
                    <div class="video-disclaimer"><font-awesome-icon class="phone-icon" icon="video-slash"></font-awesome-icon>Your camera
                    image won't be
                        transmitted
                    </div>
                    <b-button class="call-btn" variant="success" @click="submitUsername()">
                        <font-awesome-icon class="phone-icon" icon="phone-alt"></font-awesome-icon>
                        Start video consultation
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Video from '../components/Video'
    import {v4 as uuidv4} from 'uuid';
    import {EventBus} from '../Event'
    import {mapActions} from "vuex";
    import router from '@/router'

    export default {
        data() {
            return {
                roomName: "",
                authenticated: false
            }
        },
        components: {
            Video,
        },
        mounted() {
            const room  = this.$route.query.room;
            if (room) {
                //TODO join existing room
                EventBus.$emit('show_room', room);
                this.authenticated = true;
            }
        },
        methods: {
            ...mapActions(['loadCompanyById']),
            submitUsername() {
                this.authenticated = true;
                this.roomName = uuidv4();
                const companyId = this.$route.query.companyId;
                this.loadCompanyById(companyId).then(() => {
                    console.log('loaded company succesfully - creating new room now');
                    EventBus.$emit('show_room', uuidv4());
                    router.push(`/call?companyId=${companyId}&room=${this.roomName}`);
                })
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

    .video-disclaimer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }

    .video-img {
        height: 50px;
        margin-right: 1rem;
    }

    .phone-icon {
        margin-right: 5px;
    }

    .call-btn {
        margin-top: 2rem;
    }

    .container {
        padding-bottom: 2rem;
    }

</style>
