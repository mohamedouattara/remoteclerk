<template>
    <b-container fluid>
        <b-row class="roomTitle">
            <b-col>
                <div v-if="loading" class="loading-wrapper">
                    <b-spinner small type="grow"></b-spinner>
                    <b>Calling...</b>
                </div>
                <span v-else-if="disconnected"><b>Call ended</b></span>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col class="col-8">
                <div id="remoteTrack"></div>
            </b-col>
        </b-row>
        <b-row v-if="username === 'admin'" class="justify-content-center">
            <b-col class="col-8">
                <div id="localTrack">
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="activeRoom && !loading">
                <b-button variant="danger" @click="leaveRoomIfJoined()">
                    <font-awesome-icon class="phone-icon"
                                       icon="phone-slash"></font-awesome-icon>
                </b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {EventBus} from '../Event'
    import Twilio, {createLocalVideoTrack} from 'twilio-video'
    import axios from 'axios'
    import {BASE_URL} from "../../config";
    import {mapActions, mapState} from "vuex";
    import * as moment from "moment";
    import router from '@/router';

    export default {
        name: "Video",
        data() {
            return {
                loading: false,
                disconnected: false,
                data: {},
                localTrack: false,
                remoteTrack: '',
                activeRoom: '',
                previewTracks: '',
                identity: '',
                roomName: null,
            }
        },
        props: ['username'], // props that will be passed to this component
        created() {
            EventBus.$on('show_room', (room_name) => {
                console.log('creating new room with name ' + room_name);
                this.createChat(room_name);
            });
            EventBus.$on('leave_room', () => {
                console.log('leaving room');
                this.leaveRoomIfJoined();
            });


            // When a user is about to transition away from this page,
            // disconnect from the room, if joined.
            window.addEventListener('beforeunload', this.leaveRoomIfJoined);
        },
        computed: {
        },
        methods: {
            ...mapActions(['createSession', 'deactivateSession']),
            async getAccessToken(room_name) {
                console.log('fetching access token');
                if (this.username !== 'admin') {
                    return await axios.get(`${BASE_URL}token?id=${room_name}&userType=client`);
                } else {
                    return await axios.get(`${BASE_URL}token?id=${room_name}&userType=admin`);
                }
            },
            // Trigger log events
            dispatchLog(message) {
                EventBus.$emit('new_log', message);
            },
            trackPublished(publication, container) {
                if (publication.isSubscribed) {
                    this.attachTrack(publication.track, container);
                }
                publication.on('subscribed', (track) => {
                    console.log('Subscribed to ' + publication.kind + ' track');
                    this.attachTrack(track, container);
                });
                publication.on('unsubscribed', this.detachTrack);
            },

            // Attach the Tracks to the DOM.
            attachTracks(tracks, container) {
                tracks.forEach((track) => {
                    container.appendChild(track.attach());
                });
            },
            attachTrack(track, container) {
                container.appendChild(track.attach());
            },
            // Detach the Tracks from the DOM.
            detachTracks(tracks) {
                tracks.forEach((track) => {
                    track.detach().forEach((detachedElement) => {
                        detachedElement.remove();
                    });
                });
            },
            detachTrack(track) {
                track.detach().forEach((element) => {
                    element.remove();
                });
            },

            // Detach the Participant's Tracks from the DOM.
            detachParticipantTracks(participant) {
                this.detachTracks(this.getTracks(participant));
                if (this.activeRoom) {
                    if (this.activeRoom.participants.size === 0) {
                        this.leaveRoomIfJoined();
                    }
                }
            },
            // Leave Room.
            leaveRoomIfJoined() {
                if (this.activeRoom) {
                    this.activeRoom.disconnect();
                    this.deactivateSession();
                    this.disconnected = true;
                    if (this.localTrack) {
                        this.localTrack.stop();
                        document.getElementById('localTrack').innerHTML = "";
                    }
                    this.$socket.emit('delete_room', this.roomName);
                    this.roomName = '';

                }
            },
            // Get the Participant's Tracks.
            getTracks(participant) {
                return Array.from(participant.tracks.values()).filter(function (publication) {
                    return publication.track;
                }).map(function (publication) {
                    return publication.track;
                });
            },
            participantConnected(participant, previewContainer) {
                participant.tracks.forEach((publication) => {
                    this.trackPublished(publication, previewContainer);
                    this.loading = false;
                });
                participant.on('trackPublished', (publication) => {
                    this.trackPublished(publication, previewContainer);
                });
                participant.on('trackUnpublished', (publication) => {
                    console.log(publication.kind + ' track was unpublished.');
                });
            },

            createChat(room_name) {
                this.loading = true;
                const VueThis = this;
                this.getAccessToken(room_name).then(async (data) => {
                        if (this.username !== 'admin') {
                            this.createSession({id: room_name, createdAt: moment().toDate(), state: 'ACTIVE'});
                        }
                        VueThis.roomName = null;
                        const token = data.data.token;
                        const video = this.username === 'admin' ? {width: window.innerWidth - 50} : false; //TODO responsive
                        let connectOptions = {
                            name: room_name,
                            // logLevel: 'debug',
                            audio: true,
                            video: video
                        };
                        // before a user enters a new room,
                        // disconnect the user from they joined already
                        this.leaveRoomIfJoined();

                        // remove any remote track when joining a new room
                        document.getElementById('remoteTrack').innerHTML = "";
                        if (document.getElementById('localTrack')) {
                            document.getElementById('localTrack').innerHTML = "";
                        }
                        Twilio.connect(token, connectOptions).then((room) => {
                            // console.log('Successfully joined a Room: ', room);
                            VueThis.dispatchLog('Successfully joined a Room: ' + room_name);
                            // set active toom
                            VueThis.activeRoom = room;
                            VueThis.roomName = room_name;

                            // Attach the Tracks of the Room's Participants.
                            var remoteMediaContainer = document.getElementById('remoteTrack');
                            room.participants.forEach((participant) => {
                                VueThis.dispatchLog("Already in Room: '" + participant.identity + "'");
                                this.participantConnected(participant, remoteMediaContainer);
                                VueThis.dispatchLog("Joining: '" + participant.identity + "'");

                            });

                            // When a Participant joins the Room, log the event.
                            room.on('participantConnected', (participant) => {
                                let previewContainer = document.getElementById('remoteTrack');
                                this.participantConnected(participant, previewContainer);
                                VueThis.dispatchLog("Joining: '" + participant.identity + "'");


                            });
                            // When a Participant adds a Track, attach it to the DOM.
                            room.on('trackAdded', (track, participant) => {
                                VueThis.dispatchLog(participant.identity + " added track: " + track.kind);
                                let previewContainer = document.getElementById('remoteTrack');
                                VueThis.attachTracks([track], previewContainer);
                            });
                            // When a Participant removes a Track, detach it from the DOM.
                            room.on('trackRemoved', (track, participant) => {
                                VueThis.dispatchLog(participant.identity + " removed track: " + track.kind);
                                VueThis.detachTracks([track]);
                            });
                            // When a Participant leaves the Room, detach its Tracks.
                            room.on('participantDisconnected', (participant) => {
                                VueThis.dispatchLog("Participant '" + participant.identity + "' left the room");
                                VueThis.detachParticipantTracks(participant);
                            });

                            room.on('disconnected', () => {
                                this.dispatchLog('Left');
                                this.detachParticipantTracks(room.localParticipant);
                                room.participants.forEach(this.detachParticipantTracks);
                                this.activeRoom = null;
                            });
                        }).catch(error => {
                            if (error.message === 'Permission denied') {
                                router.push('/permission')
                            }
                        });
                        //if local preview is not active, create it
                        if (!VueThis.localTrack && this.username === 'admin') {
                            console.log('adding local track as preview')
                            createLocalVideoTrack().then(track => {
                                let localMediaContainer = document.getElementById('localTrack');
                                localMediaContainer.appendChild(track.attach());
                                VueThis.localTrack = track;
                            });
                        }
                    }
                )
                ;
            }
        },
    }
</script>

<style lang="scss">
    #localTrack video {
        background-repeat: no-repeat;
    }

    .spacing {
        padding: 20px;
        width: 100%;
    }

    .roomTitle {
        padding: 4px;
    }

    .loading-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        .spinner-grow {
            margin-right: 5px;
        }
    }
</style>
