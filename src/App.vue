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
    export default {
        components: {PageHeader}
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
