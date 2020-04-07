<template>
    <div id="app">
        <div class="body-wrap boxed-container">
        <page-header></page-header>
            <router-view/>
        </div>
    </div>
</template>
<script>
    import PageHeader from "./components/PageHeader";
    import * as firebase from "firebase/app";
    export default {
        components: {PageHeader},
        created() {
            var firebaseConfig = {
                apiKey: "AIzaSyDcNZI6SYod4dvJbidQg8PTHNAPeVqkktQ",
                authDomain: "remoteclerk-2d41b.firebaseapp.com",
                databaseURL: "https://remoteclerk-2d41b.firebaseio.com",
                projectId: "remoteclerk-2d41b",
                storageBucket: "remoteclerk-2d41b.appspot.com",
                messagingSenderId: "493623585422",
                appId: "1:493623585422:web:afb2eb1f8504fa176877df"
            };
// Initialize Firebase
            firebase.initializeApp(firebaseConfig);

// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.

        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Heebo', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }

</style>
