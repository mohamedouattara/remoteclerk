<template>
    <div class="container">
        <section class="hero">
            <b-row class="justify-content-center">
                <b-col class="col-md-6">
                    <h1 class="hero-title mt-0 is-revealing">Permission denied</h1>
                    <p class="hero-paragraph is-revealing">In order to start a video consultation, this site needs access to your
                    microphone.</p>
                    <div id="firebaseui-auth-container"></div>
                </b-col>
            </b-row>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Permission"
    }
</script>

<style scoped>

</style>
