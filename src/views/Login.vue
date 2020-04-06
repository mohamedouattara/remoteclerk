<template>
    <div class="body-wrap boxed-container">
        <div class="container">
            <section class="hero">
                <b-row class="justify-content-center">
                    <b-col class="col-md-6">
                        <h2 class="headline">Join us!</h2>
                        <div class="benefits">
                            <div>
                                <h3>Bring the shoping experience from your store to the customers home</h3>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <div id="firebaseui-auth-container"></div>
            </section>
        </div>
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
            ...mapActions(['setUserDetails', 'setLoggedIn'])
        },
        mounted() {
            var uiConfig = {
                'callbacks': {
                    // Called when the user has been successfully signed in.
                    'signInSuccessWithAuthResult': (authInfo) => {

                        if (authInfo.additionalUserInfo) {
                            console.log(authInfo.additionalUserInfo.isNewUser ?
                                'New User' : 'Existing User');
                            if (authInfo.additionalUserInfo.isNewUser) {
                                router.push('/registration');
                                return false;
                            }

                        }
                        // this.setUserDetails(authInfo.user);
                        // this.setLoggedIn(true);
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
