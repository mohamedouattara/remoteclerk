<template>
    <div>

        <b-navbar toggleable="sm">
            <div class="site-header-inner row">
                <div>
                    <b-navbar-brand>  <img src="@/assets/logo.png" class="logo-img"/></b-navbar-brand>
                </div>
                <b-navbar-toggle target="nav_collapse"/>
                <b-collapse is-nav id="nav_collapse" class="justify-content-end">
                    <b-navbar-nav class="ml-auto">
                        <router-link tag="button" v-if="$route.path !== '/'" class="button button-sm button-shadow"
                                     to="/">Home
                        </router-link>
                        <router-link tag="button" v-if="!loggedIn && $route.path !== '/login'" class="button button-sm button-shadow"
                                     to="/login">Login
                        </router-link>

                        <b-nav-item-dropdown right v-if="loggedIn">
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content>
                                <b-img v-if="loggedIn && user.photoURL" rounded="circle" class="profile-img" :src="user.photoURL">User
                                    settings
                                </b-img>
                                <b-img v-if="loggedIn && !user.photoURL" rounded="circle"
                                       class="profile-img profile-empty-img">
                                </b-img>
                            </template>
                            <b-dropdown-item href="#/profile">User settings</b-dropdown-item>
                            <li>
                                <div class="logout-btn dropdown-item" @click="logout">Logout</div>
                            </li>
                        </b-nav-item-dropdown>

                    </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        props: {
            msg: String
        },
        data() {
            return {
                mainProps: {blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1'}
            }
        },
        computed: {
            ...mapState(['loggedIn', 'user']),
        },
        methods: {
            ...mapActions(['logout'])}
    }
</script>
<style lang="scss" scoped>

    .navbar {

    }

    .profile-img {
        margin-left: 1rem;
        height: 40px;
        width: 40px;
    }


    .profile-empty-img {
        padding: 5px;
        background: lightgray;

    }


    .navbar-nav > button {
        margin: 0.2rem;
    }

    .controls {
        justify-content: flex-end;
    }


    .site-header-inner.row {
        margin-top: 0;
    }

    .header-logo {
        height: 50px;
    }


</style>
