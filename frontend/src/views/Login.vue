<template>
        <div class="container">
            <section class="hero">
                <b-row class="justify-content-center">
                    <b-col class="col-md-6">
                        <h1 class="hero-title mt-0 is-revealing">Join us!</h1>
                        <p class="hero-paragraph is-revealing">Bring the shoping experience from your store to the customers home</p>
                        <div id="firebaseui-auth-container"></div>
                    </b-col>
                </b-row>
            </section>
        </div>
</template>

<script>
    import {mapActions} from "vuex";
    import * as firebaseui from 'firebaseui'
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import router from '@/router';
    import {CLIENT_ID} from '../../config'

    export default {
        methods: {
            ...mapActions(['setUserDetails', 'setLoggedIn', 'loadCompany'])
        },
        mounted() {
            var uiConfig = {
                'callbacks': {
                    // Called when the user has been successfully signed in.
                    'signInSuccessWithAuthResult': (authInfo) => {
                        this.setUserDetails(authInfo.user);
                        this.setLoggedIn(true);
                        if (authInfo.additionalUserInfo) {
                            console.log(authInfo.additionalUserInfo.isNewUser ?
                                'New User' : 'Existing User');
                            if (authInfo.additionalUserInfo.isNewUser) {
                                router.push('/registration');
                                return false;
                            } else {
                                this.loadCompany();
                            }

                        }

                        router.push('/');


                        // Do not redirect.
                        return false;
                    }
                },
                // Opens IDP Providers sign-in flow in a popup.
                'signInFlow': 'popup',
                'signInOptions': [
                    {
                        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                        // Required to enable this provider in One-Tap Sign-up.
                        authMethod: 'https://accounts.google.com',
                        // Required to enable ID token credentials for this provider.
                        clientId: CLIENT_ID
                    },
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        // Whether the display name should be displayed in Sign Up page.
                        requireDisplayName: true,
                        signInMethod: 'password'
                    }
                ],
                // Terms of service url.
                'tosUrl': 'https://www.google.com',
                // Privacy policy url.
                'privacyPolicyUrl': 'https://www.google.com',
            };

            // Initialize the FirebaseUI Widget using Firebase.
            var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
            // The start method will wait until the DOM is loaded.
            ui.start('#firebaseui-auth-container', uiConfig);
        }
    };
</script>

<style lang="scss" scoped>

    .benefits {
        padding-top: 1rem;
    }

</style>
